const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
fs = require('fs'),
browserSync = require('browser-sync').create(),
{ targetPath } = require('./vars'),
{ path, task } = require('./vars').vars;

const watch = () => {
	$.watch(path.watch.scss, gulp.series(task.dev.css)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.html, gulp.series(task.dev.html, task.validator)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.js, gulp.series(task.dev.js)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.img, gulp.series(task.dev.img)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.fonts, gulp.series(task.build.fonts)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.libs, gulp.series(task.build.libs)).on('change', () => setTimeout(browserSync.reload, 500)),
	$.watch(path.watch.fav, gulp.series(task.build.fav)).on('change', () => setTimeout(browserSync.reload, 500))
}

const connect = () => {
	browserSync.init({
		server: {
			baseDir: path.serverRoot,
			open: true
		},
		tunnel: false
	});
}

const clean = () => {
	return gulp.src(path.serverRoot, { allowEmpty: true })
	.pipe($.clean({
		force: true,
		read: false
	}));
}

const check = () => {
	return new Promise(function(resolve) {
		if(!fs.existsSync(targetPath)) {
			gulp.src(path.template, { allowEmpty: true })
			.pipe(gulp.dest(`${targetPath}/`));
		}
		setTimeout(resolve, 2000);
	});
}

const serv = {
	watch: watch,
	connect: connect,
	clean: clean,
	check: check
}

module.exports = serv;