import path from 'path';
import spawn from 'cross-spawn';
import chalk from 'chalk';


const resolveOwn = (endPath: string) => path.resolve(__dirname, '../../..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

export default function buildLib() {

  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
  process.env.CI = 'false';
  process.env.EXTEND_ESLINT = 'true';

  spawn.sync('rm', ['-rf', 'lib']);

  const lintResult = runLint();

  if (lintResult.status !== 0) {
    return;
  }

  const typesResult = runTypes();

  if (typesResult.status !== 0) {
    return;
  }

  const esmBabelResult = runEsmBabel();

  if (esmBabelResult.status !== 0) {
    return;
  }

  runCommonjsBabel();
}

function runLint() {
  console.log(chalk.blue('Linting...'));
  const lintResult = spawn.sync('eslint', ['src/lib/**/*.{js,mjs,jsx,ts,tsx}', '--no-error-on-unmatched-pattern']);

  if (lintResult.status === 0) {
    console.log(chalk.green('Lint Completed!'));
    console.log();
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
    console.log();
  }
  else {
    console.log(chalk.bold.red('Emitting Types Failed!'));
    console.log(typesResult.output[1].toString());
    console.log(typesResult.output[2].toString());
  }

  return typesResult;
}

function runEsmBabel() {

  process.env.LIBRARY_TARGET = 'ESM';

  console.log(chalk.blue('Compiling ESM with Babel...'));
  const babelResult = spawn.sync('babel', [
    'src/lib',
    '-d', 'lib/esm',
    '--extensions', '.js,.mjs,.jsx,.ts,.tsx',
    //'--config-file', resolveOwn('config/.babelrc'),
  ]);

  if (babelResult.status === 0) {
    console.log(chalk.green('Compiled Successfully!'));
    console.log();
  }
  else {
    console.log(chalk.bold.red('Compile Failed!'));
    console.log(babelResult.output[1].toString());
    console.log(babelResult.output[2].toString());
  }

  return babelResult;
}

function runCommonjsBabel() {

  process.env.LIBRARY_TARGET = 'CJS';

  console.log(chalk.blue('Compiling CJS with Babel...'));
  const babelResult = spawn.sync('babel', [
    'src/lib',
    '-d', 'lib/cjs',
    '--extensions', '.js,.mjs,.jsx,.ts,.tsx',
    //'--config-file', resolveOwn('config/.babelrc'),
  ]);

  if (babelResult.status === 0) {
    console.log(chalk.green('Compiled Successfully!'));
    console.log();
  }
  else {
    console.log(chalk.bold.red('Compile Failed!'));
    console.log(babelResult.output[1].toString());
    console.log(babelResult.output[2].toString());
  }

  return babelResult;
}
