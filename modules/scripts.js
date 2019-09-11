const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
babelify = require("babelify"),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer'),
{ path } = require('./vars').vars;

const dev = () => {
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
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(path.app.js));
}

const build = () => {
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
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe($.uglify().on('error', $.notify.onError("JS-Error: <%= error.message %>")))
	.pipe(gulp.dest(path.app.js));
}

const js = {
	dev,
	build
}

module.exports = js;