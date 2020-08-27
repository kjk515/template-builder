import path from 'path';
import { ncp } from 'ncp';
import spawn from 'cross-spawn';


const resolveApp = (endPath: string) => path.resolve(process.cwd(), path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);
const resolveOwn = (endPath: string) => path.resolve(__dirname, '../../..', path.isAbsolute(endPath) ? path.relative('/', endPath) : endPath);

export default function create(appName: string, directory: string) {

  const src = resolveOwn('template');
  const tgt = path.resolve(resolveApp(directory), appName);

  // TODO: package.json -> script version
  // TODO: tsconfig.json extends

  // 있으면 덮어씀
  ncp(src, tgt, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    runInstall(tgt);
  });
}

function runInstall(appRoot: string) {
  // TODO
  spawn.sync('cd', [appRoot]);
  const installResult = spawn.sync('yarn');

  console.log('성공!!!: ', installResult.output[1].toString());
  console.log('실패!!!: ', installResult.output[2].toString());

  return installResult;
}
