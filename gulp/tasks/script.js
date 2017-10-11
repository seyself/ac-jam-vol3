module.exports = function(gulp, config, argv)
{
  var _, webpack, plumber, params, runSequence;
  var taskList = [];

  gulp.task("script", function(done){
    init();
    var tasks = taskList.concat([done]);
    runSequence.apply(runSequence, tasks);
  });

  for (var name in config)
  {
    if (name.indexOf('script:') == 0)
    {
      taskList.push(name);
      addTask(name);
    }
  }

  function addTask(taskName, taskConfig)
  {
    taskConfig = taskConfig || config[taskName];

    gulp.task(taskName, function(){
      init();
      if (taskConfig.uglify)
      {
        process.env.NODE_ENV = 'production';
      }
      var useJQuery = false;
      var taskParams = params(config, {uglify:taskConfig.uglify}, useJQuery);
      taskParams = _.merge(taskParams, taskConfig.webpack);

      return gulp.src(taskConfig.src)
        .pipe(plumber())
        .pipe(webpack(taskParams))
        .pipe(gulp.dest(taskConfig.dest));
    });
  }

  function init()
  {
    if (!webpack)
    {
      runSequence = require('run-sequence');
      webpack = require("webpack-stream");
      plumber = require("gulp-plumber");
      _ = require("lodash");

      params = require("../libs/webpack_template");
    }
  }
};
