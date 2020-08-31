import fs from 'fs';
import path from 'path';
import os from 'os';
import { ncp } from 'ncp';
import spawn from 'cross-spawn';
import chalk from 'chalk';
import packageJson from '../../package.json';
import appPackageJson from '../../template/package.json';


const resolveApp = (endPath: string) => path.resolve(process.cwd(), path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);
const resolveOwn = (endPath: string) => path.resolve(__dirname, '../../..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

export default function create(appName: string, directory: string) {

  const src = resolveOwn('template');
  const tgt = path.join(resolveApp(directory), appName);

  console.log(chalk.blue('Making Template...'));
  // 있으면 덮어씀
  ncp(src, tgt, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    addDependencies(tgt);
    console.log(chalk.green('Template has been made!'));

    const installResult = runInstall(tgt);

    if (installResult.status === 0) {
      consoleForGuide(tgt, appName);
    }
  });
}

function addDependencies(appRoot: string) {
  appPackageJson.devDependencies = { ...appPackageJson.devDependencies, [packageJson.name]: packageJson.version };

  fs.writeFileSync(path.join(appRoot, 'package.json'), JSON.stringify(appPackageJson, null, 2) + os.EOL);
}

function runInstall(appRoot: string) {
  console.log(chalk.blue('Install Dependencies...'));

  const installResult = spawn.sync('yarn', ['--cwd', appRoot]);

  if (installResult.status === 0) {
    console.log(chalk.green('Install Completed!'));
  }
  else {
    console.log(chalk.bold.red('Install Failed!'));
    console.log(installResult.output[1].toString());
    console.log(installResult.output[2].toString());
  }

  return installResult;
}

function consoleForGuide(appRoot: string, appName: string) {
  console.log();
  console.log(`Success! Created ${appName} at ${appRoot}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  yarn start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(
    chalk.cyan(`  yarn build-app`)
  );
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  yarn build-lib`));
  console.log('    Bundles the library into static files for publishing.');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), appRoot);
  console.log(`  ${chalk.cyan(`yarn start`)}`);
  console.log();
  console.log('Happy hacking!');
}
