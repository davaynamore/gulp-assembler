const gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
{ path } = require('./vars').vars;


const svgSprite = () => {

  const options = {
    shape: {
      // dimension: {
      //   maxWidth: 100,
      //   maxHeight: 100
      // },
      spacing: {
        padding: 10
      }
    },
    mode: {
      css: {
        dest: '.',
        bust: false,
        sprite: '../img/sprite.svg',
        dimensions: true,
        render: {
          scss: {
            dest: '_sprite.scss'
          }
        }
      }
    }
  }

  return gulp.src(path.src.icons.svg)
  .pipe($.svgSprite(options))
  .pipe($.imagemin([
    $.imagemin.svgo({
      plugins: [
      {
        removeViewBox: true
      }
      ]
    })
    ]))
  .pipe(gulp.dest((f) => {
    return f.path.indexOf('.scss') !== -1 ? `${path.src.base}scss` :
    f.path.indexOf('.svg') !== -1 ? path.app.img : null;
  }));
};

module.exports = svgSprite;