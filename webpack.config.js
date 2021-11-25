var path = require('path');

module.exports = {
  entry: './node_modules/@ethersproject/abi/lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ethers-abi.js',
    library: 'abi',
    libraryTarget: 'var',
  },
  mode: 'production',
};
