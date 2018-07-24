'use strict';

const config = require('./config');
const dyson = require('dyson');
const proxy = require('http-proxy-middleware');
const path = require('path');
const http = require('http');

const express = require('express');
const webpack = require('webpack');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const getConfig = require('./webpack-config');

function startDevServer() {
  const app = express();
  /*=============webpack start==============*/
  const devConfig = getConfig('dev');
  const compiler = webpack(devConfig);
  app.use(
    devMiddleware(compiler, {
      // publicPath: devConfig.output.publicPath,
      // historyApiFallback: true,
    })
  );
  app.use(hotMiddleware(compiler));
  /*=============webpack end==============*/

  /*=============proxy start==============*/
  (() => {
    let proxy_options = {
      target: `http://0.0.0.0:8061/`,
      secure: false,
      changeOrigin: true,
      ws: true,
      ignorePath: false,
      pathRewrite: {
        '^/wechat_api/': ''
      }
    };
    let webProxy = proxy(proxy_options);
    app.use('/wechat_api/*', webProxy);
  })();  
  app.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${config.port}/`);
  });
}

startDevServer();
