var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('browser', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('preCss', function () {
    return gulp.src('./public/honor/css/main.css')
        .pipe(autoprefixer({
            cascade: true
        }))
        .pipe(gulp.dest('./public/honor/css/pre.css'));
});