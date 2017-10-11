module.exports = function(gulp, config, argv)
{
  gulp.task('server', function()
  {
    var webserver = require('gulp-webserver');
    gulp.src(config['server:static'].root)
        .pipe(webserver(config['server:static'].options));

    var http = require('http');
    var api = require('../../' + config['server:api'].root);
    http.createServer(function(req, res){
      var data = api(req, res);
      var header = {
        'Access-Control-Allow-Origin':'*',
        'Pragma': 'no-cache',
        'Cache-Control' : 'no-cache',
        'Content-Type': 'application/json'
      };
      res.writeHead(200, header);
      res.end(JSON.stringify(data, null, '  '));
    }).listen(config['server:api'].port, config['server:api'].host);
    console.log('API Server started at http://' + config['server:api'].host + ':' + config['server:api'].port);
  });
};
