import path from 'path';
import spawn from 'cross-spawn';
import chalk from 'chalk';


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
  console.log(chalk.blue('Linting...'));
  const lintResult = spawn.sync('eslint', ['src/lib/**/*.{js,mjs,jsx,ts,tsx}', '--no-error-on-unmatched-pattern']);

  if (lintResult.status === 0) {
    console.log(chalk.green('Lint Completed!'));
  }
  else {
    console.log(chalk.bold.red('Lint Failed!'));
    console.log(lintResult.output[1].toString());
    console.log(lintResult.output[2].toString());
  }

  return lintResult;
}

function runTypes() {
  console.log(chalk.blue('Emitting Types...'));
  const typesResult = spawn.sync('ttsc', ['-p', 'src/lib/tsconfig.json']);

  if (typesResult.status === 0) {
    console.log(chalk.green('Types have been emitted!'));
  }
  else {
    console.log(chalk.bold.red('Emitting Types Failed!'));
    console.log(typesResult.output[1].toString());
    console.log(typesResult.output[2].toString());
  }

  // TODO: @types 내부의 ~/ path resolve가 필요하다면 아래의 내용 추가
  //    "ttypescript": "^1.5.11",
  //    "typescript-transform-paths": "^2.0.0"
  //    "plugins": [
  //      {
  //        "transform": "typescript-transform-paths"
  //      }
  //    ]
  //  단, "emitDeclarationOnly": true 일 경우 변환해주지 않음

  return typesResult;
}

function runBabel() {
  console.log(chalk.blue('Compiling with Babel...'));
  const babelResult = spawn.sync('babel', [
    'src/lib',
    '-d', 'lib',
    '--extensions', '.js,.mjs,.jsx,.ts,.tsx',
    '--config-file', resolveOwn('utils/.babelrc'),
  ]);

  if (babelResult.status === 0) {
    console.log(chalk.green('Compile Completed!'));
  }
  else {
    console.log(chalk.bold.red('Compile Failed!'));
    console.log(babelResult.output[1].toString());
    console.log(babelResult.output[2].toString());
  }

  return babelResult;
}
