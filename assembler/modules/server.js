const gulp = require('gulp'),
browserSync = require('browser-sync').create(),
argv = require('yargs').argv,
{ path, port } = require('./vars').vars;

const connect = () => {
	browserSync.init({
		server: {
			baseDir: path.serverRoot,
			open: true
		},
		tunnel: false,
		port
	});

	browserSync.watch(path.serverRoot).on('change', () => setTimeout(browserSync.reload, 500));
}

module.exports = connect;