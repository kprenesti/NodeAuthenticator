var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('sass', ()=>{
  return gulp.src('./public/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('js', ()=>{
  return gulp.src(['./public/app.js','./public/**/*.js', '!./public/js/all.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', ()=>{
  gulp.watch(['./public/**/*.js', '!./public/js/all.js'], ()=>{
    gulp.start('js');
  });
  gulp.watch('./public/**/*.scss', ()=>{
    gulp.start('sass');
  });
})
