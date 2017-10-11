module.exports = function(gulp, config, argv)
{
  gulp.task("command", function(done){
    var fs = require("fs");
    var path = require("path");
    var exec = require("child_process").execSync;
    var env = config.env;
    var cwd = process.cwd();
    var data = require("gulp-data");
    var files = [];
    try {
      files = fs.readdirSync(env.command)
      .filter( function(fileName)
      {
        return fileName.match(/^[^_].*\.js$/)
      });
    } catch(e) {
      done();
      return true;
    }

    function exportFile(filePath, text)
    {
      var dest = path.join(cwd, 'workspace/', filePath);
      var dir = path.dirname(dest);
      console.log('export >>', dest);
      exec('mkdir -p ' + dir);
      fs.writeFileSync(dest, text, 'utf8');
    }
  
    var position = 0;
    
    function next()
    {
      var fileName = files[position++];
      if (fileName)
      {
        var filePath = path.join(cwd, env.command, fileName);
        console.log('command >>', fileName);
        var cmd = require(filePath);
        cmd(config, argv, exportFile, next);
      }
      else
      {
        done();
      }
    }
    
    if (files.length > 0)
    {
      next();
    }
    else
    {
      done();
      return true;
    }
  });
};