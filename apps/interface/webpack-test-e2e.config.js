const path = require('path');
const globby = require('globby');
const testPath = path.resolve('web', 'modules');
const testE2EEntryGlob = path.join(testPath, '**/*.e2e.ts');
const testE2EPathList = globby.sync(testE2EEntryGlob);

const webpack = require('./webpack.config');
webpack.entry = {
  'test-e2e': testE2EPathList
}
module.exports = webpack;
