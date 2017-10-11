module.exports = function(gulp, config, argv)
{
  var exec = require('child_process').execSync;
  gulp.task("clean", function(done){
    for (var key in config.clean.target)
    {
      var path = config.clean.target[key];
      var cmd = 'rm -rf ' + path;
      exec(cmd);
    }
    done();
  });
};
