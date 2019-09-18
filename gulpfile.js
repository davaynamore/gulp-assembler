'use strict';

const { task } = require('./assembler/modules/vars').vars,
gulp = require('gulp'),
html = require('./assembler/modules/html'),
scss = require('./assembler/modules/scss'),
js = require('./assembler/modules/scripts'),
img = require('./assembler/modules/img'),
assets = require('./assembler/modules/assets'),
serv = require('./assembler/modules/serv'),
info = require('./assembler/modules/info');

gulp.task(task.dev.css, scss.dev);
gulp.task(task.build.css, scss.build);
gulp.task(task.dev.html, html.dev);
gulp.task(task.build.html, html.build);
gulp.task(task.validator, html.validator);
gulp.task(task.dev.js, js.dev);
gulp.task(task.build.js, js.build);
gulp.task(task.dev.img, img.dev);
gulp.task(task.build.img, img.build);
gulp.task(task.build.libs, assets.libs);
gulp.task(task.build.fav, assets.fav);
gulp.task(task.build.fonts, assets.fonts);
gulp.task(task.watch, serv.watch);
gulp.task(task.connect, serv.connect);
gulp.task(task.clean, serv.clean);
gulp.task(task.check, serv.check);
gulp.task(task.help, help);

gulp.task(
	task.development,
	gulp.parallel(
		task.watch,
		task.dev.html,
		task.validator,
		task.dev.css,
		task.dev.js,
		task.dev.img,
		task.build.libs,
		task.build.fav,
		task.build.fonts,
		task.connect
		));

gulp.task(
	task.production,
	gulp.parallel(
		task.build.html,
		task.build.css,
		task.build.js,
		task.build.img,
		task.build.libs,
		task.build.fav,
		task.build.fonts
		));

gulp.task(task.startProd, gulp.series(task.check, task.clean, task.production));
gulp.task(task.startDev, gulp.series(task.check, task.clean, task.development));
gulp.task(task.default, gulp.parallel(task.startDev));