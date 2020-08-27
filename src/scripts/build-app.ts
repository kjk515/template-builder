import spawn from 'cross-spawn';


export default function buildApp() {

  process.env.CI = 'false';
  process.env.EXTEND_ESLINT = 'true';

  spawn.sync('rm', ['-rf', 'build']);

  runBuild();
}

function runBuild() {
  const buildResult = spawn.sync('react-app-rewired', ['build']);

  console.log('성공!!!: ', buildResult.output[1].toString());
  console.log('실패!!!: ', buildResult.output[2].toString());

  return buildResult;
}
