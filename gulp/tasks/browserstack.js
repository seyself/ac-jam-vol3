module.exports = function(gulp, config, argv)
{
  gulp.task('browserstack', function() {
    var karma = require('gulp-karma');
    var src = config.env.spec + '/**/*.{js,jsx}';
    var polyfill = 'node_modules/babel-polyfill/dist/polyfill.js';
    var option = {
      configFile: 'karma.conf.js',
      action: 'run'
      // action: 'watch'
    };
    return gulp.src([polyfill, src])
      .pipe(karma(option));
  });
};
