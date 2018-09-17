var path = require('path');

module.exports = {
  entry: './node_modules/ethjs-abi/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ethjs-abi.js',
    library: 'abi',
    libraryTarget: 'var',
  },
  mode: 'production',
};
