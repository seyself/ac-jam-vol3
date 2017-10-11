module.exports = function(gulp, config, argv)
{
  gulp.task('html', function() {
    var ejs = require('gulp-ejs');
    var changed = require("gulp-changed");
    var plumber = require("gulp-plumber");
    return gulp.src(config.html.src)
      .pipe(plumber())
      .pipe(ejs({ejsconf:config.html.ejs_data}))
      .pipe(gulp.dest(config.html.dest));
  });
};