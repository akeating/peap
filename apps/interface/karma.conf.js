var path = require('path');
var _ = require('lodash');
var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function(config) {
  config.set({
    basePath: path.resolve('web', 'modules'),
    frameworks: ['jasmine', 'chai'],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      { pattern: 'test.ts', served: true, included: true, watched: false },
      { pattern: '**/*.spec.ts', served: true, included: true, watched: false },
    ],

    preprocessors: {
      'test.ts': ['webpack', 'sourcemap'],
      '**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    mime: { 'text/x-typescript': ['ts','tsx'] }
  });
}
