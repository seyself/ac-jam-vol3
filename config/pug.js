module.exports = function(config, argv, path)
{
  var env = config.env;
  var site = config.site;
  var data = config.getValue(config.data);

  config.pug = {
    src: env.pages + '/{!(_)*,**/!(_)*}.pug',
    base: env.pages + '/',
    tmp: env.tmp,
    dest: env.dest,
    option: {
      pretty: true,
      cache: true,
      basedir: env.src
    },
    data: data
  };
};

