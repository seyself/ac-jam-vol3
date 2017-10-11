module.exports = function(config, argv, path)
{
  var env = config.env;
  config.html = {
    src: [
        env.static + '/**/*.{html,ejs}',
        '!' + env.static + '/**/_*.{html,ejs}'
      ],
    ejs_data: config.site,
    dest: env.dest
  };
};