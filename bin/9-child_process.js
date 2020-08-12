#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');
const ncp = require('ncp').ncp;

const resolveApp = (relativePath) => path.resolve(process.cwd(), relativePath);
const resolveOwn = (relativePath) => path.resolve(__dirname, '..', relativePath);

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
