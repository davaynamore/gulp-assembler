const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path, task } = require('./vars').vars;

const libs = () => {
	return gulp.src(path.src.libs, { since: gulp.lastRun(task.libs), allowEmpty: true })
	.pipe(gulp.dest(path.app.libs));
}

const fav = () => {
	return gulp.src(path.src.fav, { since: gulp.lastRun(task.fav), allowEmpty: true })
	.pipe(gulp.dest(path.app.fav));
}

const fonts = () => {
	return gulp.src(path.src.fonts, { since: gulp.lastRun(task.fonts), allowEmpty: true })
	.pipe(gulp.dest(path.app.fonts))
}

const assets = {
	libs,
	fonts,
	fav
}

module.exports = assets;