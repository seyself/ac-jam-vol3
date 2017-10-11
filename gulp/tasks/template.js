module.exports = function(gulp, config, argv)
{
  var pug, gulp_pug, fs, rename, plumber, data, _, path, changed, option, insert, ejs, ejs_opts;
  var replaceTagClose, setImageDimensions;

  gulp.task("template", function(done){
    if (!pug)
    {
      _ = require("lodash");
      path = require("path");
      gulp_pug = require("gulp-pug");
      rename = require('gulp-rename');
      data = require("gulp-data");
      plumber = require("gulp-plumber");
      changed = require("gulp-changed");
      insert = require("gulp-insert");
      pug = require("pug");
      ejs = require('gulp-ejs');
      fs = require('fs');

      replaceTagClose = require("../libs/replaceTagClose");
      setImageDimensions = require("../libs/setImageDimensions")(config.pug.base, config.pug.dest);

      pug.filters.escape = function(block)
      {
        return block.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/[&]/g,'&amp;');
      };
      pug.filters.html = function(block)
      {
        return block;
      };
      option = _.merge(config.pug.option, {pug:pug});
    }

    var count = 0;
    var generateList = config.template.generate;
    var total = generateList.length;
    for (var i=0;i<total;i++)
    {
      generateHTML(generateList[i], _cb);
    }

    function _cb()
    {
      count++;
      if (count==total)
      {
        done();
      }
    }

    function generateHTML(params, cb)
    {
      var _template = '';
      if (params.transform)
      {
        _template = fs.readFileSync(params.template, 'utf8');
      }

      return gulp.src(params.src)
        .pipe(plumber())
        // .pipe(changed(config.pug.src))
        .pipe(insert.transform(function(contents, file){
          if (params.transform)
          {
            return params.transform(_template, contents, file);
          }
          return contents;
        }))
        .pipe(rename(function(filepath){
          if (params.rename)
          {
            params.rename(filepath);
          }
        }))
        .pipe(data(function(file){
          var base = config.pug.src.replace(/\/[*]+.*/, '');
          var filepath = path.relative(base, file.history[0]);
          var _root = path.relative(filepath, '');
          var extname = path.extname(filepath);
          var _data = {};
          if (params.data)
          {
            _data = params.data(file);
          }
          _path = {
            filepath: filepath,
            dirpath: path.dirname(filepath) + '/',
            filename: path.basename(filepath),
            name: path.basename(filepath, extname),
            extname: extname,
            path: ""
          };
          if (config.env.path)
          {
            _path.path = config.env.path + _path.dirpath;
          }
          return _.merge({}, config.pug.data, {
            env: config.env,
            file:_path,
            path: path,
            site: config.site,
            args: argv.options,
            require:require,
            ejsconf:config.html.ejs_data,
            data: _data
          });
        }))
        .pipe(gulp_pug(option))
        .pipe(ejs()) //EJS

        // imgタグにwidth, heightを設定する
        .pipe(insert.transform(setImageDimensions))

        // img, brの空要素に/を付ける
        .pipe(insert.transform(replaceTagClose))
        .pipe(gulp.dest(params.dest))
        .on('end', function(){
          cb();
        });
    }
  });
};

