#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');
const ncp = require('ncp').ncp;

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);
const resolveOwn = (relativePath) => path.resolve(__dirname, '..', relativePath);

const src = resolveOwn('template');
const tgt = resolveApp('template-test');

if (!fs.existsSync(tgt)) {
  ncp(src, tgt);
}
