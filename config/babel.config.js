
const presetsESM = [
  ['react-app', { flow: false, typescript: true, absoluteRuntime: false }],
];

const presetsCJS = [
  ['react-app', { flow: false, typescript: true, absoluteRuntime: false, useESModules: false }],
  ['@babel/preset-env', {
    modules: 'commonjs',
    targets: {
      node: 'current',
    },
  }],
];

const plugins = [
  ['module-resolver', {
    alias: {
      '~': './src',
    },
  }],
];

module.exports = { presets: process.env.LIBRARY_TARGET === 'ESM' ? presetsESM : presetsCJS, plugins };
