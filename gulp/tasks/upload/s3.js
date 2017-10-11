module.exports = function(gulp, config, argv, credential, done)
{
  var changed = require("gulp-changed");
  var aws_publish = require('gulp-awspublish');
  var path = require('path');
  var runSequence = require('run-sequence');
  var gulpif = require('gulp-if');
  var rename = require('gulp-rename');
  var prompt = require('gulp-prompt');

  console.log('### AWS:S3 Bucket::' + credential.data.params.Bucket);

  var _params = config.upload.s3;
  _params.connection = credential.data;
  var _settings = _params.settings;
  var tasks = [];
  for (var name in _settings)
  {
    var taskName = addTask(name, _settings[name], _params, credential.remotePath, tasks.length);
    tasks.push(taskName);
  }
  tasks.push(done);
  runSequence.apply(runSequence, tasks);
  // end task

  function addTask(name, data, params, remotePath, taskIndex)
  {
    if (!data.headers)
    {
      data['headers'] = {};
    }
    if (!data.headers['Cache-Control'])
    {
      data.headers['Cache-Control'] = 'max-age=' + (data.max_age || params.default_max_age) + ', no-transform, public';
    }
    if (data.gzip)
    {
      data.headers['ContentEncoding'] = 'gzip';
    }

    var taskName = '__upload:s3:' + name;

    gulp.task(taskName, function()
    {
      var publisher = aws_publish.create(params.connection);
      var stream = gulp.src(data.src);
      if (taskIndex === 0 && !argv.options.skip)
      {
        stream = stream.pipe(prompt.confirm('Continue uploading?'));
      }
      return stream.pipe(rename(function(filepath){
          filepath.dirname = path.join(remotePath, filepath.dirname);
        }))
        .pipe(gulpif(data.gzip, aws_publish.gzip()))
        .pipe(publisher.publish(data.headers, { force:config.upload.s3.force }))
        .pipe(publisher.cache())
        .pipe(aws_publish.reporter());
    });
    return taskName;
  }
};