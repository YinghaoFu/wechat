'use strict';

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const pkgJson = require('../package.json');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const theme = pkgJson.theme;
module.exports = type => {
  const isDev = type === 'dev';
  const isDist = type === 'dist';

  const cssLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    }
  ];
  const scssLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    },
    require.resolve('sass-loader')
  ];
  const lessLoaders = [
    {
      loader: require.resolve('css-loader'),
      options: { minimize: isDist }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: [require('autoprefixer'), require('postcss-discard-comments')]
      }
    },
    {
      loader: require.resolve('less-loader'),
      options: {
        javascriptEnabled: true
      }
    }
  ];

  return {
    mode: type === 'dev' ? 'development' : 'production',
    devtool: {
      dev: 'inline-source-map',
      dll: false,
      test: false,
      dist: false
    }[type],
    resolve: {
      alias: {},
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.scss', '.less', '.css']
    },
    entry: _.compact([
      isDev && 'react-hot-loader/patch',
      isDev && `webpack-hot-middleware/client?http://127.0.0.1:${config.port}`,
      isDev && 'webpack/hot/only-dev-server',
      './src/index',
      // './src/style/index'
    ]),
    output: {
      publicPath: isDist ? 'http://familyday.res.nasawz.com/opus_vote/' : '',
      filename: isDist
        ? `bundle/${pkgJson.version}/[name].[hash:8].js`
        : `bundle/${pkgJson.version}/[name].js`,
      chunkFilename: isDist
        ? `bundle/${pkgJson.version}/module.[name].[hash:8].js`
        : `bundle/${pkgJson.version}/module.[name].js`,
      path: path.join(config.webpack.path.pub)
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'lrz': 'window.lrz'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10
          },
          common: {
            chunks: 'initial',
            name: 'common',
            minSize: 0
          }
        }
      }
    },
    plugins: _.compact([
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev &&
      new HtmlWebpackPlugin({
        title: pkgJson.title,
        template: './src/templates/index.ejs',
        filename: 'index.html'
      }),
      isDist &&
      new HtmlWebpackPlugin({
        title: pkgJson.title,
        template: './src/templates/index.production.ejs',
        filename: 'index.html'
      }),
      isDist &&
      new ExtractTextPlugin({
        filename: `bundle/${pkgJson.version}/[name].[hash:8].css`,
        allChunks: true
      }),
      isDev &&
      new WebpackNotifierPlugin({
        title: pkgJson.title
      }),
      new CopyWebpackPlugin([
        {
          from: config.webpack.path.src + '/assets/',
          to: 'assets/'
        },
        {
          from: config.webpack.path.src + '/lib/',
          to: 'lib/'
        },
        {
          from: config.webpack.path.src + '/config.json',
          to: './'
        }
        
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          'lib/react.production.min.js',
          'lib/react-dom.production.min.js',
          'lib/jweixin-1.2.0.js',
        ],
        append: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          version: `"${pkgJson.version}"`
        }
      })
    ]),
    node: {
      fs: 'empty'
    },
    module: {
      rules: _.compact([
        {
          test: /\.(tsx?|jsx?)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'antd-mobile',
                  libraryDirectory: 'lib',
                  style: true
                })
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: isDist
            ? ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: cssLoaders
            })
            : [require.resolve('style-loader'), ...cssLoaders]
        },
        {
          test: /\.scss$/,
          use: isDist
            ? ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: scssLoaders
            })
            : [require.resolve('style-loader'), ...scssLoaders]
        },
        {
          test: /\.less$/,
          use: isDist
            ? ExtractTextPlugin.extract({
              fallback: require.resolve('style-loader'),
              use: lessLoaders
            })
            : [require.resolve('style-loader'), ...lessLoaders]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['url-loader?limit=1&name=img/[name].[hash:8].[ext]'],
          include: path.resolve(config.webpack.path.src)
        },
        {
          test: /\.(eot|ttf|woff)$/i,
          loaders: ['url-loader?name=font/[name].[hash:8].[ext]']
        }
      ])
    }
  };
};
