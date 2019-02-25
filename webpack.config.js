const path = require('path');

module.exports = {
//   mode: NODE_ENV,
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true,
  },
};
