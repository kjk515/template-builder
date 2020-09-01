import spawn from 'cross-spawn';
import chalk from 'chalk';


export default function start() {

  process.env.CI = 'false';
  process.env.EXTEND_ESLINT = 'true';

  runStart();
}

function runStart() {
  console.log(chalk.blue('Starting App...'));
  spawn('react-app-rewired', ['start'], { stdio: 'inherit' });
}
