// Project configuration
var buildInclude = [
        // include common file types
        '**/*.php',
        '**/*.html',
        '**/*.css',
        '**/*.js',
        '**/*.svg',
        '**/*.ttf',
        '**/*.otf',
        '**/*.eot',
        '**/*.woff',
        '**/*.woff2',
        '**/*.png',
        
        // include specific files and folders
        //'screenshot.png',
        'readme.txt',

        // exclude files and folders
        '!./composer.json', 
        '!./composer.lock',
        '!./gulpfile.js',
        '!./{node_modules,node_modules/**/*}',
        '!./package.json',
        '!./phpcs.ruleset.xml',
        '!./{sass,sass/**/*}',
        '!./.stylelintrc',
        '!./{vendor,vendor/**/*}',
        '!svn/**'
    ];
    
var phpSrc = [
        '**/*.php', // Include all files    
        '!node_modules/**/*', // Exclude node_modules
        '!vendor/**' // Exclude vendor   
    ];

var cssInclude = [
        // include css
        '**/*.css',

        // exclude files and folders
        '!**/*.min.css',
        '!node_modules/**/*',
        '!style.css',
        '!inc/css/*',
        '!vendor/**'
    ];
    
var jsInclude = [
        // include js
        '**/*.js',

        // exclude files and folders
        '!**/*.min.js',
        '!node_modules/**/*',
        '!vendor/**',
        '!**/gulpfile.js',
        '!inc/js/html5shiv.js',
        '!inc/js/respond.js',             
    ];    

// Load plugins
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
    minifycss = require('gulp-uglifycss'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),
    gulpsass = require('gulp-sass'),
    plugins = require('gulp-load-plugins')({
        camelize: true
    }),
    ignore = require('gulp-ignore'), // Helps with ignoring files and directories in our run tasks
    plumber = require('gulp-plumber'), // Helps prevent stream crashing on errors
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'), // JSHint plugin
    stylish = require('jshint-stylish'), // JSHint Stylish plugin
    stylelint = require('gulp-stylelint'), // stylelint plugin
    gulpphpcs = require('gulp-phpcs'), // Gulp plugin for running PHP Code Sniffer.
    gphpcbf = require('gulp-phpcbf'), // PHP Code Beautifier
    gutil = require('gulp-util'), // gulp util
    gzip = require('gulp-zip'), // gulp zip
    eslint = require('gulp-eslint');

/**
 * Styles
 */
 
// compile sass
function sass(done) {
  return (
    gulp.src('./blocks/**/*.scss', { base: "./" })
        .pipe(plumber())
        .pipe(gulpsass({
            errLogToConsole: true,
            outputStyle: 'expanded',
        }))
        .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('.'))
        
  );
  done();
}

/**
 * Scripts
 */

// js linting with eslint.
function lintjs(done) {
    return (
        gulp.src(jsInclude).pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    )
    done();
}

/**
 * PHP
 */

// PHP Code Sniffer.
function phpcs(done) {
  return (
    gulp.src(phpSrc)
        .pipe(gulpphpcs({
            bin: 'vendor/bin/phpcs',
            standard: './phpcs.ruleset.xml',
            warningSeverity: 0
        }))
        .pipe(gulpphpcs.reporter('log'))
  );
  done();
}

// PHP Code Beautifier.
function phpcbf(done) {
  return (
    gulp.src(phpSrc)
        .pipe(gphpcbf({
            bin: 'vendor/bin/phpcbf',
            standard: './phpcs.ruleset.xml',
            warningSeverity: 0
        }))       
        .on('error', gutil.log)
        .pipe(gulp.dest('./'))
  );
  done();
}

/**/

// Watch files
function watchFiles() {
  gulp.watch('./blocks/**/*', sass);
  gulp.watch('./blocks/**/*.js', js);
}

// gulp zip
function zip(done) {
  return (
    gulp.src(buildInclude)
        .pipe(gzip('tru-gutenberg-blocks.zip'))
        .pipe(gulp.dest('./../'))
  );
  done();
}

// define complex tasks
const build = gulp.series(zip); // Package Distributable
const watch = gulp.parallel(watchFiles); // Watch Task

// export tasks
exports.sass = sass;
exports.lintjs = lintjs;
exports.phpcs = phpcs;
exports.phpcbf = phpcbf;
exports.zip = zip;
exports.build = build;
exports.watch = watch;