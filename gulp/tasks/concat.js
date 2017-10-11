module.exports = function(gulp, config, argv)
{
  gulp.task("concat", function(done){
    var concat = require('gulp-concat');
    var plumber = require("gulp-plumber");
    var fs = require("fs");
    var settings = config.concat;
    var count = 0;
    var total = 0;

    for (var name in settings)
    {
      total++;
    }

    for (var name in settings)
    {
      var option = settings[name];
      build(name, option.files, option.dest);
    }

    if (total == 0)
    {
      // done();
    }

    function build(name, files, dest)
    {
      gulp.src(files)
        .pipe(plumber())
        .pipe(concat(name))
        .pipe(gulp.dest(dest))
        .on('end', function(){
          count++;
          if (count == total)
          {
            done();
          }
        });
    }
  });
};