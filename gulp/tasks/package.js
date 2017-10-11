module.exports = function(gulp, config, argv)
{
  var gulpIgnore, exec, execSync, path;
  
  gulp.task("package", function(done){
    if (!gulpIgnore)
    {
      gulpIgnore = require('gulp-ignore');
      exec = require('child_process').exec;
      execSync = require('child_process').execSync;
      path = require('path');
    }
    
    var fs = require('fs');
    var gzip = require('gulp-gzip');
    var htmlmin = require('gulp-html-minifier');
    var jsmin = require('gulp-uglify');
    var cssmin = require('gulp-clean-css');
    var gulpif = require("gulp-if");
    var use_gzip = config.env.__release;
    
    gulp.src(config.package.src, { base: config.package.base })
      .pipe( gulpIgnore(function(file){
        var filePath = file.history[0];
        var isIgnore = filePath.match(config.package.ignore);
        return isIgnore;
      }) )
      
      
      //css
      .pipe(gulpif(
        function(file){
          var filePath = file.history[0];
          var cwd = file.cwd;
          var base = file.base;
          return filePath.match(/\.css$/);
        },
        cssmin({
          processImportFrom: ['remote'],
          keepBreaks: false
        })
      ))
      
      
      .pipe( gulp.dest( config.package.dest ) )
      .on('end', function(){
        var dirname = path.basename(config.package.dest);
        var basedir = path.dirname(config.package.dest);
        if (config.env.__release || config.env.__staging || config.env.__develop || config.env.__archive)
        {
          var len = config.package.remove.length;
          for(var i=0;i<len;i++)
          {
            if (config.package.remove[i])
            {
              var removePath = config.package.dest + config.package.remove[i];
              console.log('remove: ' + removePath);
              if (removePath.indexOf('$') >= 0)
              {
                execSync("rm -rf '" + removePath + "'");
              }
              else
              {
                execSync("rm -rf " + removePath + "");
              }
            }
          }
        }
        var cmd = 'cd ' + basedir + '; zip -r ' + dirname + '.zip ' + dirname;
        exec(cmd, function(){
          console.log('  package >> ' + config.package.dest);
          var uploadCommand = '';
          var shUploadCommand = '';
          var commandFile = 'upload.sh';
          if (config.env.__release)
          {
            uploadCommand = 'gulp upload --release --src=' + dirname;
            shUploadCommand = 'gulp upload --release --skip --src=' + dirname;
            commandFile = 'upload_release.sh';
          }
          else
          if (config.env.__extra)
          {
            uploadCommand = 'gulp upload --extra --src=' + dirname;
            shUploadCommand = 'gulp upload --extra --skip --src=' + dirname;
            commandFile = 'upload_extra.sh';
          }
          else
          if (config.env.__staging)
          {
            uploadCommand = 'gulp upload --staging --src=' + dirname;
            shUploadCommand = 'gulp upload --staging --skip --src=' + dirname;
            commandFile = 'upload_staging.sh';
          }
          else
          if (config.env.__archive)
          {
            uploadCommand = 'gulp upload --archive --src=' + dirname;
            shUploadCommand = 'gulp upload --archive --skip --src=' + dirname;
            commandFile = 'upload_archive.sh';
          }
          else
          {
            uploadCommand = 'gulp upload --develop --skip --src=' + dirname;
            shUploadCommand = 'gulp upload --develop --skip --src=' + dirname;
            commandFile = 'upload_develop.sh';
          }
          console.log('  upload command >> $ ' + uploadCommand);
          
          fs.writeFileSync(commandFile, '#!/bin/bash\n' + shUploadCommand + '\n', 'utf8');
          console.log('  export upload command >> $ sh ' + commandFile);
          done();
        });
      })
  });
  
  
};