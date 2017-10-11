module.exports = function(config, argv, path)
{
  var env = config.env;
  config.minify = {
    html: {
      src: env.dest + '/**/*.html',
      dest: env.dest,
      ignore: ''
    },
    js: {
      src: env.dest + '/**/*.js',
      dest: env.dest,
      ignore: ''
    },
    css: {
      src: env.dest + '/**/*.css',
      dest: env.dest,
      ignore: ''
    }
  };
};