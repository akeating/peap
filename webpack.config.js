const path = require('path');
const globby = require('globby');
const root = __dirname;
const depsPath = path.join(root, 'deps');
const nodeModulesPath = path.join(root, 'node_modules');
const privStaticPath = path.resolve(root, 'priv', 'static');
const buildPath = path.join(privStaticPath, 'bundles');
const commonPath = path.resolve('web', 'static', 'modules', 'common');
const commonEntryFile = path.join(commonPath, 'common.ts');
const mainPath = path.resolve('web', 'static', 'modules', 'main');
const mainEntryFile = path.join(mainPath, 'main.ts');
const testPath = path.resolve('web', 'static', 'modules');
const testEntryGlob = path.join(testPath, '**/*.spec.ts');
const testPathList = globby.sync(testEntryGlob);
const testE2EEntryGlob = path.join(testPath, '**/*.e2e.ts');
const testE2EPathList = globby.sync(testE2EEntryGlob);

module.exports = {
  entry: {
    common: commonEntryFile,
    main: mainEntryFile,
    test: testPathList,
    'test-e2e': testE2EPathList
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.less$/, loaders: ['style', 'css', 'resolve-url', 'less'] },
      { test: /\.css$/, loaders: ['style', 'css', 'resolve-url'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'resolve-url', 'sass'], exclude: [mainPath] },
      { test: /\.scss$/, loaders: ['raw', 'resolve-url', 'sass'], include: [mainPath] },
      // { test: /\.js$/, loader: 'babel', exclude: [nodeModulesPath] },
      { test: /\.ts$/, loader: 'awesome-typescript-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: [nodeModulesPath],
    alias: {}
  },
  plugins: [],
  noParse: []
};
