const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path } = require('./vars').vars;

const dev = () => {
	return gulp.src(path.src.img, { allowEmpty: true })
	.pipe(gulp.dest(path.app.img));
}

const build = () => {
	return gulp.src(path.src.img, { allowEmpty: true })
	.pipe($.imagemin())
	.pipe(gulp.dest(path.app.img));
}

const img = {
	dev: dev,
	build: build
}

module.exports = img;