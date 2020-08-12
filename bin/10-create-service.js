#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');
const ncp = require('ncp').ncp;

const resolveApp = (endPath) => path.resolve(process.cwd(), path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);
const resolveOwn = (endPath) => path.resolve(__dirname, '..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

const packageJson = require(resolveOwn('package.json'));

// template-builder create appName ./test
// template-builder add service /lib/model/test /lib/service/test

program
  .version(packageJson.version, '-v, --version');

program
  .command('create <app-name> [directory]')
  .description('템플릿으로 새로운 프로젝트를 만듭니다.')
  .option('-d, --directory [directory]', '생성 경로를 입력하세요', '.')
  .action((appName, directory, options) => {

    const root = directory || options.directory;
    const src = resolveOwn('template');
    const tgt = path.resolve(resolveApp(root), appName);

    ncp(src, tgt); // 있으면 엎어씀
  });

program
  .command('add-service <model-root> [service-root]')
  .description('모델을 참조하여 서비스를 생성합니다.')
  .option('-d --directory [directory]', '서비스 생성 경로를 입력하세요')
  .action((modelRoot, serviceRoot, options) => {

    const servicePath = modelRoot.replace('model/', 'service/');
    const root = serviceRoot || options.directory || servicePath;

    fs.mkdirSync(resolveApp(root), { recursive: true });
    fs.writeFileSync(path.join(resolveApp(root), `TestService.ts`), 'service');
  });

program.parse(process.argv)
