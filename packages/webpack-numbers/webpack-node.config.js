const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-back.js',
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    ...nodeExternals(),
  },
  devtool: 'source-map',
  // optimization: {
  //   runtimeChunk: true,
  // },
};
