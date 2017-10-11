module.exports = function(gulp, config, argv)
{
  var runSequence = require('run-sequence');
  
  gulp.task('test_script', function(done) {
    runSequence("karma", "script:main", done);
  });
};
