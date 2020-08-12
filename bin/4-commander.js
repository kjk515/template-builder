#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');

const htmlTemplate = 'htmlTemplate';
const routerTemplate = 'routerTemplate';

const exist = (path) => {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const makeTemplate = (type, name, directory) => {
  fs.mkdirSync(directory, { recursive: true });

  if (type === 'html') {
    const filePath = path.join(directory, `${name}.html`);

    if (exist(filePath)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(filePath, htmlTemplate);
      console.log(filePath, '생성 완료');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, '생성 완료');
    }
  } else {
    console.error('html 또는 express-router 둘 중 하나를 입력하세요.');
  }
};

program
  .version('0.0.1', '-v, --version')
  .usage('[options]');

program
  .command('template <type> [filename] [directory]')
  .usage('--filename <filename> --directory [directory]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-n, --filename <filename>', '파일명을 입력하세요', 'index')
  .option('-d, --directory [directory]', '생성 경로를 입력하세요', '.')
  .action((type, filename, directory, options) => {
    makeTemplate(type, filename || options.filename, directory || options.directory);
  });

program
  .command('*', { noHelp: true })
  .action(() => {
    console.log('해당 명령어를 찾을 수 없습니다.');
    program.help();
  });

program
  .parse(process.argv);
