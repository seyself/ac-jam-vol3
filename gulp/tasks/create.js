module.exports = function(gulp, config, argv)
{
  // テンプレートからファイルをコピーする
  // $ gulp create --page=pages/top             # topページを作成する
  // $ gulp create --comp=components/header     # headerコンポーネントを作成する

  gulp.task("create", function(){
    var name = argv.options.page || argv.options.comp || ".";
    if (name == true || name == "true")
    {
      name = ".";
    }
    var useHTMLType = argv.options.html || config.env.default_use_html;
    var useScriptType = argv.options.script || config.env.default_use_script;
    var useStyleType = argv.options.style || config.env.default_use_style;
    if (['.js', '.coffee', '.ts', '.es', '.es6', '.es2015', '.tsx'].indexOf(useScriptType) < 0)
    {
      useScriptType = config.env.default_use_script;
    }

    var isPage = !!argv.options.page;
    var isComp = !!argv.options.comp;
    var isTest = !!argv.options.test;

    var fs = require("fs");
    var path = require("path");
    var rename = require("gulp-rename");
    var gulpIgnore = require('gulp-ignore');
    var insert = require('gulp-insert');
    var exec = require('child_process').execSync;

    var fileExists = false;
    function checkFileExists() { return fileExists; }

    if (isTest){
      return (function(){
        var testpath = argv.options.test.split('/');
        var filename = testpath.pop();
        var dir = testpath.join('/')
        var destDir = config.env.test + '/' + dir;
        var destFile = destDir + '/' + filename + '.js';
        // exec("mkdir -p " + destDir + ' && cp ' + config.template.test + '/test.coffee ' + destFile);
        exec("mkdir -p " + destDir);

        return gulp.src(config.template.test + '/test.js')
          .pipe(rename(function(filepath){
            filepath.basename = filename;
            var file = path.join(destDir, filename + filepath.extname);
            fileExists = fs.existsSync(file);
          }))
          .pipe(gulpIgnore.exclude(checkFileExists)) //同じパスにファイルが存在する場合は作成しない。
          .pipe(insert.transform(function(contents, file){
            contents = contents.replace(/{__name__}/g, filename);
            contents = contents.replace(/{__path__}/g, dir + '/');
            return contents;
          }))
          .pipe( gulp.dest( destDir ) );
      })();
    }

    var libsDir = path.join(config.env.src, 'libs');
    gulp.src(config.template.libs)
      .pipe(rename(function(filepath){
        var file = path.join(libsDir, filepath.dirname, filepath.basename + filepath.extname);
        fileExists = fs.existsSync(file);
      }))
      .pipe(gulpIgnore.exclude(checkFileExists)) //同じパスにファイルが存在する場合は作成しない。
      .pipe( gulp.dest( libsDir ) );

    var templatePath = isPage ? config.template.page : config.template.component;
    var pageDir = isPage ? config.env.pages : config.env.components;
    return gulp.src(templatePath)
      .pipe(rename(function(filepath){
        if (filepath.extname != useScriptType && filepath.extname != useHTMLType && filepath.extname != useStyleType)
        {
          fileExists = true;
          return;
        }
        filepath.dirname = name;
        filepath.basename = 'index';
        var file = path.join(pageDir, filepath.dirname, filepath.basename + filepath.extname);
        fileExists = fs.existsSync(file);
      }))
      .pipe(gulpIgnore.exclude(checkFileExists)) //同じパスにファイルが存在する場合は作成しない。
      .pipe(insert.transform(function(contents, file){
        contents = contents.replace(/__name__/g, name.split('/').pop());
        return contents;
      }))
      .pipe(gulp.dest( pageDir ));
  });
};

