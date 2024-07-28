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
  const { name, title, email, phone, location, about, experience, projects, socialLinks } = req.body;

  try {
    const workDir = path.join(TEMP_DIR, `portfolio_${Date.now()}`);
    await fs.mkdir(workDir, { recursive: true });

    console.log('Cloning repository...');
    await runCommand(`git clone ${PORTFOLIO_REPO} ${workDir}`);

    console.log('Updating project files with user data...');
    await updateProjectFiles(workDir, { name, title, email, phone, location, about, experience, projects, socialLinks });

    console.log('Installing dependencies...');
    await runCommand('npm install', { cwd: workDir });

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
    content.replace(/About Me(?:\n|.)*?<\/motion.div>/s, `About Me</motion.h2>
      <motion.div
        className="space-y-6 text-lg leading-relaxed text-light-text dark:text-[#8892b0]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={childVariants} className="text-justify hyphens-auto">
          ${userData.about}
        </motion.p>
      </motion.div>`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Experience.js'), content =>
    content.replace(/const jobs = \[(?:\n|.)*?\];/s, `const jobs = ${JSON.stringify(userData.experience, null, 2)};`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Projects.js'), content =>
    content.replace(/const projects = \[(?:\n|.)*?\];/s, `const projects = ${JSON.stringify(userData.projects, null, 2)};`)
  );

  await updateFile(path.join(workDir, 'src', 'components', 'Layout.js'), content => {
    content = content.replace(/const name = "[^"]+";/, `const name = "${userData.name}";`);
    content = content.replace(/const title = "[^"]+";/, `const title = "${userData.title}";`);
    content = content.replace(/const email = "[^"]+";/, `const email = "${userData.email}";`);
    content = content.replace(/const phone = "[^"]+";/, `const phone = "${userData.phone}";`);
    content = content.replace(/const location = "[^"]+";/, `const location = "${userData.location}";`);
    
    const socialLinksUpdate = Object.entries(userData.socialLinks)
      .filter(([_, url]) => url)
      .map(([platform, url]) => `<motion.a
                    key="${platform}"
                    href="${url}"
                    className="text-light-text dark:text-lightest-slate hover:text-light-primary dark:hover:text-green transition duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-${platform}"></i>
                  </motion.a>`)
      .join('\n              ');

    return content.replace(
      /{["github", "linkedin", "codepen", "instagram", "twitter"].map\((?:\n|.)*?\)}/s,
      socialLinksUpdate
    );
  });

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