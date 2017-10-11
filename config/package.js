var date = require('../node_modules/moment')();

module.exports = function(config, argv, path)
{
  var dirname = date.format('YYYYMMDD_HHmm');
  if (argv.options.package)
  {
    dirname = argv.options.package;
  }
  else
  if (config.env.__release)
  {
    dirname = 'release_' + dirname;
  }
  else
  if (config.env.__extra)
  {
    dirname = 'extra_' + dirname;
  }
  else
  if (config.env.__staging)
  {
    dirname = 'staging_' + dirname;
  }
  else
  if (config.env.__archive)
  {
    dirname = 'archive_' + dirname;
  }
  else
  {
    dirname = 'develop_' + dirname;
  }
  var env = config.env;
  var dest = env.dest;
  var build = env.useBuildVer ? env.dest + '/' + env.buildVer : env.dest;

  var removeList = [
    '/json',
    '/test.html',
    '/' + env.buildVer + '/js/dev.js',
    '/' + env.buildVer + '/css/dev.css'
  ];

  config.package = {
    base: dest,
    src: [
      dest + '/**/*'
    ],
    ignore: /(\/_|\.DS_Store|Thumbs\.db|\/post\/|\/test\/|\/sample\/)/,
    remove: removeList,
    dest: path.join(env.deploy, dirname)
  };
};