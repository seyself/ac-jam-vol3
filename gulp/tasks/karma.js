module.exports = function(gulp, config, argv)
{
  gulp.task('karma', function() {
    var karma = require('gulp-karma');
    var src = config.env.test + '/unit/**/*.{js,jsx}';
    var polyfill = 'node_modules/babel-polyfill/dist/polyfill.js';
    var option = {
      configFile: 'karma.conf.js',
      action: 'run',
      singleRun: true
      // action: 'watch'
    };
    return gulp.src([polyfill, src])
      .pipe(karma(option));
  });
};
