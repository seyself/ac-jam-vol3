module.exports = function(gulp, config, argv)
{
  gulp.task("prebuild", function(done){
    var concat = require('gulp-concat');
    var plumber = require("gulp-plumber");
    var fs = require("fs");
    var total = config.prebuild.length;
    var count = 0;

    for (var i=0; i<total; i++)
    {
      build(config.prebuild[i]);
    }

    if (total == 0)
    {
      done();
    }

    var js_code = '';
    var base_dir = config.site.cdn;
    js_code += 'window.version=\'' + config.site.version + '\';';
    js_code += 'window.env=\'' + config.env.buildVer + '\';';
    js_code += 'window.cdn=\'' + base_dir + '\';';
    js_code += 'window.assetPath=function(f){return \'' + base_dir + '\'+f;};';
    fs.writeFileSync(config.env.libs + '/config.js', js_code, 'utf-8');

    function build(params)
    {
      gulp.src(params.src)
        .pipe(plumber())
        .pipe(concat(params.file))
        .pipe(gulp.dest(params.dest))
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