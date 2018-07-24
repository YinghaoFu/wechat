'use strict';

const path = require('path');
const __basename = path.dirname(__dirname);

var config = {
  port: '8080',
  deploy: {
    host: '180.76.121.118',
    port: '80',
    auth: 'fu',
    timeout: 9999,
    remotePath: '/opt/web/webapp/wechat'
  },
  webpack: {
    path: {
      base: __basename,
      src: path.resolve(__basename, 'src'),
      pub: path.resolve(__basename, 'dist')
    }
  }
};
module.exports = config;
