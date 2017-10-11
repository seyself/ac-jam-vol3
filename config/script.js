module.exports = function(config, argv, path)
{
  var env = config.env;
  var debug = config.env.debug; //argv.options.debug;
  var execSync = require('child_process').execSync;
  var find = require('../gulp/libs/find');
  var path = require('path');

  var entry = (function(){
    var files = find( env.pages, /\.(coffee|js|jsx)$/ );
    var entry = {
      main: {},
      test: {},
    };
    var numFiles = files.length;
    for (var i=0;i<numFiles;i++)
    {
      var filepath = files[i];
      if (filepath)
      {
        var key = filepath.replace(env.pages + '/', '');
        key = key.replace(/\.(coffee|js|jsx)$/, '');
        if (key.match(/video\//))
        {

        }
        else if (key.indexOf('test/') >= 0)
        {
          entry.test[key] = './' + filepath;
        }
        else
        {
          entry.main[key] = './' + filepath;
        }
      }
    }
    return entry;
  })();
  
  config['script:main'] = {
    src: env.pages,
    dest: env.useBuildVer ? env.dest + '/' + env.buildVer : env.dest,
    uglify: !debug,
    webpack: {
      cache: debug,
      debug: debug,
      entry: entry.main,
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      module: {
        preLoaders: [
          { loader: 'eslint-loader', test: /\.js[x]?$/, exclude: /(node_modules)/ },
          { loader: 'pug-loader', test: /\.pug$/, exclude: /(node_modules)/ }
        ],
        loaders: [
          { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel' },
          { test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
          { test: /\.(frag|vert|txt)$/, exclude: /node_modules/, loader: 'raw-loader' }
        ]
      },
      externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    }
  };

};