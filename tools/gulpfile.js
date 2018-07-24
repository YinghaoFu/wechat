var gulp = require('gulp');
var gutil = require('gulp-util');
var sftp = require('gulp-sftp');
var ftp = require('vinyl-ftp');
var fs = require('fs');
var path = require('path');

// config
var config = require('./config.js');
var auth = JSON.parse(fs.readFileSync(path.join(__dirname, '.ftppass'), 'utf8'))['upyun'];
var conn = ftp.create({
  host: auth.host,
  user: auth.user,
  password: auth.password,
  parallel: 10,
  log: gutil.log
});

gutil.log(gutil.colors.green('Starting to Gulp! Please wait...'));

gulp.task('deploy:bundle', function () {
  return gulp
    .src(['bundle/**'], { cwd: '../dist', buffer: false })
    .pipe(conn.newer('/wechat/bundle/'))
    .pipe(conn.dest('/wechat/bundle/'));
});

gulp.task('deploy:img', function () {
  return gulp
    .src(['img/**'], { cwd: '../dist', buffer: false })
    .pipe(conn.newer('/wechat/img/'))
    .pipe(conn.dest('/wechat/img/'));
});

gulp.task('deploy:lib', function () {
  return gulp
    .src(['lib/**'], { cwd: '../dist', buffer: false })
    .pipe(conn.newer('/wechat/lib/'))
    .pipe(conn.dest('/wechat/lib/'));
});
gulp.task('deploy:assets', function () {
  return gulp
    .src(['assets/**'], { cwd: '../dist', buffer: false })
    .pipe(conn.newer('/wechat/assets/'))
    .pipe(conn.dest('/wechat/assets/'));
});

gulp.task('deploy', ['deploy:bundle', 'deploy:img', 'deploy:lib', 'deploy:assets'], function () {
  return gulp
    .src([
      config.webpack.path.pub + '/index.html',
      config.webpack.path.pub + '/config.json',
      config.webpack.path.pub + '/favicon.ico'
    ])
    .pipe(sftp(config.deploy));
});
