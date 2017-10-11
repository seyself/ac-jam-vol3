module.exports = function(gulp, config, argv)
{
  var pug, gulp_pug, plumber, data, _, path, fs, changed, option, insert, ejs, ejs_opts;
  var replaceTagClose, setImageDimensions;

  gulp.task("pug", function(){
    if (!pug)
    {
      _ = require("lodash");
      path = require("path");
      fs = require("fs");
      gulp_pug = require("gulp-pug");
      data = require("gulp-data");
      plumber = require("gulp-plumber");
      changed = require("gulp-changed");
      insert = require("gulp-insert");
      pug = require("pug");
      ejs = require('gulp-ejs');

      replaceTagClose = require("../libs/replaceTagClose");
      setImageDimensions = require("../libs/setImageDimensions")(config.pug.base, config.pug.dest);

      pug.filters.html = function(block)
      {
        return block;
      };
      option = _.merge(config.pug.option, {pug:pug});
    }
  
  
    return gulp.src(config.pug.src)
      .pipe(plumber())
      .pipe(changed(config.pug.src))
      .pipe(data(function(file){
        var env = config.env;
        var base = config.pug.base;
        var filepath = path.relative(base, file.history[0]);
        var fileURL = path.relative(config.env.dest, file.history[0]);
        var extname = path.extname(filepath);
        var dir = path.dirname(filepath);
        var _root = path.relative(base + '/' + dir, base) + '/';
        if (_root == '/')
        {
          _root = './';
        }
        var _asset = env.useBuildVer ? _root + '/' + env.buildVer : _root;
        _path = {
          filepath: filepath,
          dirpath: dir + '/',
          filename: path.basename(filepath),
          name: path.basename(filepath, extname),
          extname: extname,
          rel: function(filepath){
            return path.join(_root, filepath);
          },
          abs: function(filepath){
            return '/' + path.relative('./', filepath);
          },
          asset: function(filepath){
            if (filepath.indexOf('/') == 0)
            {
              filepath = filepath.substr(1);
            }
            return path.join(_asset, path.relative('./', filepath));
          },
          root: _root
        };
        if (config.env.path)
        {
          _path.path = config.env.path + _path.dirpath;
        }
        var destParams = _.merge(config.pug.data, {
          env: config.env,
          file: _path,
          path: path,
          site: config.site,
          option: config.data.option,
          args: argv.options,
          require:require,
          ejsconf:config.html.ejs_data
        });
  
        return destParams;
      }))
      .pipe(gulp_pug(option))
      .pipe(ejs()) //EJS

      // imgタグにwidth, heightを設定する
      .pipe(insert.transform(setImageDimensions))

      // img, brの空要素に/を付ける
      .pipe(insert.transform(replaceTagClose))
      .pipe(gulp.dest(config.pug.dest));
  });
};

