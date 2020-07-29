#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');

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

const makeDirectory = (dir) => {
  const dirNames = path.relative('.', path.normalize(dir))
    .split(path.sep).filter(p => !!p);

  dirNames.forEach((dirName, idx) => {
    const pathBuilder = dirNames.slice(0, idx + 1).join(path.sep);

    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  })
}

const makeTemplate = (type, name, directory) => {
  makeDirectory(directory);

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
  .command('init')
  .action(() => {
    inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: '템플릿 종류를 선택하세요.',
        choices: ['html', 'express-router'],
      }, {
        type: 'input',
        name: 'name',
        message: '파일의 이름을 입력하세요.',
        default: 'index',
      }, {
        type: 'input',
        name: 'directory',
        message: '파일이 위치할 폴더의 경로를 입력하세요.',
        default: '.',
      }, {
        type: 'confirm',
        name: 'confirm',
        message: '생성하시겠습니까?',
      }])
      .then((answers) => {
        if (answers.confirm) {
          makeTemplate(answers.type, answers.name, answers.directory);
        }
      })
  })

program
  .command('template <type>')
  .usage('--filename <filename> --path [path]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-n, --filename <filename>', '파일명을 입력하세요', 'index')
  .option('-d, --directory [path]', '생성 경로를 입력하세요', '.')
  .action((type, options) => {
    makeTemplate(type, options.filename, options.directory);
  });

program
  .command('*', { noHelp: true })
  .action(() => {
    console.log('해당 명령어를 찾을 수 없습니다.');
    program.help();
  });

program.parse(process.argv);
