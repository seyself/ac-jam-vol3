module.exports = function(gulp, config, argv, credential, done)
{
  var changed = require("gulp-changed");
  var ftp = require('gulp-ftp');
  var insert = require('gulp-insert');
  var path = require('path');
  var md5 = require('md5');
  var fs = require('fs');
  var execSync = require('child_process').execSync;
  var gulpIgnore = require('gulp-ignore');
  var prompt = require('gulp-prompt');

  var params = credential.data;

  console.log('### FTP', path.join(params.host, params.remotePath));

  execSync('mkdir -p ' + config.env.cache);
  var cacheFile = config.env.cache + '/' + params.host + '.json';
  if (fs.existsSync(cacheFile) == false)
  {
    fs.writeFileSync(cacheFile, '{}', 'utf8');
  }
  var newCache = {};
  var oldCache = JSON.parse(fs.readFileSync(cacheFile));
  var dest = path.join(config.env.dest, "**/*");
  var _uploadIgnore = false;
  function isIgnoreFile(){ return _uploadIgnore; }
  var current = process.cwd();
  var filepath = "";

  gulp.src(dest)
    .pipe(prompt.confirm('Continue uploading?'))
    .pipe(insert.transform(function(content, file){
      var hash = md5(file.contents);
      var filepath = path.relative(current, file.history[0]);
      newCache[filepath] = hash;
      _uploadIgnore = oldCache[filepath] == newCache[filepath];
      return file.contents;
    }))
    .pipe(gulpIgnore.exclude(isIgnoreFile)) //キャッシュしているHASHと同じ場合はアップロードしない
    .pipe(ftp(params))
    .on('data', function(file){
      if (file._contents)
      {
        var filepath = path.relative(current, file.history[0]);
        console.log('  upload', filepath);
      }
    })
    .on('end', function(){
      fs.writeFileSync(cacheFile, JSON.stringify(newCache), 'utf8');
      done();
    });
};