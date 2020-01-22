const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const includePath = path.resolve(__dirname, '..');

module.exports = {
  entry: {
    index: `./src/client/entry-client.ts`
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, `../../dist`)
  },
  mode: process.env.WEBPACK_MODE || 'development',
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        extensions: ['.ts', '.tsx', '.js', '.vue'],
        baseUrl: '.'
      })
    ],
    modules: [
      'node_modules',
      path.resolve('./src'),
    ],
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: includePath,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.css$/,
        include: includePath,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
              ]
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /\.data\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.data\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: -Infinity
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new TsconfigPathsPlugin({
      baseUrl: path.resolve(__dirname, '../../src'),
      extensions: [".js", ".ts", ".tsx"],
      configFile: './tsconfig.json'
    }),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/**/*.{ts,tsx}', '!src/skip.ts'],
      checkSyntacticErrors: true,
      tslint: true,
      tsconfig: './tsconfig.json',
      async: true
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(`src/client/index.html`),
      inject: true,
      chunks: ['index']
    }),
    new CleanWebpackPlugin( {
      verbose: true
    }),
    new webpack.DefinePlugin([
      'NODE_ENV',
      'BABEL_ENV'
    ])
  ]
}
