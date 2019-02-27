const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'node_modules/jasmine-promises/dist/jasmine-promises.js',
      { pattern: 'spec/*.js', watched: false },
    ],

    preprocessors: {
      'spec/*.js': [ 'webpack' ],
    },

    webpack: { ...webpackConfig, optimization: undefined },

    webpackMiddleware: {
      // Any custom webpack-dev-middleware configuration...
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
