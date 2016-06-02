var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'chai'],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      './priv/static/bundles/test.js'
    ],

    preprocessors: {
      './priv/static/bundles/test.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
}
