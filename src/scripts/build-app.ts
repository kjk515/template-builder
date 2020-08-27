import spawn from 'cross-spawn';


export default function buildApp() {

  spawn.sync('rm', ['-rf', 'build']);

  runBuild();
}

function runBuild() {
  const buildResult = spawn.sync('react-app-rewired', ['build']);

  console.log('성공!!!: ', buildResult.output[1].toString());
  console.log('실패!!!: ', buildResult.output[2].toString());

  return buildResult;
}
