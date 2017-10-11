module.exports = function(config, argv, path)
{
  var env = config.env;

  config['stylus:main'] = {
    src: [
      env.pages + '/**/!(_)*.styl',
      '!' + env.pages + '/video/!(_)*.styl'
    ],
    dest: env.useBuildVer ? env.dest + '/' + env.buildVer : env.dest,
    include: [env.libs, env.components, env.contents, env.src, 'node_modules'],
    option: {
      minifier: env.__release
    }
  };

  config['stylus:sub'] = {
    src: env.pages + '/video/index.styl',
    dest: env.dest + '/video',
    include: [env.libs, env.components, env.contents, env.src, 'node_modules'],
    option: {
      minifier: env.__release
    }
  };
};