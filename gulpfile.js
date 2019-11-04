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
clean = require('./assembler/modules/clean'),
info = require('./assembler/modules/info');

gulp.task(task.css, scss);
gulp.task(task.html, html);
gulp.task(task.js, js);
gulp.task(task.img, img);
gulp.task(task.assets, assets);
gulp.task(task.watch, watch);
gulp.task(task.server, server);
gulp.task(task.clean, clean);
gulp.task(task.prestart, prestart);
gulp.task(task.info, info.help);


gulp.task(
	task.start,
	gulp.parallel(
		task.img,
		task.css,
		task.js,
		task.assets,
		task.html,
		task.server,
		task.watch
		)
	);

gulp.task(task.default, gulp.series(task.prestart, task.clean, task.start));