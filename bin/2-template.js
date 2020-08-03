#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';

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
  fs.mkdirSync(pathBuilder, { recursive: true });


  //const dirNames = path.relative('.', path.normalize(dir))
  //  .split(path.sep).filter(p => !!p);
  //
  //dirNames.forEach((dirName, idx) => {
  //  const pathBuilder = dirNames.slice(0, idx + 1).join(path.sep);
  //
  //  if (!exist(pathBuilder)) {
  //    fs.mkdirSync(pathBuilder);
  //  }
  //})
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

const program = () => {
  if (!type || !name) {
    console.error('사용방법: cli html|express-router 파일명 [생성 경로]');
  } else {
    makeTemplate();
  }
};

program();
