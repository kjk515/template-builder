import spawn from 'cross-spawn';


export default function buildApp() {

  runStart();
}

function runStart() {
  const startResult = spawn.sync('react-app-rewired', ['start']);

  console.log('성공!!!: ', startResult.output[1].toString());
  console.log('실패!!!: ', startResult.output[2].toString());

  return startResult;
}
