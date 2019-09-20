const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
locals = require('gulp-ejs-locals'),
htmlv = require('gulp-html-validator'),
{ path, task } = require('./vars').vars;

const dev = () => {
	return gulp.src(path.src.html, { since: gulp.lastRun(task.html), allowEmpty: true })
	.pipe(locals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe($.if(argv.build, $.htmlmin({ collapseWhitespace: true })))
	.pipe(gulp.dest(path.app.html));
}

const validator = () => {
	if(argv.notvalid || argv.build) return;
	return setTimeout(() => {
		return gulp.src(path.validation, { allowEmpty: true })
		.pipe(htmlv({format: 'html'}).on('error', $.notify.onError("Connection-Error: <%= error.message %>")))
		.pipe($.rename({
			basename: "w3c"
		}))
		.pipe(gulp.dest(path.app.html));
	}, 500);
}

const html = {
	dev,
	validator
}

module.exports = html;