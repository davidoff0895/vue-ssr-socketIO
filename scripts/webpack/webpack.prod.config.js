const merge = require('webpack-merge');
const commonWebpack = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge.smart(commonWebpack, {
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.css$/
      },
      {
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
});
