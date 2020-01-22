const path = require('path');
const merge = require('webpack-merge');

const commonWebpack = require('./webpack.config');

module.exports = merge.smart(commonWebpack, {
  devServer: {
    contentBase: path.resolve('./dist'),
    compress: true,
    port: process.env.DEV_PORT || 8080,
    host: process.env.DEV_HOST || '0.0.0.0'
  }
});
