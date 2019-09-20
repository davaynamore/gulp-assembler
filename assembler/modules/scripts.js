const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
babelify = require("babelify"),
browserify = require('browserify'),
tsify = require('tsify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
fs = require('fs'),
{ path } = require('./vars').vars;

const js = () => {
	return browserify({
		entries: [path.src.js]
	})
	.transform('babelify',
	{
		presets: ["@babel/preset-env"],
		sourceMaps: true,
		global: true
	}
	)
	.plugin(tsify)
	.bundle()
	// .pipe($.if(argv.build, buffer()))  // doesn't work in build mode
	// .pipe($.if(argv.build, $.uglify().on('error', $.notify.onError("JS-Error: <%= error.message %>"))))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(path.app.js));
}

module.exports = js;