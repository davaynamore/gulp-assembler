const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path, task } = require('./vars').vars;

const assets = () => {
	return gulp.src(path.src.assets, { since: gulp.lastRun(task.assets), allowEmpty: true })
	.pipe(gulp.dest(path.app.assets));
}

module.exports = assets;