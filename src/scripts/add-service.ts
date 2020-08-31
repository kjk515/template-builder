import fs from 'fs';
import path from 'path';
import chalk from 'chalk';


const resolveApp = (endPath: string) => path.resolve(process.cwd(), path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

export default function addService(modelPath: string) {
  const fullPath = resolveApp(modelPath);

  if (validate(fullPath)) {
    makeService(fullPath);
  }
}

function validate(path: string) {

  if (!fs.existsSync(path)) {
    console.log(chalk.bold.red(`Not exists path: ${path}`));
    return false;
  }
  if (!fs.readdirSync(path).some(fileNames => fileNames.endsWith('Model.ts'))) {
    console.log(chalk.bold.red(`Not exists Model.ts files in directory: ${path}`));
    return false;
  }

  return true;
}

function makeService(modelPath: string) {
  const modelFiles = fs.readdirSync(modelPath).filter(fileNames => fileNames.endsWith('Model.ts'));

  modelFiles.forEach(modelFile => {
    makeDomainLogic(modelFile, modelPath);
  });
}

function makeDomainLogic(modelFileName: string, modelPath: string) {
  const serviceFileName = modelFileName.replace('Model.ts', 'Service.ts');
  const servicePath = path.join(modelPath.replace('model', 'service'), 'logic');

  console.log(chalk.blue(`Making ${serviceFileName} in ${servicePath}...`));

  fs.mkdirSync(servicePath, { recursive: true });
  fs.writeFileSync(path.join(servicePath, serviceFileName), 'service');

  console.log(chalk.green(`${serviceFileName} in ${servicePath} has been made!`));
  console.log();
}
