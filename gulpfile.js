var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    runSequence  = require('run-sequence'),
    imagemin     = require('gulp-imagemin'),
    cssnano      = require('gulp-cssnano'),
    cache        = require('gulp-cache'),
    uglify       = require('gulp-uglify');

// -----------------
// Development Tasks 
// -----------------

// Starts browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    port: 4000,
  });
});

// Compile Sass into CSS 
gulp.task('sass', function(){
  return gulp.src('build/scss/**/*.scss')           // Gets all files ending with .scss in build/scss
    .pipe(plumber())
    .pipe(sass())                                   // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer({
      browsers: ['last 2 versions'], cascade: false 
    }))                                             //adds vendor prefixes if needed
    .pipe(gulp.dest('build/css'))                   // outputs CSS to build/css
    .pipe(browserSync.reload({
      stream: true
    }));  
});

// Watches for file changes and reloads browsers
gulp.task('watch',['browserSync', 'sass'], function() {
  gulp.watch('build/scss/**/*.scss', ['sass']);       
  gulp.watch('build/*.html', browserSync.reload);
  gulp.watch('build/js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  );
});

// -----------------
// Build Tasks 
// -----------------


//copy index.html to dist 
gulp.task('html', function() {
  return gulp.src('app/index.html')
  .pipe(gulp.dest('dist'));
});

//copy templates to dist 
gulp.task('templates', function() {
  return gulp.src('app/templates/**/*.html')
  .pipe(gulp.dest('dist/templates'));
});

// compresses JavaScript files 
gulp.task('scripts', function(){
  return gulp.src('build/js/**.*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

// compresses css files 
gulp.task('styles', function(){
  return gulp.src('build/css/**.*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'));
});

// compresses images 
gulp.task('images', function(){
  return gulp.src('build/images/*')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'));
});

//copy fonts to dist 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

//builds the distribution version
gulp.task('build', function (callback) {
  runSequence(['sass','scripts','images','styles','fonts','html','templates'],
    callback
  );
});