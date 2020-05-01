var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var babelify = require('gulp-babel');
var docco = require('gulp-docco');
var zip = require('gulp-zip');


gulp.task('styles', function() {
  gulp.src('source/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', 'ie 9', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(gulp.dest('public/assets/stylesheets'));
});


gulp.task('release:package', function(){
    var today = new Date();
    var filename = `RELEASE-${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    return gulp.src('public/*')
        .pipe(zip(`${filename}.zip`))
        .pipe(gulp.dest(''));
});

gulp.task('browser-sync', function() {
  browserSync.init(['public/assets/stylesheets/styles.css', 'public/assets/javascript/**/*.js', 'public/*.html'], {
    server: {
      baseDir: 'public'
    }
  });
});

gulp.task('js:concat', function(){
    gulp.src('source/javascript/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public/assets/javascript'));
});

gulp.task('js:docs', function(){
    gulp.src('source/javascript/**/*.js')
    .pipe(docco())
    .pipe(gulp.dest('docs'));
});

gulp.task('js:minify', function() {
  gulp.src('public/assets/javascript/scripts.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest('public/assets/javascript'));
});

gulp.task('scripts', ['js:concat', 'js:minify']);

gulp.task('default', ['styles', 'browser-sync', 'js:concat', 'js:minify', 'js:docs'], function () {
  gulp.watch('source/scss/**/*.scss', ['styles']);
  gulp.watch('source/javascript/**/*.js', ['js:concat', 'js:docs']);
  gulp.watch('public/assets/javascript/*.js', ['js:minify']);
});

gulp.task('build', ['styles', 'js:concat', 'js:minify', 'js:docs']);
