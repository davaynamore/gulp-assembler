const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
{ path, task } = require('./vars').vars;

const scss = () => {
	return new Promise(function(resolve) {
		gulp.src(path.src.scss, { allowEmpty: true })
		.pipe($.if(!argv.build, $.sourcemaps.init()))
		.pipe($.sass().on('error', $.notify.onError("SASS-Error: <%= error.message %>")))
		.pipe($.autoprefixer({
			cascade: false
		}))
		.pipe($.csscomb())
		.pipe($.if(argv.build, $.cssnano()))
		.pipe($.if(!argv.build, $.sourcemaps.write()))
		.pipe(gulp.dest(path.app.css));
		setTimeout(resolve, 500);
	});
}

module.exports = scss;