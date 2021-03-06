var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var expect = require('gulp-expect-file');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var del = require('del');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var tap = require('gulp-tap');
var replaceAll = require('gulp-batch-replace');
var path = require('path');

var cssElements = [];
var jsElements = [];

// config files

var tsProject = ts.createProject('./tsconfig.json');
var config = require('./config.json');

// environments

var env;

function getEnv() {
  if (env != null) {
    return;
  }

  var envKeys = Object.keys(config);
  if (envKeys.length == 0) {
    util.log('No environments found in config.json');
    process.exit(1);
  }

  var envKey = envKeys[0];
  if (typeof util.env.env == 'string') {
    if (envKeys.indexOf(util.env.env) == -1) {
      util.log('Environment \'' + util.env.env + '\' does not exist in config.json');
      process.exit(1);
    }
    envKey = util.env.env;
  }

  env = config[envKey];
  util.log('Using environment \'' + envKey + '\'');
}

// tasks

gulp.task('ts', function() {
  getEnv();

  return gulp.src(env.typescript.src)
    .pipe(gulpIf(env.typescript.sourceMaps.use, sourcemaps.init()))
    .pipe(tsProject())
    .pipe(gulpIf(env.typescript.minify, uglify()))
    .pipe(rename({extname: env.typescript.outExt}))
    .pipe(gulpIf(env.typescript.minify, rename({extname: env.typescript.outMinExt})))
    .pipe(gulpIf(env.typescript.sourceMaps.use, sourcemaps.write(
      env.typescript.sourceMaps.external ? env.typescript.sourceMaps.externalRelDir : null,
      env.typescript.sourceMaps.external ? {
        sourceMappingURLPrefix: env.typescript.sourceMaps.externalURLPrefix
      } : null
    )))
    .pipe(gulp.dest(env.typescript.outDir));
});

gulp.task('sass', function() {
  getEnv();

  return gulp.src(env.sass.src)
    .pipe(gulpIf(env.sass.sourceMaps.use, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(env.sass.minify, cssnano()))
    .pipe(rename({extname: env.sass.outExt}))
    .pipe(gulpIf(env.sass.minify, rename({extname: env.sass.outMinExt})))
    .pipe(gulpIf(env.sass.sourceMaps.use, sourcemaps.write(
      env.sass.sourceMaps.external ? env.sass.sourceMaps.externalRelDir : null,
      env.sass.sourceMaps.external ? {
        sourceMappingURLPrefix: env.sass.sourceMaps.externalURLPrefix
      } : null
    )))
    .pipe(gulp.dest(env.sass.outDir));
});

gulp.task('assets', function() {
  getEnv();
  var tasks = env.assets.map(function(assets) {
    return gulp.src(assets.src)
      .pipe(expect(assets.src))
      .pipe(gulp.dest(assets.outDir));
  });
  return merge(tasks);
});

gulp.task('clean', function() {
  getEnv();
  return del.sync(env.clean);
});

gulp.task('getCss',function(){
  getEnv();
  cssElements = [];
  return gulp.src('site/dist/css/*.css')
    .pipe(gulpIf(env.sass.minify , tap(function (file) {
      var newFileName = path.basename(file.path).trim();
      var oldFileName = newFileName.includes('.min') ?
        newFileName.replace('.min', '').trim() :
        newFileName.substr(0, newFileName.indexOf('.')) + '.min' + newFileName.substr(newFileName.indexOf('.')).trim();
        cssElements.push([oldFileName, newFileName]);
    })));
});

gulp.task('replaceCss',function(){
  getEnv();
  return gulp.src('site/dist/index.html')
    .pipe(gulpIf(env.sass.minify, replaceAll(cssElements)))
    .pipe(gulpIf(env.sass.minify, gulp.dest('./site/dist')));
});

gulp.task('fixCss', function(callback){
  getEnv();
  runSequence(
    'getCss',
    'replaceCss',
    callback
  );
});

gulp.task('getJs',function(){
  getEnv();
  jsElements = [];
  return gulp.src('site/dist/css/*.js')
    .pipe(gulpIf(env.typescript.minify ,tap(function (file) {
      var newFileName = path.basename(file.path).trim();
      var oldFileName = newFileName.includes('.min') ?
        newFileName.replace('.min', '').trim() :
        newFileName.substr(0, newFileName.indexOf('.')) + '.min' + newFileName.substr(newFileName.indexOf('.')).trim();
        jsElements.push([oldFileName, newFileName]);
    })));
});

gulp.task('replaceJs',function(){
  getEnv();
  return gulp.src('site/dist/index.html')
  .pipe(gulpIf(env.typescript.minify, replaceAll(jsElements)))
  .pipe(gulpIf(env.typescript.minify, gulp.dest('./site/dist')));
});

gulp.task('fixJs', function(callback){
  getEnv();
  runSequence(
    'getJs',
    'replaceJs',
    callback
  );
});

gulp.task('build', function(callback) {
  getEnv();

  runSequence(
    'clean',
    'ts',
    'sass',
    'assets',
    'fixJs',
    'fixCss',
    callback
  );
});

gulp.task('watch', function(callback) {
  getEnv();

  runSequence(
    ['ts', 'sass'],
    callback
  );

  gulp.watch(env.typescript.src, ['ts']);
  gulp.watch(env.sass.src, ['sass']);
});

gulp.task('help', function() {
  util.log(`
Usage: gulp [TASK] [--env ENVIRONMENT]
Tasks:
    build     Clean files, compile TypeScript and Sass and copy assets
    watch     Watch and recompile TypeScript and Sass
    ts        Compile TypeScript
    sass      Compile Sass
    assets    Copy assets
    clean     Clean files
  `);
});

gulp.task('default', ['build']);
