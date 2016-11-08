const path = require('path');
const globby = require('globby');
const testPath = path.resolve('web', 'modules');
const testEntryGlob = path.join(testPath, '**/*.spec.ts');
const testPathList = globby.sync(testEntryGlob);

const webpack = require('./webpack.config');
webpack.entry = {
  test: testPathList
}
module.exports = webpack;
