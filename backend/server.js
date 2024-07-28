const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');
const { createWriteStream } = require('fs');

const app = express();
const port = process.env.PORT || 7222;

app.use(cors());
app.use(express.json({ limit: '1mb' })); // Limit payload size

const TEMP_DIR = path.join(__dirname, 'temp');
const PORTFOLIO_TEMPLATE = path.join(__dirname, 'portfolio-template');
const PORTFOLIO_REPO = 'https://github.com/Ananthakrishna24/portfolio-v1.git';

console.log('Server initialization started');

async function cloneRepository() {
  console.log('Cloning repository...');
  await fs.rm(PORTFOLIO_TEMPLATE, { recursive: true, force: true });
  await new Promise((resolve, reject) => {
    exec(`git clone ${PORTFOLIO_REPO} ${PORTFOLIO_TEMPLATE}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
  console.log('Repository cloned successfully');
}

async function buildTemplate() {
  console.log('Building template...');
  await new Promise((resolve, reject) => {
    exec('npm install && npm run build', { cwd: PORTFOLIO_TEMPLATE }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve();
    });
  });
  console.log('Template built successfully');
}

async function initialSetup() {
  console.log('Performing initial setup...');
  await fs.mkdir(TEMP_DIR, { recursive: true });
  
  try {
    const templateStats = await fs.stat(PORTFOLIO_TEMPLATE);
    if (!templateStats.isDirectory()) {
      throw new Error('PORTFOLIO_TEMPLATE is not a directory');
    }
    const templateContents = await fs.readdir(PORTFOLIO_TEMPLATE);
    if (templateContents.length === 0) {
      throw new Error('PORTFOLIO_TEMPLATE is empty');
    }
  } catch (error) {
    console.log('Portfolio template not found or empty, cloning repository...');
    await cloneRepository();
    await buildTemplate();
  }
  
  console.log('Initial setup completed');
}

initialSetup().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Failed to perform initial setup:', error);
  process.exit(1);
});

app.post('/api/create-portfolio', async (req, res) => {
  console.log('Received request to create portfolio');
  const userData = req.body;

  try {
    const workDir = path.join(TEMP_DIR, `portfolio_${Date.now()}`);
    await fs.mkdir(workDir, { recursive: true });

    console.log('Copying portfolio template...');
    await copyDir(PORTFOLIO_TEMPLATE, workDir);

    console.log('Updating project files with user data...');
    await updateProjectFiles(workDir, userData);

    console.log('Creating zip file...');
    const zipPath = path.join(TEMP_DIR, `portfolio_${Date.now()}.zip`);
    await createZip(workDir, zipPath);

    await fs.rm(workDir, { recursive: true, force: true });

    const downloadUrl = `/download/${path.basename(zipPath)}`;
    res.json({ downloadUrl });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio', details: error.message });
  }
});

app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(TEMP_DIR, fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error(`Error downloading file: ${err.message}`);
      res.status(404).send('File not found');
    } else {
      fs.unlink(filePath).catch(err => console.error('Failed to delete zip file:', err));
    }
  });
});

async function copyDir(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dest, { recursive: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function updateProjectFiles(workDir, userData) {
  const updateFile = async (filePath, updateFn) => {
    const content = await fs.readFile(filePath, 'utf8');
    const updatedContent = updateFn(content);
    await fs.writeFile(filePath, updatedContent);
  };

  const files = [
    ['src/components/About.js', content => content.replace(/const { about } = USER_INFO;/, `const about = ${JSON.stringify(userData.about)};`)],
    ['src/components/Experience.js', content => content.replace(/const { experience } = USER_INFO;/, `const experience = ${JSON.stringify(userData.experience)};`)],
    ['src/components/Projects.js', content => content.replace(/const { projects } = USER_INFO;/, `const projects = ${JSON.stringify(userData.projects)};`)],
    ['src/components/Layout.js', content => {
      return content.replace(
        /const { name, title, email, phone, location, socialLinks } = USER_INFO;/,
        `const { name, title, email, phone, location, socialLinks } = ${JSON.stringify(userData)};`
      );
    }],
    ['src/App.js', content => {
      content = content.replace(/import CreatePortfolio from '\.\/components\/CreatePortfolio';/, '');
      return content.replace(/<Route path="\/create-portfolio" component={CreatePortfolio} \/>/, '');
    }]
  ];

  for (const [filePath, updateFn] of files) {
    await updateFile(path.join(workDir, filePath), updateFn);
  }
}

function createZip(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 1 } }); // Use fastest compression
    const stream = createWriteStream(outputPath);

    archive
      .directory(sourceDir, false)
      .on('error', reject)
      .pipe(stream);

    stream.on('close', resolve);
    archive.finalize();
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});