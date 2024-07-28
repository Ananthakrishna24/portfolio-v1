const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { exec } = require('child_process');
const rimraf = require('rimraf');

const app = express();
const port = process.env.PORT || 7222;

app.use(cors());
app.use(express.json());

const TEMP_DIR = path.join(__dirname, 'temp');
const PORTFOLIO_REPO = 'https://github.com/Ananthakrishna24/portfolio-v1.git';
const INITIAL_INSTALL_DIR = path.join(TEMP_DIR, 'initial_install');

let initialPackageJson = '';

console.log('Server initialization started');

async function initialSetup() {
  console.log('Performing initial setup...');
  await fs.ensureDir(INITIAL_INSTALL_DIR);
  await runCommand(`git clone ${PORTFOLIO_REPO} ${INITIAL_INSTALL_DIR}`);
  await runCommand('npm install', { cwd: INITIAL_INSTALL_DIR });
  initialPackageJson = await fs.readFile(path.join(INITIAL_INSTALL_DIR, 'package.json'), 'utf8');
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
  const { name, title, email, phone, location, about, experience, projects, socialLinks } = req.body;
  console.log('Request body:', { name, title, email, phone, location, about, experience, projects, socialLinks });

  try {
    const workDir = path.join(TEMP_DIR, `portfolio_${Date.now()}`);
    console.log(`Creating working directory: ${workDir}`);
    await fs.ensureDir(workDir);

    console.log('Cloning repository...');
    await runCommand(`git clone ${PORTFOLIO_REPO} ${workDir}`);
    console.log('Repository cloned successfully');

    console.log('Updating project files with user data...');
    await updateProjectFiles(workDir, { name, title, email, phone, location, about, experience, projects, socialLinks });
    console.log('Project files updated successfully');

    const currentPackageJson = await fs.readFile(path.join(workDir, 'package.json'), 'utf8');
    if (currentPackageJson !== initialPackageJson) {
      console.log('package.json has changed, installing dependencies...');
      await runCommand('npm install', { cwd: workDir });
      console.log('Dependencies installed successfully');
    } else {
      console.log('package.json unchanged, skipping npm install');
    }

    console.log('Building the project...');
    try {
      const buildOutput = await runCommand('npm run build', { cwd: workDir });
      console.log('Build output:', buildOutput);
    } catch (error) {
      console.error('Build process failed:', error);
      throw error;
    }

    const buildDir = path.join(workDir, 'build');
    const zipPath = path.join(TEMP_DIR, `portfolio_${Date.now()}.zip`);
    console.log(`Creating zip file: ${zipPath}`);
    await createZip(buildDir, zipPath);
    console.log('Zip file created successfully');

    console.log(`Cleaning up working directory: ${workDir}`);
    rimraf.sync(workDir);
    console.log('Working directory cleaned up');

    const downloadUrl = `/download/${path.basename(zipPath)}`;
    console.log(`Sending download URL: ${downloadUrl}`);
    res.json({ downloadUrl });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Failed to create portfolio', details: error.message });
  }
});

app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  console.log(`Received download request for file: ${fileName}`);
  const filePath = path.join(TEMP_DIR, fileName);
  console.log(`Full file path: ${filePath}`);

  res.download(filePath, (err) => {
    if (err) {
      console.error(`Error downloading file: ${err.message}`);
      res.status(404).send('File not found');
    } else {
      console.log(`File downloaded successfully: ${fileName}`);
      // Delete the zip file after download
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Failed to delete zip file:', err);
        } else {
          console.log(`Zip file deleted: ${fileName}`);
        }
      });
    }
  });
});

async function runCommand(command, options = {}) {
  console.log(`Running command: ${command}`);
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      console.log(`Command output:`);
      console.log(stdout);
      if (stderr) {
        console.error(`Command stderr:`);
        console.error(stderr);
      }
      if (error) {
        console.error(`exec error: ${error.message}`);
        return reject(error);
      }
      resolve(stdout.trim());
    });
  });
}

async function updateProjectFiles(workDir, userData) {
  console.log('Updating project files...');

  // Update About.js
  console.log('Updating About.js');
  const aboutPath = path.join(workDir, 'src', 'components', 'About.js');
  let aboutContent = await fs.readFile(aboutPath, 'utf8');
  aboutContent = aboutContent.replace(/About Me(?:\n|.)*?<\/motion.div>/s, `About Me</motion.h2>
      <motion.div
        className="space-y-6 text-lg leading-relaxed text-light-text dark:text-[#8892b0]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={childVariants} className="text-justify hyphens-auto">
          ${userData.about}
        </motion.p>
      </motion.div>`);
  await fs.writeFile(aboutPath, aboutContent);
  console.log('About.js updated successfully');

  // Update Experience.js
  console.log('Updating Experience.js');
  const experiencePath = path.join(workDir, 'src', 'components', 'Experience.js');
  let experienceContent = await fs.readFile(experiencePath, 'utf8');
  experienceContent = experienceContent.replace(/const jobs = \[(?:\n|.)*?\];/s, `const jobs = ${JSON.stringify(userData.experience, null, 2)};`);
  await fs.writeFile(experiencePath, experienceContent);
  console.log('Experience.js updated successfully');

  // Update Projects.js
  console.log('Updating Projects.js');
  const projectsPath = path.join(workDir, 'src', 'components', 'Projects.js');
  let projectsContent = await fs.readFile(projectsPath, 'utf8');
  projectsContent = projectsContent.replace(/const projects = \[(?:\n|.)*?\];/s, `const projects = ${JSON.stringify(userData.projects, null, 2)};`);
  await fs.writeFile(projectsPath, projectsContent);
  console.log('Projects.js updated successfully');

  // Update Layout.js
  console.log('Updating Layout.js');
  const layoutPath = path.join(workDir, 'src', 'components', 'Layout.js');
  let layoutContent = await fs.readFile(layoutPath, 'utf8');
  layoutContent = layoutContent.replace(/const name = "[^"]+";/, `const name = "${userData.name}";`);
  layoutContent = layoutContent.replace(/const title = "[^"]+";/, `const title = "${userData.title}";`);
  layoutContent = layoutContent.replace(/const email = "[^"]+";/, `const email = "${userData.email}";`);
  layoutContent = layoutContent.replace(/const phone = "[^"]+";/, `const phone = "${userData.phone}";`);
  layoutContent = layoutContent.replace(/const location = "[^"]+";/, `const location = "${userData.location}";`);
  
  // Update social links
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

  layoutContent = layoutContent.replace(
    /{["github", "linkedin", "codepen", "instagram", "twitter"].map\((?:\n|.)*?\)}/s,
    socialLinksUpdate
  );

  await fs.writeFile(layoutPath, layoutContent);
  console.log('Layout.js updated successfully');

  // Remove CreatePortfolio component from the compiled version
  console.log('Removing CreatePortfolio component');
  const appPath = path.join(workDir, 'src', 'App.js');
  let appContent = await fs.readFile(appPath, 'utf8');
  appContent = appContent.replace(/import CreatePortfolio from '\.\/components\/CreatePortfolio';/, '');
  appContent = appContent.replace(/<Route path="\/create-portfolio" component={CreatePortfolio} \/>/, '');
  await fs.writeFile(appPath, appContent);
  console.log('CreatePortfolio component removed successfully');

  console.log('All project files updated successfully');
}

async function createZip(sourceDir, outputPath) {
  console.log(`Creating zip file: ${outputPath}`);
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outputPath);

    archive
      .directory(sourceDir, false)
      .on('error', err => {
        console.error('Error creating zip:', err);
        reject(err);
      })
      .pipe(stream);

    stream.on('close', () => {
      console.log('Zip file created successfully');
      resolve();
    });
    archive.finalize();
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});