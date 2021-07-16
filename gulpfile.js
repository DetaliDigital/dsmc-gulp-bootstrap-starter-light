'use strict';

const gulp = require('gulp');

let changed = require('gulp-changed'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    npmDist = require('gulp-npm-dist'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    bs = require('browser-sync').create(),
    path = require('path'),
    chalk = require('chalk'),
    notify = require('gulp-notify');

const srcLayoutFiles = 'src/*.html'
const srcSassFiles = 'scss/theme.bs.slim.default.scss'

const distAppDir = 'dist/'
const distStyleDir = 'dist/css/'
const distVendorDir = 'dist/vendor/'
const moduleBootstrapSass = 'node_modules/bootstrap/scss/**'
const srcSassBootstrap = 'scss/bootstrap/'

const copy = ['js/**', 'img/**', 'fonts/**', 'css/custom.css', 'icons/**', 'docs/**']

const config = {
    autoprefixer: {
        cascade: false
    },
    sass: {
        outputStyle: 'expanded',
        includePaths: ['src/scss']
    }
}

// Clear folder dist after completed task

gulp.task('clean', function () {
    return del([
        distAppDir + '**/*'
    ]);
});

// Copy folder src >> dist

gulp.task('copy', function () {
    return getFoldersSrc('src', copy)
        .pipe(changed(distAppDir))
        .pipe(gulp.dest(distAppDir));

});

// Copy layout HTML

gulp.task('html', function () {
    return gulp.src(srcLayoutFiles)
        // only pass changed files
        .pipe(changed(distAppDir))
        .pipe(gulp.dest(distAppDir))
});

// Copy folder node_modules > bootstrap >> src/scss/bootstrap

gulp.task('bootstrap', function () {
    return gulp.src(moduleBootstrapSass)
        .pipe(gulp.dest(srcSassBootstrap))
});

// Dev SASS Task - no sourcemaps, no autoprefixing, no minification
gulp.task('sass-dev', function () {

    return gulp.src(srcSassFiles)
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(distStyleDir));
});

// Build SASS Task - sourcemaps, minification

gulp.task('sass-build', function () {
    return gulp.src(srcSassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(distStyleDir))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distStyleDir));
});

// Build Gulp Task
// 1. Clean dist folder
// 2. Process HTML, vendor dir, SCSS w/ source maps and minification and copy static assets
gulp.task('build',
    gulp.series(
        'clean',
        gulp.parallel('html', 'sass-build', 'copy')
));

// Helper functions

function reload(done) {
    bs.reload();
    done();
}

function serve(done) {
    bs.init({
        server: {
            baseDir: distAppDir
        },
        files: [
            distStyleDir + '*.css'
        ]
    });
    done();
}

function getFoldersSrc(base, folders) {
    return gulp.src(folders.map(function (item) {
        return path.join(base, item);
    }), {
        base: base,
        allowEmpty: true
    });
}
