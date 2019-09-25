const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
browserify = require('browserify'),
babelify = require('babelify'),
tsify = require('tsify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
{ path } = require('./vars').vars;

const js = () => {
    return browserify(path.src.js, {debug: true})
    .transform(babelify, {
        presets: ["@babel/preset-env"],
        sourceMaps: true
    })
    .plugin(tsify)
    .bundle()
    .on('error', $.notify.onError("JS-Error: <%= error.message %>"))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.if(!argv.build, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(argv.build, $.uglify()))
    .pipe($.if(!argv.build, $.sourcemaps.write()))
    .pipe(gulp.dest(path.app.js));
}

module.exports = js;