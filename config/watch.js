module.exports = function(config, argv, path)
{
  const env = config.env;
  config.watch = {
    pug: env.src + '/(pages|contents|components|libs)/**.{pug,jade}',

    //scripts
    'script': [
      env.src + '/(pages|contents|components|libs|modules)/**.{js,jsx,json,frag,vert}',
      '!' + env.src + '/pages/test/**.{js,jsx,json}'
    ],

    //stylesheet
    stylus: env.src + '/(pages|contents|components|libs)/**.styl',

    command: env.src + '/command/*.js',
    copy: env.src + '/static/**',
    imagesize: env.src + '/static/**',
    html: env.src + '/static/**/*.{html,ejs}'
  };
  if (argv.options.test)
  {
    config.watch['script:test'] = [
      env.src + '/(pages|contents|components|libs|modules)/**.{js,jsx,json}',
      '!' + env.src + '/pages/index.js'
    ];
  }
};