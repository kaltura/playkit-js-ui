// Create custom launcher in case running with Travis
const launchers = {
  Chrome_browser: {
    base: 'ChromeHeadless',
    flags: ['--no-sandbox']
  }
};

module.exports = function (config) {
  let karmaConf = {
    logLevel: config.LOG_INFO,
    browsers: [],
    concurrency: 1,
    singleRun: true,
    colors: true,
    frameworks: ['mocha'],
    files: ['test/setup/karma.js'],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/setup/karma.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      ...require('./webpack.config.js'),
      externals: {}, //Need to remove externals otherwise they won't be included in test
      devtool: 'inline-source-map', // Need to define inline source maps when using karma
      mode: config.mode || 'development' // run in development mode by default to avoid minifying -> faster
    },
    webpackServer: {
      noInfo: true
    },
    client: {
      mocha: {
        reporter: 'html',
        timeout: 50000
      }
    }
  };

  karmaConf.customLaunchers = launchers;
  karmaConf.browsers = ['Chrome_browser'];
  config.set(karmaConf);
};
