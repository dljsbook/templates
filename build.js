/* globals Promise */
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const cheerio = require('cheerio');
const ghpages = require('gh-pages');
const rimrafOrig = require('rimraf');
const rimraf = (path) => new Promise((resolve, reject) => {
  rimrafOrig(path, err => {
    if (err) {
      return reject(err);
    }
    resolve();
  });
});

const src = path.resolve('./src');

const getJSFiles = src => {
  const files = fs.readdirSync(src);
  const jsFiles = [];
  for (let i = 0; i < files.length; i++){
    const file = files[i];
    if (/\.js$/.test(file)) {
      jsFiles.push(file);
    }
  }

  return jsFiles;
};

const copyFile = (source, target) => {
  const config = fs.readFileSync(source, 'utf8');
  fs.writeFileSync(target, config, 'utf8');
}

const makeDir = dir => new Promise((resolve, reject) => mkdirp(dir, (err) => {
  if (err) {
    return reject(err);
  }

  return resolve();
}));

const buildDir = async (dir) => {
  const src = `./src/${dir}`;
  const target = `./dist/${dir}`;

  // 1. create directory
  await rimraf(target);
  await makeDir(target);

  // 2. copy prettier file
  fs.createReadStream('./assets/.prettierrc').pipe(fs.createWriteStream(`${target}/.prettierrc`));

  // 3. copy JSON file and manipulate it
  const defaultJSON = JSON.parse(fs.readFileSync('./assets/package.json'));
  const dirJSON = JSON.parse(fs.readFileSync(`${src}/package.json`));
  const rootJSON = JSON.parse(fs.readFileSync(`./package.json`));
  const targetJSON = {
    ...defaultJSON,
    ...dirJSON,
    dependencies: {
      ...defaultJSON.dependencies,
      ...dirJSON.dependencies,
    },
    devDependencies: {
      ...defaultJSON.devDependencies,
      ...dirJSON.devDependencies,
    },
    version: rootJSON.version,
  };
  fs.writeFileSync(`${target}/package.json`, JSON.stringify(targetJSON, null, 2), 'utf8');

  // 4. copy HTML file
  const html = fs.readFileSync('./assets/index.html', 'utf8');
  const $ = cheerio.load(html, {
    withDomLvl1: true,
    normalizeWhitespace: false,
    xmlMode: true,
  });
  $('title').text(targetJSON.description);
  const text = $.html().replace('<script src="./index.js"> </script>', '<script src="./index.js"></script>');
  fs.writeFileSync(`${target}/index.html`, text, 'utf8');

  // 5. copy js file
  const jsFiles = getJSFiles(src);
  jsFiles.forEach(file => {
    fs.createReadStream(`${src}/${file}`).pipe(fs.createWriteStream(`${target}/${file}`));
  });

  // 6. copy sandbox config
  copyFile('./assets/sandbox.config.json', `${target}/sandbox.config.json`);
}

const buildDirs = async (dirs) => {
  await rimraf('./dist');
  await makeDir('./dist');
  for (let i = 0; i < dirs.length; i++) {
    console.log(dirs[i]);
    await buildDir(dirs[i]);
  }
}

const prepareBuild = () => new Promise((resolve, reject) => {
  fs.readdir(src, async (err, dirs) => {
    try {
      await buildDirs(dirs);
    } catch(err) {
      console.error(err);
      return reject(err);
    }
    return resolve();
  });
});

(async () => {
  await prepareBuild();
  ghpages.publish('dist', {
    branch: 'dist',
  });
  await rimraf('dist');
})();

