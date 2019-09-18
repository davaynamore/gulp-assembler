const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path } = require('./vars').vars;

const libs = () => {
	return gulp.src(path.src.libs, { allowEmpty: true })
	.pipe(gulp.dest(path.app.libs));
}

const fav = () => {
	return gulp.src(path.src.fav, { allowEmpty: true })
	.pipe(gulp.dest(path.app.fav));
}

const fonts = () => {
	return gulp.src(path.src.fonts, { allowEmpty: true })
	.pipe(gulp.dest(path.app.fonts))
}

const assets = {
	libs,
	fonts,
	fav
}

module.exports = assets;