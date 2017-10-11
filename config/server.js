module.exports = function(config, argv, path)
{
  const env = config.env;
  let host = 'localhost';
  if (config.addr.ipv4[0])
  {
    host = config.addr.ipv4[0].address;
  }
  
  const port = 8000;
  const ssl = false;
  const openURL = (ssl?'https://':'http://') + host + ':' + port + '/';

  config['server:static'] = {
    root: env.dest,
    listen: port,
    options: {
      host: host,
      port: port,
      livereload: true,
      directoryListing: false,
      open: openURL,
      https: ssl ? ({
        key:  'node_modules/gulp-webserver/ssl/dev-key.pem',
        cert: 'node_modules/gulp-webserver/ssl/dev-cert.pem'
      }) : false
    }
  };
  config['server:api'] = {
    root: env.api + '/index.js',
    host: host,
    port: 8002
  };
};

