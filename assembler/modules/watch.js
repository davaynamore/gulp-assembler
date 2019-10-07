const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path, task } = require('./vars').vars;

const watch = () => {
	$.watch(path.watch.scss, gulp.series(task.css)),
	$.watch(path.watch.html, gulp.series(task.html)),
	$.watch(path.watch.js, gulp.series(task.js)),
	$.watch(path.watch.img, gulp.series(task.img)),
	$.watch(path.watch.icons, gulp.series(task.sprites)),
	$.watch(path.watch.assets, gulp.series(task.assets))
}

module.exports = watch;