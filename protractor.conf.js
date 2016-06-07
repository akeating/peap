exports.config = {
  baseUrl: 'http://localhost:4002/',

  specs: [
    './priv/static/bundles/test-e2e.js'
  ],
  exclude: [],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  useAllAngular2AppRoots: true
};
