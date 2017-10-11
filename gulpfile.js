var gulp = require('./gulp/');
var runSequence = require('run-sequence');
var argv = require('./gulp/libs/argv');

gulp.task('setup', function(done)
{
  runSequence('prompt', 'init', 'create', 'prebuild', 'sprite', 'copy', done);
});

gulp.task('build', function(done)
{
  if (argv.options.staging || argv.options.release)
  {
    runSequence('prompt', 'clean', 'prebuild', 
      'sprite', 'command', 'copy', 'imagesize', 
      'html', 'pug', 'stylus', 'script:main', 'concat', done);
  }
  else
  {
    runSequence('prompt', 'clean', 'prebuild', 
      'sprite', 'command', 'copy', 'imagesize', 
      'html', 'pug', 'stylus', 'script:main', done);
  }
});

gulp.task('font-copy', (done)=>{
  return gulp.src('workspace/fonts/**/*')
             .pipe( gulp.dest('workspace/build/fonts') );
});

gulp.task('deploy', function(done)
{
  runSequence('build', 'package', done);
});

gulp.task('develop', ['server','watch']);

gulp.task('build:test', function(done)
{
  if (argv.options.remote)
  {
    runSequence('build', 'upload', 'karma', done);
  }
  else
  {
    runSequence('build', 'karma', done);
  }
});

gulp.task('default', []);

module.exports = gulp;
