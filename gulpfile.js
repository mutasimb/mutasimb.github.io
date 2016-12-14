var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    webserver = require('gulp-webserver');


// CSS processor section

gulp.task('sass', function() {
  return gulp.src('assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('gcmq', ['sass'], function() {
  gulp.src('assets/css/style.css')
    .pipe(gcmq())
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('csswatch', function() {
  gulp.watch('assets/scss/*.scss', ['gcmq']);
});


// Webserver section for localhost

gulp.task('js', function() {
  gulp.src('assets/js/script.js');
});

gulp.task('html', function() {
  gulp.src('index.html');
});

gulp.task('css', function() {
  gulp.src('assets/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('assets/js/script.js', ['js']);
  gulp.watch('assets/css/style.css', ['css']);
  gulp.watch('index.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('serve', ['watch', 'html', 'js', 'css', 'webserver']);


// Both the tasks combined

gulp.task('default', ['csswatch', 'serve']);
