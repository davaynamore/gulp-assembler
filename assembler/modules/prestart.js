const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
fs = require('fs'),
{ targetPath } = require('./vars'),
{ path } = require('./vars').vars;



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

const copyJsFiles = () => {
	return new Promise(function(resolve) {
		if(!fs.existsSync(path.src.js)) {
			gulp.src(path.template.js, { allowEmpty: true })
			.pipe(gulp.dest(path.src.js));
		}
		setTimeout(resolve, 2000);
	});
}

const setJsType = (cb) => {
	if(argv.ts) {
		fs.rename(path.jstype.js, path.jstype.ts, function (err) {
			if (err) throw err;
		});
	}
	cb();
}

const setJsPath = (cb) => {

	fs.readdir(path.src.js, (err, items) => {
		if (err) throw err;
		path.src.js += items[0];
	});

	cb();
}

module.exports = gulp.series(workWithTarget, copyJsFiles, setJsType, setJsPath);