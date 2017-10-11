module.exports = function(gulp, config, argv)
{
  var changed, spritesmith, path, fs;

  gulp.task("sprite", function(done){
    if (!changed)
    {
      changed = require("gulp-changed");
      spritesmith = require('gulp.spritesmith');
      path = require('path');
      fs = require('fs');
    }

    var all_imports = "";
    var count = 0;
    var total = 0;
    for (var name in config.sprite.target)
    {
      total += 1;
      var target = config.sprite.target[name];
      if (config.env.path)
      {
        target.path = path.join(config.env.path, path.relative(target.base, target.dest), target.path);
      }
      var styleFile = generate(name, target, config.sprite.option);
      var stylePath = path.join(target.dest, styleFile);
      var outputDir = path.dirname(config.sprite.output);
      all_imports += "@import '" + path.relative(config.env.src, stylePath) + "'\n";
    }

    if (total == 0)
    {
      allComplete();
    }

    function generate(name, params, option)
    {
      var fileName = option.file_prefix + name + option.file_suffix;
      var sprite_option = {
        imgName: fileName + ".png",
        cssName: fileName + ".styl",
        imgPath: path.join(params.path, fileName + ".png"),
        cssFormat: "stylus",
        padding: 4,
        cssVarMap: function(sprite){ sprite.name = ['sprite', name, sprite.name].join('_'); }
      };
      var spriteData = gulp.src(params.src).pipe(spritesmith(sprite_option));
      spriteData.img.pipe( gulp.dest( params.dest ) ).on('end', function(){
        spriteData.css.pipe( gulp.dest( params.dest ) ).on('end', function(){
          count += 1;
          if (count == total)
          {
            allComplete();
          }
        });
      });
      return fileName + ".styl"
    }

    function allComplete()
    {
      fs.writeFile(config.sprite.output, all_imports, 'utf8', done);
    }
  });
};