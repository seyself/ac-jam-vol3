module.exports = function(config, argv, path)
{
  const env = config.env;
  config.gzip = {
    src: env.dest + '/**/*.{html,js}',
    dest: env.dest
  };
};