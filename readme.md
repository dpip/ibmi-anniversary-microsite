#Bluemix deployment command AFTER login via terminal (cf login)

From the public directory:

cf push ibmi30

#To initialize a new instance and push run:

cf push ibmi30 -m 64M -b https://github.com/cloudfoundry-community/staticfile-buildpack.git


#Deployment Reference below

 http://how-to-host-static-sites-on.mybluemix.net/


# Centerline V18 Repository Boilerplate

## Overview

This repository is intended to be used as a starting point for V18 projects.  It contains a standardized folder structure, build tools, and environment setup for a developer to get up to speed quickly.

## Getting Started

After cloning/copying this repository, you should only need to run `yarn install` in your terminal to get started.

## Folder Structure

```
public/
  |  assets/
  |  |  stylesheets/
  |  |  |  style.css
  |  |  javascript/
  |  |  |  vendor/
  |  |  |  |  something.min.js
  |  |  |  scripts.js
  |  index.html
source/
  |  javascript/
  |  |  a.js
  |  |  b.js
  |  |  c.js
  |  scss/
  |  |  styles.scss
  |  |  other-things.scss
webpack.config.js
index.html
package.json

```

`/source` is the folder where we will do our work. `/public` is the folder where the pages will run from.  The `/public/assets` folder houses all of the images, compiled javascript files, stylesheets, and any other media.

Plugins and third-party libraries will live in `public/assets/javascript/vendor`, and *will not* be minified or concatenated into our scripts.js file.

`index.html` will automatically perform a meta-refresh to the `public/` folder.



## Basic Toolbox

### Yarn and NPM

This repo makes extensive use of the NPM ecosystem.  Our tool of choice is [Yarn](https://yarnpkg.com/).  If you do not have Yarn installed, please visit the website for installation instructions.

To install dev dependencies, run `yarn install` in a terminal.  Additionally, when cloning this repository, please update the information in the `package.json` file.

To run one of the build tasks, enter `yarn run TASKNAME` in the console.

### Webpack
The current build tool is Webpack.  The `webpack.config.js` contains all of the npm scripts that you can run.  Feel free to modify them and add more if needed.

The **watch** task is for running while developing locally.  It will automatically compile sass and babel code into the appropriate `/assets` folders.  It will also update your documentation for you.

The **autoprefix** task will run postcss transformations, and add in the appropriate browser prefixes.  **Please run this task before running the release task.**

The **release** task is essentially the same as the watch task, but without the watching and browser syncing.  This will pack up all of the JS files, SASS->CSS compilation, *optimize images*, and will create a `RELEASE.zip` file that serves as a release package. **PLEASE RENAME THE RELEASE.ZIP FILE**, our preferred naming structure is `{{jobNumber}}-v{{versionNumber}}-{{yyyymmdd}}`.  Every release should have a different version number that is reflected in the `package.json` file.  Semantic Versioning is preferred.

## Editor Plugins

### Atom
 - prettier
 - bottom-dock
 - atom-beautify
 - editorconfig
 - linter
 - linter-eslint

### Sublime Text
 - [editorconfig] (https://github.com/sindresorhus/editorconfig-sublime#readme)
 - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
 - [SublimeLinter](http://www.sublimelinter.com/en/latest/)
 - [Javascript Next](https://packagecontrol.io/packages/JavaScriptNext%20-%20ES6%20Syntax)
