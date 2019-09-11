const prefix = '---';
let param = process.argv.filter(el => el.indexOf(prefix) !== -1)[0];
const paramError = () => {
	console.error(
		`
		\n#################################################################################
		\nSet the target directory!
		\nYou should type:
		\ngulp ${prefix}yourProjectDirectoryName
		\n#################################################################################
		`
		);
	return process.exit();
}

const targetPath = !param ? paramError() : param.split('').slice(prefix.length).join("");

const vars = {
	task: {
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
			img: 'img:build',
			fav: 'fav:build'
		},
		watch: 'watch',
		connect: 'connect',
		clean: 'clean',
		development: 'dev',
		production: 'production',
		default: 'default',
		validator: 'valid',
		check: 'check',
		startDev: 'startDev',
		startBuild: 'build'
	},
	path: {
		src: {
			html: `${targetPath}/src/*.+(ejs|html)`,
			js: `${targetPath}/src/js/app.js`,
			scss: `${targetPath}/src/scss/**/[^_]*.+(scss|sass)`,
			img: [`${targetPath}/src/img/**/*.*`, `!${targetPath}/src/img/**/*.ini`],
			fonts: [`${targetPath}/src/fonts/**/*.*`,`!${targetPath}/src/fonts/**/*.ini`],
			libs: [`${targetPath}/src/libs/**/*.*`,`!${targetPath}/src/libs/**/*.ini`],
			fav: [`${targetPath}/src/fav/**/*.*`,`!${targetPath}/src/fav/**/*.ini`]
		},
		app: {
			html: `${targetPath}/app/`,
			js: `${targetPath}/app/js/`,
			css: `${targetPath}/app/css/`,
			img: `${targetPath}/app/img/`,
			fonts: `${targetPath}/app/fonts/`,
			libs: `${targetPath}/app/libs/`,
			fav: `${targetPath}/app/fav/`
		},
		watch: {
			html: [`${targetPath}/src/*.html`, `${targetPath}/src/*.ejs`, `${targetPath}/src/view/**/*.*`],
			js: `${targetPath}/src/js/**/*.+(js|ts)`,
			scss: `${targetPath}/src/scss/**/*.+(scss|sass)`,
			img: `${targetPath}/src/img/**/*.*`,
			fonts: `${targetPath}/src/fonts/**/*.*`,
			libs: `${targetPath}/src/libs/**/*.*`,
			fav: `${targetPath}/src/fav/**/*.*`
		},
		serverRoot: `${targetPath}/app`,
		template: 'template/**/*.*',
		validation: `${targetPath}/app/index.html`,
	}
}


module.exports = {
	vars,
	targetPath
};