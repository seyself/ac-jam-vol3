var webpack = require("webpack");
var current = process.cwd();
var path = require('path');
var target = path.join(current, '../www');

module.exports = function(config, options, useJQuery)
{
  var params = {
    entry: {},
    output: {
      filename: '[name].js',
      publicPath: '/js/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      root: [
        // path.join(current, 'bower_components'),
        // path.join(current, 'node_modules'),
        path.join(current, config.env.components),
        path.join(current, config.env.libs),
        path.join(current, config.env.pages)
      ]
    },
    cache: false,
    debug: false,
    devtool: false,
    stats: {
      colors: true,
      reasons: false
    },
    eslint: {
      configFile: './.eslintrc.json'
    },
    plugins: [
      // new webpack.ResolverPlugin(
      //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      // ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json' }
      ]
    }
  };
  if (options.uglify)
  {
    params.plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }));
    params.plugins.push(new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}}));
  }
  if (useJQuery)
  {
    params.plugins.push(
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
      })
    );
  }
  return params;
};