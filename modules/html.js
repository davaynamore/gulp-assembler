const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
locals = require('gulp-ejs-locals'),
htmlv = require('gulp-html-validator'),
{ path } = require('./vars').vars;

const dev = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(locals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe(gulp.dest(path.app.html));
}

const build = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(locals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe($.htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest(path.app.html));
}

const validator = () => {
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
	dev: dev,
	build: build,
	validator: validator
}

module.exports = html;