module.exports = function(gulp, config, argv)
{
  gulp.task('gzip', function() {
    var gzip = require('gulp-gzip');
    var changed = require("gulp-changed");
    return gulp.src(config.gzip.src)
      .pipe(changed(config.gzip.dest))
      .pipe(gzip({ append:false, threshold:false }))
      .pipe(gulp.dest(config.gzip.dest));
  });
}