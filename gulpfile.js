/**
 * toylibrarybrightonandhove.org - Gulp Config
 * ============================================================ */
(function () {
    "use strict";

    var gulp = require('gulp'),
        fs = require('fs'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        expect = require('gulp-expect-file'),
        less = require('gulp-less'),
        postcss = require('gulp-postcss'),
        run = require('gulp-run'),
        autoprefixer = require('autoprefixer'),
        awspublish = require('gulp-awspublish'),
        cloudfront = require('gulp-cloudfront-invalidate-aws-publish'),
        cleancss = require('gulp-clean-css');

    gulp.task('build-js', function () {
        var files = ['src/js/*.js'];
        gulp.src(files)
            .pipe(expect(files))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('static/js'));
    });

    gulp.task('build-less', function () {
        gulp.src('src/less/index.less')
            .pipe(less())
            .pipe(sourcemaps.init())
            .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
            .pipe(cleancss())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('static/css'));
    });

    gulp.task('build-hugo', function(cb) {
        run('hugo').exec(cb);
    });

    gulp.task('watch-js', ['build-js'], function () {
        gulp.watch('src/js/*.js', ['build-js']);
    });

    gulp.task('watch-less', ['build-less'], function () {
        gulp.watch('src/less/**/*.less', ['build-less']);
    });

    gulp.task('publish', ['build'], function () {

        var aws = require('./aws.json'),
            publisher = awspublish.create(aws.s3);

        var headers = {
            'Cache-Control': 'max-age=315360000, no-transform, public'
        };

        return gulp.src('./public/**')
            .pipe(awspublish.gzip())
            .pipe(publisher.publish(headers))
            .pipe(cloudfront(aws.cf))
            .pipe(publisher.cache())
            .pipe(publisher.sync())
            .pipe(awspublish.reporter());
    });

    gulp.task('watch', ['watch-less', 'watch-js']);

    gulp.task('build', ['build-less', 'build-js', 'build-hugo']);

    gulp.task('default', ['build']);

})();