module.exports = function(gulp, config, argv)
{
  var fs, path, data, sizeOf;

  gulp.task("imagesize", function(){
    if (!fs)
    {
      fs = require("fs");
      path = require("path");
      data = require("gulp-data");
      sizeOf = require("image-size");
    }

    var stylus = '';
    var conf = config.imagesize;
    var jsImageSize = [];
    return gulp.src(conf.src)
      .pipe(
        data(function(file) {
          var filePath = file.history[0];
          var url = path.relative(conf.base, filePath);
          url = url.replace(new RegExp('^' + config.env.buildVer + '/'), '');
          var size = sizeOf(filePath);
          var name = url.replace(/\//g, '_');
          name = name.replace(/\..+$/g, '');
          //console.log(name);
          stylus += '$' + name + '_url=url("' + config.site.cdn + '/' + url + '")\n';
          stylus += '$' + name + '_width=' + size.width + 'px\n';
          stylus += '$' + name + '_height=' + size.height + 'px\n';
          stylus += '$' + name + '()\n  bgimage($'+name+'_url, $'+name+'_width, $'+name+'_height)\n';
          stylus += '$' + name + '_size()\n  width: $'+name+'_width\n  height:$'+name+'_height\n';
  
          var len = conf.ignoreFilter.length;
          var isIgnore = false;
          for(var i=0;i<len;i++)
          {
            var filter = conf.ignoreFilter[i];
            if (url.match(filter))
            {
              isIgnore = true;
              break;
            }
          }
          if (!isIgnore)
          {
            var jsDestURL = 'workspace/data/' + url.replace(/\.(jpg|png|gif)$/, '.js');
            var jsCode = "'/" + config.env.buildVer + '/' + url + "':{w:" + size.width + ",h:" + size.height + "}";
            jsImageSize.push(jsCode);
          }
          
          return {};
        })
      )
      .on('end', function(){
        if (conf.style_dict)
        {
          mkdir(path.dirname(conf.style_dict));
          fs.writeFileSync(conf.style_dict, stylus, 'utf8');
        }
        if (conf.style_dict)
        {
          mkdir(path.dirname(conf.js_dict));
          var jsCode = 'export default {' + jsImageSize.join(',') + '};';
          fs.writeFileSync(conf.js_dict, jsCode, 'utf8');
        }
        //console.log('end');
      });
  });

  function mkdir(dir)
  {
    if (fs.existsSync(dir)) { return; }
    else
    {
      var basedir = path.dirname(dir);
      if (basedir && !fs.existsSync(basedir)) mkdir(basedir);
      fs.mkdirSync(dir);
    }
  }
};

//try {
//  var dimensions = sizeOf(img_path);
//  if (width === undefined) {
//    $img.attr('width', dimensions.width);
//  }
//  if (height === undefined) {
//    $img.attr('height', dimensions.height);
//  }
//  $img.attr('alt', "{{alt_replace}}");
//}
//catch (e) {
//  console.log(img_path + ' is not found.');
//}