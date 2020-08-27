import spawn from 'cross-spawn';
import chalk from 'chalk';


export default function buildApp() {

  process.env.CI = 'false';
  process.env.EXTEND_ESLINT = 'true';

  spawn.sync('rm', ['-rf', 'build']);

  runBuild();
}

function runBuild() {
  console.log(chalk.blue('Building App...'));
  const buildResult = spawn.sync('react-app-rewired', ['build']);

  if (buildResult.status === 0) {
    console.log(chalk.green('Build Completed!'));
  }
  else {
    console.log(chalk.bold.red('Build Failed!'));
    console.log(buildResult.output[1].toString());
    console.log(buildResult.output[2].toString());
  }

  return buildResult;
}
