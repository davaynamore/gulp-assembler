const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
{ path, task } = require('./vars').vars;

const img = () => {
	return gulp.src(path.src.img, { allowEmpty: true })
	.pipe($.if(argv.build, $.imagemin()))
	.pipe(gulp.dest(path.app.img));
}

module.exports = img;