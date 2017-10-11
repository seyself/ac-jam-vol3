module.exports = function(config, argv, path)
{
  var env = config.env;
  config.clean = {
    target: [
      env.dest
    ]
  };
};