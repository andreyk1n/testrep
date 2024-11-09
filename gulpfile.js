const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  html: {
    src: 'src/pages/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  }
};

// HTML Task
function html() {
  return gulp.src(paths.html.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: 'src/partials/'
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Styles Task
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Watch Task
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.html.src, html);
  gulp.watch('src/partials/*.html', html);
  gulp.watch(paths.styles.src, styles);
}

// Default Task
exports.default = gulp.series(gulp.parallel(html, styles), watch);
