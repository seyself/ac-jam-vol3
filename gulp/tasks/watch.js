module.exports = function(gulp, config, argv)
{
  gulp.task('watch', function () {
    var watch = require('gulp-watch');
    for (var taskName in config.watch)
    {
      setWatch(taskName, config.watch[taskName]);
    }

    function setWatch(taskName, src)
    {
      watch(src, function() {
        gulp.start([taskName]);
      });
    }

  });
};