const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const webpackClientConfig = require('../../webpack/webpack.dev.config');
const webpackServerConfig = require('../../webpack/webpack.server.config');

module.exports = (app, onServerUpdate) => {
  // client
  const clientCompiler = webpack(webpackClientConfig)
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  const hotMiddleware = require('webpack-hot-middleware')(clientCompiler)
  clientCompiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })
  app.use(require('connect-history-api-fallback')());
  app.use(devMiddleware);
  app.use(hotMiddleware);

  // server
  const serverCompiler = webpack(webpackServerConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      return console.error(err);
    }
    stats = stats.toJson();
    if (stats.errors.length) return console.error(stats.errors);

    console.log('ssr rebuild complete');

    const manifestFilePath = path.join(webpackServerConfig.output.path, 'vue-ssr-server-bundle.json');
    const bundleFile = mfs.readFileSync(manifestFilePath, 'utf-8');
    const bundle = JSON.parse(bundleFile);
    onServerUpdate({ bundle });
  })
};
