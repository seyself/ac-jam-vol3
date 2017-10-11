module.exports = function(config, argv, path)
{
  var env = config.env;
  config.sprite = {
    output: path.join(env.libs, 'css/assets.styl'),
    option: {
      file_prefix: 'sprite_',
      file_suffix: ''
    },
    target: {
      // header: {
      //   src: 'workspace/src/static/images/_header/*.png',
      //   dest: 'workspace/src/static/images/',
      //   path: config.site.baseDir + config.site.cdn + '/image/',
      //   base: 'workspace/src/static'
      // }
    }
  };
};