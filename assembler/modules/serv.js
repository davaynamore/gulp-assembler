const gulp = require('gulp'),
argv = require('yargs').argv,
$ = require('gulp-load-plugins')(),
fs = require('fs'),
browserSync = require('browser-sync').create(),
{ targetPath } = require('./vars'),
{ path, task, ejs } = require('./vars').vars;

const reloadDelay = () => setTimeout(browserSync.reload, 500);

const watch = () => {
	$.watch(path.watch.scss, gulp.series(task.dev.css)).on('change', reloadDelay),
	$.watch(path.watch.html, gulp.series(task.dev.html, task.validator)).on('change', reloadDelay),
	$.watch(path.watch.js, gulp.series(task.dev.js)).on('change', reloadDelay),
	$.watch(path.watch.img, gulp.series(task.dev.img)).on('change', reloadDelay),
	$.watch(path.watch.fonts, gulp.series(task.build.fonts)).on('change', reloadDelay),
	$.watch(path.watch.libs, gulp.series(task.build.libs)).on('change', reloadDelay),
	$.watch(path.watch.fav, gulp.series(task.build.fav)).on('change', reloadDelay)
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
	const srcPath = argv.ejs ? path.template.ejs : path.template.simple;
	return new Promise(function(resolve) {
		if(!fs.existsSync(targetPath)) {
			gulp.src(srcPath, { allowEmpty: true })
			.pipe(gulp.dest(`${targetPath}/`));
		}
		setTimeout(resolve, 2000);
	});
}

const serv = {
	watch,
	connect,
	clean,
	check
}

module.exports = serv;