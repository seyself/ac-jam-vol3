module.exports = function(gulp, config, argv)
{
  var exec = require('child_process').execSync;
  gulp.task("init", function(done){
    var dirs = [
      config.env.pages,
      config.env.libs,
      config.env.components,
      config.env.assets,
      config.env.dest
    ];
    exec('mkdir -p ' + dirs.join(' '));

    exec('cp -rf ' + config.template.static + ' ' + config.env.src);

    var fs = require("fs");
    var path = require("path");
    var rename = require("gulp-rename");
    var gulpIgnore = require('gulp-ignore');
    var fileExists = false;
    function checkFileExists() { return fileExists; }

    var libsDir = path.join(config.env.src, 'libs');
    gulp.src(config.template.libs)
      .pipe(rename(function(filepath){
        var file = path.join(libsDir, filepath.dirname, filepath.basename + filepath.extname);
        fileExists = fs.existsSync(file);
      }))
      .pipe(gulpIgnore.exclude(checkFileExists)) //同じパスにファイルが存在する場合は作成しない。
      .pipe( gulp.dest( libsDir ) )
      .on('end', function(){
        exec('gulp create --page');
        done();
      });
  });
};
