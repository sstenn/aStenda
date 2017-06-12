var gulp = require('gulp'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify'); 
var react = require('gulp-react'); 
var htmlreplace = require('gulp-html-replace');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');


var path = {

  HTML: 'index.html',
  ALL: ['src/types.js', 'src/scheduleMaker.js', 'src/request.js', 'src/requests.js' ,'src/app.js', 'src/navbar.js', 'src/home.js', 'src/agenda.js', 'src/template.js', 'src/auth.js', 'src/logout.js', 'src/users.js', 'src/failpage.js', 'src/skipaday.js', 'src/popup.js', 'index.html'],
  JS: ['src/types.js', 'src/scheduleMaker.js', 'src/request.js', 'src/requests.js', 'src/app.js', 'src/navbar.js', 'src/home.js', 'src/agenda.js', 'src/template.js', 'src/auth.js', 'src/logout.js', 'src/failpage.js', 'src/skipaday.js', 'src/popup.js', 'src/users.js'],
  MINIFIED_OUT: 'build/new.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};


gulp.task('default', ['watch']);

gulp.task('build', function(){

  gulp.src(path.JS)
      .pipe(react())
      .pipe(concat(path.MINIFIED_OUT))
      .pipe(uglify(path.MINIFIED_OUT))
      .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){

  gulp.src(path.HTML)
      .pipe(htmlreplace({
          'js': path.MINIFIED_OUT
      }))
      .pipe(gulp.dest(path.DEST));
});

gulp.task('browserify', function(){

  browserify(path.JS, {debug: true})
  .transform('babelify', {presets: ["babel-preset-es2015", "react"]})
  .bundle()
  .on('error', handleErrors)
  .pipe(source('build/new.js'))
  .pipe(gulp.dest(path.DEST))
  .on('end', report);
})

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('watch', function(){

  gulp.watch(path.ALL, ['browserify', 'replaceHTML']);
});

function handleErrors(){
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile error",
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');  
}

function report(){

}