'use strict';

const { task } = require('./assembler/modules/vars').vars,
gulp = require('gulp'),
argv = require('yargs').argv,
html = require('./assembler/modules/html'),
scss = require('./assembler/modules/scss'),
js = require('./assembler/modules/scripts'),
img = require('./assembler/modules/img'),
assets = require('./assembler/modules/assets'),
serv = require('./assembler/modules/serv'),
info = require('./assembler/modules/info');

gulp.task(task.css, scss);
gulp.task(task.html, html.dev);
gulp.task(task.validator, html.validator);
gulp.task(task.js, js);
gulp.task(task.img, img);
gulp.task(task.libs, assets.libs);
gulp.task(task.fav, assets.fav);
gulp.task(task.fonts, assets.fonts);
gulp.task(task.watch, serv.watch);
gulp.task(task.connect, serv.connect);
gulp.task(task.clean, serv.clean);
gulp.task(task.workWithTarget, serv.workWithTarget);
gulp.task(task.setJsType, serv.setJsType);
gulp.task(task.setJsPath, serv.setJsPath);
gulp.task(task.info, info.help);

gulp.task(task.prestart,
	gulp.series(
		task.workWithTarget,
		task.setJsType,
		task.setJsPath
		));

gulp.task(
	task.start,
	gulp.parallel(
		task.html,
		task.css,
		task.img,
		task.libs,
		task.fav,
		task.fonts,
		task.js,
		task.connect,
		task.validator,
		task.watch
		));



gulp.task(task.default, gulp.series(task.prestart, task.clean, task.start));