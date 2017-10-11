module.exports = function(config, argv, path)
{
  var path = require('path');
  var env = config.env;
  config.concat = {
    "bundle.js": {
      files: [
        path.join(env.dest, env.buildVer, 'libs.js'),
        path.join(env.dest, env.buildVer, 'index.js')
      ],
      dest: path.join(env.dest, env.buildVer)
    }
  };
};
