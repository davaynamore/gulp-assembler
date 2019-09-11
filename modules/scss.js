const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path } = require('./vars').vars;

const dev = () => {
	return setTimeout(() => {
		return gulp.src(path.src.scss, { allowEmpty: true })
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.notify.onError("SASS-Error: <%= error.message %>")))
		.pipe($.autoprefixer({
			cascade: false
		}))
		.pipe($.csscomb())
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(path.app.css));
	}, 500);
}

const build = () => {
	return gulp.src(path.src.scss, { allowEmpty: true })
	.pipe($.sass().on('error', $.notify.onError("SASS-Error: <%= error.message %>")))
	.pipe($.autoprefixer({
		cascade: false
	}))
	.pipe($.csscomb())
	.pipe($.cssnano())
	.pipe(gulp.dest(path.app.css));
}

const scss = {
	dev,
	build
}

module.exports = scss;