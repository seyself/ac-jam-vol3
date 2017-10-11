var fs = require("fs");
var path = require("path");
var argv = require("./libs/argv");
var addr = require("./libs/local_address");
var configDir = "./config";
var config = {
  addr: addr,
  path: function(filepath)
  {
    return filepath;
  },
  getValue: function(data)
  {
    var defaultValue = data['default'] != undefined ? data['default'] : data['develop'];
    if (defaultValue === undefined) defaultValue = null;
    return argv.options.release ? (data['release'] != undefined ? data['release'] : defaultValue)
         : argv.options.staging ? (data['staging'] != undefined ? data['staging'] : defaultValue)
         : argv.options.archive ? (data['archive'] != undefined ? data['archive'] : defaultValue)
         : argv.options.extra   ? (data['extra']   != undefined ? data['extra']   : defaultValue)
         : argv.options.local   ? (data['local']   != undefined ? data['local']   : defaultValue)
         : argv.options.develop ? (data['develop'] != undefined ? data['develop'] : defaultValue)
         : defaultValue;
  }
};

require("./options")(argv);

var envPath = path.join('../', configDir, 'env.js');
var env = require(envPath);
env(config, argv, path);

var sitePath = path.join('../', configDir, 'site.js');
var site = require(sitePath);
site(config, argv, path);

if (argv.options.confirm || argv.options.release)
{
  console.log('env: ' + JSON.stringify(config.env, null, '  '));
  console.log('site: ' + JSON.stringify(config.site, null, '  '));
  console.log('data: ' + JSON.stringify(config.data, null, '  '));
}

fs.readdirSync(configDir)
.filter( function(file)
{
  return file.match(/.js$/)
})
.forEach( function(file)
{
  if (file == 'env.js') return;
  if (file == 'site.js') return;

  var settings = require(path.join('../', configDir, file));
  if (typeof(settings) == 'function')
  {
    settings(config, argv, path);
  }
});
module.exports = config;
