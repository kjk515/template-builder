import program from 'commander';

import packageJson from '../package.json';
import buildLib from './scripts/build-lib';
import buildApp from './scripts/build-app';
import create from './scripts/create';
import start from './scripts/start';


program
  .version(packageJson.version, '-v, --version');

program
  .command('create <app-name> [directory]')
  .description('Create new react project')
  .option('-d, --directory [directory]', 'add the path where new project will be included', '.')
  .action((appName, directory, options) => {
    create(appName, directory || options.directory);
  });

program
  .command('build-lib')
  .description('Run a library build')
  .action(() => {
    buildLib();
  });

program
  .command('build-app')
  .description('Run a app build')
  .action(() => {
    buildApp();
  });

program
  .command('start')
  .description('start a local server')
  .action(() => {
    start();
  });

program.parse(process.argv);
