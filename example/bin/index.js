#!/usr/bin/env node

// Usage: npx create-vite-react-ts-dashboard my-app

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.

const copyFilePaths = [
    '.eslintignore',
    '.eslintrc',
    '.nvmrc',
    '.prettierignore',
    '.prettierrc',
    'commitlint.config.js',
    'gitignore',
    '.husky',
    'tsconfig.json',
    'vite.config.ts',
    'package.json',
    'README.md',
    'template'
]
const templateDir = path.resolve(__dirname, 'template');
const projectPackageJson = require(path.join(projectDir, 'package.json'));
const nvmrc = require(path.join(projectDir, '.nvmrc'));
const prettierRc = require(path.join(projectDir, '.prettierrc'));
const prettierIgnore = require(path.join(projectDir, '.prettierignore'));
const tsconfig = require(path.join(projectDir, 'tsconfig.json'));
const viteConfig = require(path.join(projectDir, 'vite.config.ts'));
const commitlintConfig = require(path.join(projectDir, 'commitlint.config.js'));
const huskyConfig = require(path.join(projectDir, '.husky'));
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);




// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

// Run `npm install` in the project directory to install
// the dependencies. We are using a third-party library
// called `cross-spawn` for cross-platform support.
// (Node has issues spawning child processes in Windows).
spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);