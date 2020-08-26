
const path = require('path');
//const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');
//const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');

//const appPath = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);
const appSrcPath = resolveApp('src');


module.exports = function override(config, env) {
  //
  config.resolve.alias = {
    '~': appSrcPath,
    [process.env.npm_package_name]: path.resolve(appSrcPath, 'lib'),
  };

  //config.plugins.push(
  //  new ForkTsCheckerWebpackPlugin({
  //    //typescript: resolve.sync('typescript', {
  //    //  basedir: paths.appNodeModules,
  //    //}),
  //    //async: isEnvDevelopment,
  //    useTypescriptIncrementalApi: true,
  //    checkSyntacticErrors: true,
  //    tsconfig: resolveApp('tsconfig.base.json'),
  //    reportFiles: [
  //      '**',
  //      '!**/__tests__/**',
  //      '!**/?(*.)(spec|test).*',
  //      '!**/src/setupProxy.*',
  //      '!**/src/setupTests.*',
  //    ],
  //    watch: resolveApp('src'),
  //    silent: true,
  //    // The formatter is invoked directly in WebpackDevServerUtils during development
  //    //formatter: isEnvProduction ? typescriptFormatter : undefined,
  //  }),
  //);

  // storybook 용
  //if (!config.resolve.plugins) {
  //  config.resolve.plugins = [];
  //}
  //config.resolve.plugins.push(new TsconfigPathsWebpackPlugin({ configFile: 'tsconfig.base.json' }));

  //config.module.rules.push({
  //  test: /\.(ts|tsx)$/,
  //  include: appSrcPath,
  //  use: [
  //    {
  //      loader: require.resolve('react-docgen-typescript-loader'),
  //      options: {
  //        tsconfigPath: path.resolve(appPath, 'tsconfig.json'),
  //      },
  //    },
  //  ],
  //});
  //config.module.rules.push({
  //  test: /\.code$/,
  //  include: appSrcPath,
  //  loader: require.resolve('raw-loader'),
  //});

  //config.plugins.push(new webpack.DefinePlugin({
  //  APP_NAME: JSON.stringify(process.env.npm_package_name),
  //  APP_VERSION: JSON.stringify(process.env.npm_package_version),
  //}));
  //
  //
  //config.node = {
  //  module: 'empty',
  //  dgram: 'empty',
  //  dns: 'mock',
  //  fs: 'empty',
  //  http2: 'empty',
  //  net: 'empty',
  //  tls: 'empty',
  //  child_process: 'empty',
  //};

  return config;
};
