module.exports = function(config, argv, path)
{
  var env = config.env;

  config.imagesize = {
    base: env.dest,
    src: env.dest + '/**/*.{png,jpg,gif}',
    style_dict: env.libs + '/style/images.styl',
    js_dict: env.data + '/imagesize.js',
    ignoreFilter: [
      /^(og_image|icons)\//,
      /^image\/artist/,
    ],
    
  };
};