import spawn from 'cross-spawn';
import chalk from 'chalk';


export default function start() {

  runStart();
}

function runStart() {
  console.log(chalk.blue('Starting App...'));
  const startResult = spawn.sync('react-app-rewired', ['start']);

  if (startResult.status === 0) {
    console.log(startResult.output[1].toString());
  }
  else {
    console.log(startResult.output[2].toString());
  }

  return startResult;
}
