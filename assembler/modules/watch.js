const gulp = require('gulp'),
{ path, task } = require('./vars').vars;

const watch = () => {
	gulp.watch(path.watch.scss, gulp.series(task.css)),
	gulp.watch(path.watch.html, gulp.series(task.html)),
	gulp.watch(path.watch.js, gulp.series(task.js)),
	gulp.watch(path.watch.img, gulp.series(task.img)),
	gulp.watch(path.watch.assets, gulp.series(task.assets))
}

module.exports = watch;