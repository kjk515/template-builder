import fs from 'fs';
import path from 'path';
import program from 'commander';

import packageJson from '../package.json';
import buildLib from './scripts/build-lib';
import create from './scripts/create';

const resolveApp = (endPath: string) => path.resolve(process.cwd(), path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);
const resolveOwn = (endPath: string) => path.resolve(__dirname, '..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);


// template-builder create appName ./test
// template-builder add service /lib/model/test /lib/service/test

program
  .version(packageJson.version, '-v, --version');

program
  .command('create <app-name> [directory]')
  .description('템플릿으로 새로운 프로젝트를 만듭니다.')
  .option('-d, --directory [directory]', '생성 경로를 입력하세요', '.')
  .action((appName, directory, options) => {
    create(appName, directory || options.directory);
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

program
  .command('build-lib')
  .description('라이브러리 빌드를 실행합니다.')
  .action(() => {
    buildLib();
  });

program.parse(process.argv)
