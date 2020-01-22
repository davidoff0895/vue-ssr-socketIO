const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  entry: './src/server/entry-server.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: 'bundle.server.js'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueSSRServerPlugin(),
  ]
});
