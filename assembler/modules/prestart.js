const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
argv = require('yargs').argv,
fs = require('fs'),
{ targetPath } = require('./vars'),
{ path } = require('./vars').vars;

const setJsType = (cb) => {
	if(argv.ts) {
		fs.rename(path.template.js, path.template.ts, function (err) {
			if (err) throw err;
		});
	}
	cb();
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

const setJsPath = (cb) => {
	fs.readdir(path.src.js, (err, items) => {
		path.src.js += items[0];
	});
	cb();
}

module.exports = gulp.series(workWithTarget, setJsType, setJsPath);