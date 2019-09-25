const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
{ path, task } = require('./vars').vars;

const html = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe($.ejsLocals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe($.if(argv.build, $.htmlmin({ collapseWhitespace: true })))
	.pipe(gulp.dest(path.app.html));
}

const validator = () => {
	if(argv.notvalid || argv.build) return;
	return gulp.src(path.validation, { allowEmpty: true })
	.pipe($.htmlValidator({format: 'html'}).on('error', $.notify.onError("Connection-Error: <%= error.message %>")))
	.pipe($.rename({
		basename: "w3c"
	}))
	.pipe(gulp.dest(path.app.html));
}

module.exports = gulp.series(html, validator);