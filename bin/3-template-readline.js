#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.';

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

const makeTemplate = () => {
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

const dirAnswer = (answer) => {
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
}

const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('wrong!');
    return rl.question('answer again', nameAnswer);
  }
  name = answer;
  return rl.question('저장할 경로를 설정하세요.(설정하지 않으면 현재경로)', dirAnswer);
}

const typeAnswer = (answer) => {
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.log('wrong!')
    return rl.question('answer again', typeAnswer);
  }
  type = answer;
  return rl.question('파일명을 설정하세요.', nameAnswer);
}

const program = () => {
  if (!type || !name) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question('어떤 템플릿이 필요하십니까?', typeAnswer);
  } else {
    makeTemplate();
  }
};

program();
