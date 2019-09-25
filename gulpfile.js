'use strict';

const { task } = require('./assembler/modules/vars').vars,
gulp = require('gulp'),
argv = require('yargs').argv,
html = require('./assembler/modules/html'),
scss = require('./assembler/modules/scss'),
js = require('./assembler/modules/scripts'),
img = require('./assembler/modules/img'),
assets = require('./assembler/modules/assets'),
server = require('./assembler/modules/server'),
watch = require('./assembler/modules/watch'),
prestart = require('./assembler/modules/prestart'),
info = require('./assembler/modules/info');

gulp.task(task.css, scss);
gulp.task(task.html, html.dev);
gulp.task(task.validator, html.validator);
gulp.task(task.js, js);
gulp.task(task.img, img);
gulp.task(task.assets, assets);
gulp.task(task.watch, watch);
gulp.task(task.server, server);
gulp.task(task.clean, prestart.clean);
gulp.task(task.workWithTarget, prestart.workWithTarget);
gulp.task(task.setJsType, prestart.setJsType);
gulp.task(task.setJsPath, prestart.setJsPath);
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
		gulp.series(
			task.html,
			task.validator,
		),
		task.css,
		task.img,
		task.assets,
		task.js,
		task.server,
		task.watch
		));

gulp.task(task.default, gulp.series(task.prestart, task.clean, task.start));