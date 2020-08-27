import path from 'path';
import spawn from 'cross-spawn';


const resolveOwn = (endPath: string) => path.resolve(__dirname, '../../..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

export default function buildLib() {

  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';

  spawn.sync('rm', ['-rf', 'lib']);

  const lintResult = runLint();

  if (lintResult.status !== 0) {
    return;
  }

  const typesResult = runTypes();

  if (typesResult.status !== 0) {
    return;
  }

  runBabel();
}

function runLint() {
  const lintResult = spawn.sync('eslint', ['src/lib/**/*.{js,mjs,jsx,ts,tsx}', '--no-error-on-unmatched-pattern']);

  console.log('성공!!!: ', lintResult.output[1].toString());
  console.log('실패!!!: ', lintResult.output[2].toString());

  return lintResult;
}

function runTypes() {
  const typesResult = spawn.sync('ttsc', ['-p', 'src/lib/tsconfig.json']);

  console.log('성공!!!: ', typesResult.output[1].toString());
  console.log('실패!!!: ', typesResult.output[2].toString());

  //    "ttypescript": "^1.5.11",
  //    "typescript-transform-paths": "^2.0.0"
  //    "plugins": [
  //      {
  //        "transform": "typescript-transform-paths"
  //      }
  //    ]
  // "emitDeclarationOnly": true 일 경우 변환해주지 않음

  return typesResult;
}

function runBabel() {
  const babelResult = spawn.sync('babel', [
    'src/lib',
    '-d', 'lib',
    '--extensions', '.js,.mjs,.jsx,.ts,.tsx',
    '--config-file', resolveOwn('utils/.babelrc'),
  ]);

  console.log('성공!!!: ', babelResult.output[1].toString());
  console.log('실패!!!: ', babelResult.output[2].toString());

  return babelResult;
}
