const gulp = require('gulp'),
argv = require('yargs').argv,
$ = require('gulp-load-plugins')(),
fs = require('fs'),
browserSync = require('browser-sync').create(),
{ targetPath } = require('./vars'),
{ path, task, ejs } = require('./vars').vars;

const reloadDelay = () => setTimeout(browserSync.reload, 500);

const watch = () => {
	$.watch(path.watch.scss, gulp.series(task.css)),
	$.watch(path.watch.html, gulp.series(task.html, task.validator)),
	$.watch(path.watch.js, gulp.series(task.js)),
	$.watch(path.watch.img, gulp.series(task.img)),
	$.watch(path.watch.fonts, gulp.series(task.fonts)),
	$.watch(path.watch.libs, gulp.series(task.libs)),
	$.watch(path.watch.fav, gulp.series(task.fav))
}

const connect = () => {
	browserSync.init({
		server: {
			baseDir: path.serverRoot,
			open: true
		},
		tunnel: false
	});

	browserSync.watch(path.serverRoot).on('change', reloadDelay);
}

const clean = () => {
	return gulp.src(path.serverRoot, { allowEmpty: true })
	.pipe($.clean({
		force: true,
		read: false
	}));
}

const setJsType = (done) => {
	if(argv.ts) {
		fs.rename(path.template.js, path.template.ts, function (err) {
			if (err) throw err;
		});
	}
	done();
}

const workWithTarget = () => {
	const srcPath = argv.ejs ? path.template.ejs : path.template.html;
	return new Promise(function(resolve) {
		if(!fs.existsSync(targetPath)) {
			gulp.src(srcPath, { allowEmpty: true })
			.pipe(gulp.dest(`${targetPath}/`));
		}
		setTimeout(resolve, 2000);
	});
}

const setJsPath = (done) => {
	fs.readdir(path.src.js, function(err, items) {
		path.src.js += items[0];
	});
	done();
}

const serv = {
	watch,
	connect,
	clean,
	workWithTarget,
	setJsType,
	setJsPath
}

module.exports = serv;