module.exports = function(gulp, config, argv)
{
  gulp.task("minify", function(done){
    console.log('minify');
    console.log(JSON.stringify(config.minify, null, '  '));
    var conf = config.minify;
    var runSequence = require('run-sequence');
    runSequence("minify:html", "minify:js", "minify:css", done);
  });

  gulp.task("minify:html", function(){
    var conf = config.minify;
    var minify = require('gulp-html-minifier');
    return gulp.src(conf.html.src)
      .pipe(minify({
        collapseWhitespace: true,
        ignorePath: '/assets'
      }))
      .pipe(gulp.dest(conf.html.dest));
  });

  gulp.task("minify:js", function(){
    var conf = config.minify;
    var minify = require('gulp-minify');
    //return gulp.src(conf.js.src)
    //  .pipe(minify({
    //    ext:'.min.js',
    //    exclude: [],
    //    ignoreFiles: []
    //  }))
    //  .pipe(gulp.dest(conf.js.dest));
  });

  gulp.task("minify:css", function(){
    var conf = config.minify;
    var minify = require('gulp-clean-css');
    return gulp.src(conf.css.src)
      .pipe(minify({
        processImportFrom: ['remote'],
        keepBreaks: true
      }))
      .pipe(gulp.dest(conf.css.dest));
  });
};