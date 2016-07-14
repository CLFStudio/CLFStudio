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
    return gulp.src('./public/drag/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true
        }))
        .pipe(gulp.dest('./public/drag/css/'));
});
