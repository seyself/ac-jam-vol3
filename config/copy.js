module.exports = function(config, argv, path)
{
  var env = config.env;
  config.copy = {
    src: [
      env.static + '/**/*',
      '!' + env.static + '/**/*.{styl,html,ejs,tps}',
      '!' + env.static + '/assets/font/**',
      env.components + '/**/*.{png,jpg,gif,mp3,mp4,otf,ttf,woff,svg,json}'
    ],
    ignore: /(\/_|\.DS_Store|Thumbs\.db)/,
    optimize: {
      filter: /special\/.+\.(png|gif|jpg|svg)$/,
      options: {
        quality: '40-80',
        speed: 1
      }
    },
    dest: env.dest
  };
};