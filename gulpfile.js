'use strict';

const prefix = '-path-';
let targetPath = process.argv.filter(el => el.indexOf(prefix) !== -1)[0];

if(!targetPath) {
	return console.error('Set the target directory!');
} else {
	targetPath = targetPath.split('').slice(prefix.length).join("");
	console.log(targetPath);
}

const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
browserSync = require('browser-sync').create(),
htmlv = require('gulp-html-validator');

const task = {
	dev: {
		html: 'html:dev',
		css: 'css:dev',
		js: 'js:dev',
		img: 'img:dev'
	},
	build: {
		libs: 'libs',
		fonts: 'fonts',
		html: 'html:build',
		css: 'css:build',
		js: 'js:build',
		img: 'img:build'
	},
	watch: 'watch',
	connect: 'connect',
	clean: 'clean',
	development: 'dev',
	default: 'default',
	validator: 'valid'
}

const path = {
	src: {
		html: `${targetPath}/src/index.html`,
		js: `${targetPath}/src/js/script.js`,
		scss: `${targetPath}/src/scss/**/[^_]*.+(scss|sass)`,
		img: `${targetPath}/src/img/**/*.*`,
		fonts: `${targetPath}/src/fonts/**/*.*`,
		libs: `${targetPath}/src/libs/**/*.*`,
	},
	app: {
		html: `${targetPath}/app/`,
		js: `${targetPath}/app/js/`,
		css: `${targetPath}/app/css/`,
		img: `${targetPath}/app/img/`,
		fonts: `${targetPath}/app/fonts/`,
		libs: `${targetPath}/app/libs/`,
	},
	watch: {
		html: `${targetPath}/src/*.html`,
		js: `${targetPath}/src/js/*.js`,
		scss: `${targetPath}/src/scss/*.+(scss|sass)`,
		img: `${targetPath}/src/img/**/*.*`,
		fonts: `${targetPath}/src/fonts/**/*.*`,
		libs: `${targetPath}/src/libs/**/*.*`,
	},
	serverRoot: `${targetPath}/app`
}

gulp.task(task.dev.css, () => {
	return setTimeout(() => {
		return gulp.src(path.src.scss, { sourcemaps: true, allowEmpty: true })
		.pipe($.sass().on('error', $.notify.onError("SASS-Error: <%= error.message %>")))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe($.csscomb())
		.pipe(gulp.dest(path.app.css), { sourcemaps: true })
		.pipe(browserSync.stream());
	}, 500);
});

gulp.task(task.dev.html, () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(gulp.dest(path.app.html))
	.pipe(browserSync.stream());
});

gulp.task(task.validator, () => {
	return gulp.src(path.src.html, { allowEmpty: true })
	.pipe(htmlv({format: 'html'}).on('error', $.notify.onError("Connection-Error: <%= error.message %>")))
	.pipe($.rename({
		basename: "w3c"
	}))
	.pipe(gulp.dest(path.app.html));
});

gulp.task(task.dev.js, () => {
	return gulp.src(path.src.js, { allowEmpty: true })
	.pipe(gulp.dest(path.app.js))
	.pipe(browserSync.stream());
});

gulp.task(task.dev.img, () => {
	return gulp.src(path.src.img, { allowEmpty: true })
	.pipe(gulp.dest(path.app.img))
	.pipe(browserSync.stream());
});

gulp.task(task.build.libs, () => {
	return gulp.src(path.src.libs, { allowEmpty: true })
	.pipe(gulp.dest(path.app.libs))
	.pipe(browserSync.stream());
});

gulp.task(task.build.fonts, () => {
	return gulp.src(path.src.fonts, { allowEmpty: true })
	.pipe(gulp.dest(path.app.fonts))
	.pipe(browserSync.stream());
});

gulp.task(task.watch, () => {
	$.watch(path.watch.scss, gulp.series(task.dev.css)),
	$.watch(path.watch.html, gulp.parallel(task.dev.html, task.validator)),
	$.watch(path.watch.js, gulp.series(task.dev.js)),
	$.watch(path.watch.img, gulp.series(task.dev.img)),
	$.watch(path.watch.fonts, gulp.series(task.build.fonts)),
	$.watch(path.watch.libs, gulp.series(task.build.libs))
});

gulp.task(task.connect, () => {
	browserSync.init({
		server: {
			baseDir: path.serverRoot,
			open: true
		}
	});
});

gulp.task(task.clean, () => {
	return gulp.src(path.serverRoot, { allowEmpty: true })
	.pipe($.clean({
		force: true,
		read: false
	}));
});

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
		task.build.fonts,
		task.connect
		));

gulp.task(task.default, gulp.series(task.clean, gulp.parallel(task.development)));