const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
locals = require('gulp-ejs-locals'),
htmlv = require('gulp-html-validator'),
{ path, validation, ejs } = require('./vars').vars;

const devSimple = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(gulp.dest(path.app.html));
}

const buildSimple = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe($.htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest(path.app.html));
}

const devEjs = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(locals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe(gulp.dest(path.app.html));
}

const buildEjs = () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(locals().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.ejs().on('error', $.notify.onError("EJS-Error: <%= error.message %>")))
	.pipe($.rename({ extname: '.html' }))
	.pipe($.htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest(path.app.html));
}

const validator = () => {
	if(!validation) return;
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
	dev: ejs ? devEjs : devSimple,
	build: ejs ? buildEjs : buildSimple,
	validator
}

module.exports = html;