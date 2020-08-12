#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);

const curPaths = __dirname.split(path.sep);
const isOwnLinked = curPaths[curPaths.length - 3] !== 'node_modules'; // "npm link"로 테스트중인 경우
const resolveOwn = isOwnLinked ?
  (relativePath) => path.resolve(__dirname, '..', relativePath) :
  (relativePath) => path.resolve(__dirname, '..', '..', relativePath);

const src = resolveOwn('template/htmlTemplate.js');
const tgt = resolveApp('template-test');

if (!fs.existsSync(tgt)) {
  fs.copyFileSync(src, tgt, { dereference: true });
}
