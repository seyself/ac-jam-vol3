module.exports = function(config, argv, path)
{
  const env = config.env;
  const dir = env.dest;
  const use_gzip = true;

  if (argv.options.src)
  {
    dir = env.deploy + '/' + argv.options.src;
  }
  
  let credentials = null;
  try
  {
    credentials = require('../credentials/remote.json');
  }
  catch(error)
  {
    console.log('\u001b[33m' + error.code + ': ' + String(error).split('\n').shift()) + '';
  }

  const max_age = env.__release ? 60 : 0;
  
  config.upload = {
    credentials: credentials,
    s3: {
      default_max_age: (env.__release ? 600 : 0),
      force: (env.__release ? false : false),
      settings: {
        default: {
          src: [
            dir + '/**/*',
            '!' + dir + '/word/img/*.png',
            '!' + dir + '/pickup/img/*.png',
            '!' + dir + '/data/img/*.png',
            '!' + dir + '/word/index.html',
            '!' + dir + '/pickup/index.html',
            '!' + dir + '/data/index.html',
            '!' + dir + '/**/*.{html,js,css,json,mp3,mp4}'
          ],
          gzip: false
        },
        mp3:  { src: dir + '/**/*.mp3', headers: { 'ContentType': 'audio/mpeg' }, gzip: false },
        mp4:  { src: dir + '/**/*.mp4', headers: { 'ContentType': 'video/mp4' }, gzip: false },
        json: { src: [dir + '/**/*.json', '!' + dir + '/**/summary.json'], headers: { 'ContentType': 'application/json; charset=utf-8' }, gzip: use_gzip, max_age:max_age },
        css:  { src: dir + '/**/*.css', headers: { 'ContentType': 'text/css' }, gzip: false, max_age:max_age },
        js:   { src: dir + '/**/*.js', headers: { 'ContentType': 'application/javascript' }, gzip: use_gzip, max_age:max_age },
        html: { src: dir + '/**/*.html', headers: { 'ContentType': 'text/html' }, gzip: use_gzip, max_age:max_age }
      }
    }
  };
};
