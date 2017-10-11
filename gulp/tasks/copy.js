module.exports = function(gulp, config, argv)
{
  var changed, gulpIgnore, gulpif, imagemin, pngquant, rename, del;

  gulp.task("copy", function(){
    if (!changed)
    {
      changed = require("gulp-changed");
      gulpIgnore = require('gulp-ignore');
      gulpif = require('gulp-if');
      imagemin = require('gulp-imagemin');
      pngquant = require('imagemin-pngquant');
      rename = require('gulp-rename');
      del = require('del');
    }

    return gulp.src(config.copy.src, { base: config.copy.base })
      .pipe( changed(config.copy.dest) )
      .pipe( gulpIgnore(function(file){
        var filePath = file.history[0];
        return filePath.match(config.copy.ignore)
      }) )
      .pipe(gulpif(
        function(file){
          var filepath = file.history[0];
          if (config.copy.optimize.filter.test(filepath))
          {
            return true;
          }
          return false;
        }, imagemin({
          use:[
            pngquant(config.copy.optimize.options)
          ]
        })
      ))
      .pipe( rename(function (filePath)
        {
          filePath.dirname = filePath.dirname.replace('$ver', config.env.buildVer);
          del(config.env.dest + '/$ver');
        })
      )
      .pipe( gulp.dest( config.copy.dest ));
  });
};