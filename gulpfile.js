var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten'),
    del = require('del'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon');

// -----------------
// Development Enviroment
// -----------------

// Compile Sass into CSS
gulp.task('sass', function () {
    return gulp.src('build/scss/**/*.scss') // Gets all files ending with .scss in build/scss
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR")) //adds vendor prefixes if needed
        .pipe(gulp.dest('build/css')) // outputs CSS to build/css
        .pipe(reload({
            stream: true
        }));
});

// checks for errors in JS files
gulp.task('scripts', function () {
    return gulp.src('build/js/**.*.js')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('build/js'))
        .pipe(reload({
            stream: true
        }));
});

// Watches for file changes and reloads express server
gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        } // to avoid nodemon being started multiple times
    });
});

// Starts browserSync server
gulp.task('browserSync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["build/**/*.*"],
        ui: false,
        port: 4000,
    });
});

// Watches for file changes and reloads browsers
gulp.task('serve', ['sass', 'scripts', 'browserSync'], function () {
    gulp.watch('build/scss/**/*.scss', ['sass']);
    gulp.watch('build/js/**/*.js', ['scripts']);
    gulp.watch('build/**/*.html', reload);
});

// -----------------
// Production Enviroment
// -----------------

//Cleans out the dist folder
gulp.task('dist-clean', function () {
    return del('dist/**/*');
});

// Compiles Sass into CSS then outputs it to the dist folder
gulp.task('build-sass', function () {
    return gulp.src('build/scss/**/*.scss') // Gets all files ending with .scss in build/scss
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR")) //adds vendor prefixes if needed
        .pipe(gulp.dest('dist/css')); //outputs it to the dist folder
});

// copies from bower components in build folder and compiles it to the dist folder
gulp.task('build-bower', function () {
    gulp.src(['build/bower_components/**/angular-*.min.js','!build/bower_components/angular-material/modules/**/*.min.js'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/js/angular'));
});

// Copies fonts to the dist folder
gulp.task('copy-fonts', function () {
    return gulp.src('build/fonts/**/*', {
            base: 'build'
        })
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist'));
});

// checks for errors in JS files then compiles it to the dist folder
gulp.task('build-scripts', function () {
    return gulp.src('build/js/**/*', {
            base: 'build'
        })
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist'));
});

// Copies html to the dist folder
gulp.task('build-html', function () {
    return gulp.src('build/index.html')
        .pipe(gulp.dest('dist/'));
});

// Builds Production App in dist folder
gulp.task('build', function (cb) {
    runSequence('dist-clean', ['build-sass', 'build-scripts'],
        'copy-fonts', 'build-html',
        cb);
});
