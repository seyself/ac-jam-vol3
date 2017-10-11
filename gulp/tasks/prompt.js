module.exports = function(gulp, config, argv)
{
  gulp.task('prompt', function() {
    
    if (argv.options.skip) return;
    
    if (argv.options.confirm)
      return __confirm('Continue ' + argv.task + ' task?');
    
    if (argv.options.release)
      return __confirm('Continue ' + argv.task + ' --release task?');
  
    if (argv.task == 'test' && argv.options.remote)
      return __confirm('Continue test --remote task?');
    
  });
  
  function __confirm(msg)
  {
    var prompt = require('gulp-prompt');
    return gulp.src(config.env.src).pipe( prompt.confirm(msg) );
  }
  
};

