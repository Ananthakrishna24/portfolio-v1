const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const archiver = require('archiver');
const rimraf = require('rimraf');
const { createReadStream, createWriteStream } = require('fs');

const app = express();
const port = process.env.PORT || 7222;

app.use(cors());
app.use(express.json());

const TEMP_DIR = path.join(__dirname, 'temp');
const PORTFOLIO_REPO = 'https://github.com/Ananthakrishna24/portfolio-v1.git';
const INITIAL_INSTALL_DIR = path.join(TEMP_DIR, 'initial_install');

let cachedInitialInstall = null;

console.log('Server initialization started');

async function initialSetup() {
  console.log('Performing initial setup...');
  await fs.mkdir(TEMP_DIR, { recursive: true });
  console.log('Initial setup completed');
}

async function findAvailablePort(initialPort) {
  for (let port = initialPort; port < initialPort + 100; port++) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          server.close(resolve);
        }).on('error', reject);
      });
      return port;
    } catch (err) {
      if (err.code !== 'EADDRINUSE') throw err;
    }
  }
  throw new Error('No available ports found');
}

async function ensureInitialInstall() {
  if (!cachedInitialInstall) {
    console.log('Creating initial installation...');
    await fs.mkdir(INITIAL_INSTALL_DIR, { recursive: true });
    await runCommand(`git clone ${PORTFOLIO_REPO} ${INITIAL_INSTALL_DIR}`);
    await runCommand('npm install', { cwd: INITIAL_INSTALL_DIR });
    cachedInitialInstall = INITIAL_INSTALL_DIR;
    console.log('Initial installation completed');
  }
  return cachedInitialInstall;
}

initialSetup().then(() => {
  findAvailablePort(port).then((availablePort) => {
    app.listen(availablePort, () => {
      console.log(`Server is running on port ${availablePort}`);
    });
  }).catch((err) => {
    console.error('Failed to find an available port:', err);
    process.exit(1);
  });
}).catch((error) => {
  console.error('Failed to perform initial setup:', error);
  process.exit(1);
});

app.post('/api/create-portfolio', async (req, res) => {
  console.log('Received request to create portfolio');
  const userData = req.body;

  try {
    const initialInstallDir = await ensureInitialInstall();
    const workDir = path.join(TEMP_DIR, `portfolio_${Date.now()}`);
    await fs.mkdir(workDir, { recursive: true });

    console.log('Copying initial installation...');
    await runCommand(`cp -R ${initialInstallDir}/* ${workDir}`);

    console.log('Updating project files with user data...');
    await updateProjectFiles(workDir, userData);

    console.log('Building the project...');
    await runCommand('npm run build', { cwd: workDir });

    const buildDir = path.join(workDir, 'build');
    const zipPath = path.join(TEMP_DIR, `portfolio_${Date.now()}.zip`);
    await createZip(buildDir, zipPath);

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

function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error.message}`);
        return reject(error);
      }
      if (stderr) console.error(`Command stderr: ${stderr}`);
      resolve(stdout.trim());
    });
  });
}

async function updateProjectFiles(workDir, userData) {
  const updateFile = async (filePath, updateFn) => {
    const content = await fs.readFile(filePath, 'utf8');
    const updatedContent = updateFn(content);
    await fs.writeFile(filePath, updatedContent);
  };

  await updateFile(path.join(workDir, 'src', 'components', 'About.js'), content => 
    content.replace(/const { about } = USER_INFO;/, 
    `const { about } = ${JSON.stringify({ about: userData.about })};`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Experience.js'), content =>
    content.replace(/const { experience } = USER_INFO;/, 
    `const { experience } = ${JSON.stringify({ experience: userData.experience })};`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Projects.js'), content =>
    content.replace(/const { projects } = USER_INFO;/, 
    `const { projects } = ${JSON.stringify({ projects: userData.projects })};`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Layout.js'), content => {
    content = content.replace(/const { name, title, email, phone, location, socialLinks } = USER_INFO;/,
      `const { name, title, email, phone, location, socialLinks } = ${JSON.stringify(userData)};`);
    return content;
  });

  // Remove CreatePortfolio component import and route
  await updateFile(path.join(workDir, 'src', 'App.js'), content => {
    content = content.replace(/import CreatePortfolio from '\.\/components\/CreatePortfolio';/, '');
    return content.replace(/<Route path="\/create-portfolio" component={CreatePortfolio} \/>/, '');
  });
}

function createZip(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
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