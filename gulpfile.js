/**
 * ecpuk -
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

    gulp.task('build-js', gulp.series(function (done) {
        var files = ['src/js/*.js'];
        gulp.src(files)
            .pipe(expect(files))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('static/js'));

        done();
    }));

    gulp.task('build-less', gulp.series(function (done) {
        gulp.src('src/less/index.less')
            .pipe(less())
            .pipe(sourcemaps.init())
            .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
            .pipe(cleancss())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('static/css'));

        done();
    }));

    gulp.task('build-hugo', function(cb) {
        run('hugo').exec(cb);
    });

    gulp.task('watch-js', gulp.series('build-js', function (done) {
        gulp.watch('src/js/*.js', gulp.series('build-js'));

        done();
    }));

    gulp.task('watch-less', gulp.series('build-less', function (done) {
        gulp.watch('src/less/**/*.less', gulp.series('build-less'));

        done();
    }));

    gulp.task('watch', gulp.parallel('watch-less', 'watch-js'));

    gulp.task('build', gulp.series(gulp.parallel('build-less', 'build-js'), 'build-hugo', function(done) {
        done();
    }));

    gulp.task('publish', gulp.series('build', function (done) {

        var aws = require('./aws.json'),
            publisher = awspublish.create(aws.s3);

        var headers = {
            'Cache-Control': 'max-age=315360000, no-transform, public'
        };

        gulp.src('./public/**')
            .pipe(awspublish.gzip())
            .pipe(publisher.publish(headers))
            .pipe(cloudfront(aws.cf))
            .pipe(publisher.cache())
            .pipe(publisher.sync())
            .pipe(awspublish.reporter());

        done();
    }));

    gulp.task('default', gulp.series('build'));

})();