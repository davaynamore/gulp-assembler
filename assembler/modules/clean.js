const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path } = require('./vars').vars;

const clean = () => {
	return gulp.src(path.serverRoot, { allowEmpty: true })
	.pipe($.clean({
		force: true,
		read: false
	}));
}

module.exports = clean;