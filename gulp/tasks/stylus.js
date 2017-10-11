module.exports = function(gulp, config, argv)
{
  var stylus, plumber, please, nib, fs, changed, beautify, gulpif, runSequence;

  gulp.task("stylus", function(done){
    init();

    runSequence("stylus:main", "stylus:sub", done);
  });

  addTask('stylus:main', config['stylus:main']);
  addTask('stylus:sub', config['stylus:sub']);

  function addTask(taskName, taskConfig)
  {
    gulp.task(taskName, function() {
      init();

      return gulp.src(taskConfig.src)
        .pipe(plumber())
        .pipe(changed(taskConfig.dest))
        .pipe(stylus({
          use: [nib()],
          import: ['nib'],
          compress: false,
          linenos: false,
          include: taskConfig.include,
          'include css': true
        }))
        .pipe(please({
          fallbacks: { autoprefixer: ['last 4 versions'] },
          minifier: true
        }))
        .pipe(gulpif(!taskConfig.option.minifier, beautify({
          indent: '  ',
          openbrace: 'separate-line',
          autosemicolon: true
        })))
        .pipe(gulp.dest(taskConfig.dest))
    });
  }

  function init()
  {
    if (!stylus)
    {
      runSequence = require('run-sequence');
      stylus = require("gulp-stylus");
      plumber = require("gulp-plumber");
      please = require('gulp-pleeease');
      fs = require('fs');
      nib = require('nib');
      changed = require("gulp-changed");
      beautify = require("gulp-cssbeautify");
      gulpif = require("gulp-if");

      var cdnPath = config.site.cdn;
      if (!cdnPath || cdnPath.indexOf('/') == 0 || cdnPath.indexOf('https://') == 0 || cdnPath.indexOf('http://') == 0)
      {

      }
      else if (cdnPath.charAt(0) != '/')
      {
        cdnPath = '/' + cdnPath;
      }
      if (cdnPath && cdnPath.charAt(cdnPath.length-1) != '/')
      {
        cdnPath += '/';
      }
  
      var cdnStylus = '$cdn = \'' + cdnPath + '\'\n';
      var filePath = config.env.libs + '/style/cdn.styl';
      fs.writeFileSync(filePath, cdnStylus, 'utf8')
    }
  }


};