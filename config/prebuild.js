module.exports = function(config, argv, path)
{
  const core = [
    'workspace/src/libs/config.js',
    'workspace/src/libs/init.js',
    'workspace/src/components/canvas/_colormap.js'
  ];

  const react = [
    'node_modules/react/dist/react.min.js',
    'node_modules/react-dom/dist/react-dom.min.js'
  ];

  const jquery = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-scrollify/jquery.scrollify.min.js',
    'node_modules/velocity-animate/velocity.min.js',
    'node_modules/fastclick/lib/fastclick.js'
  ];

  const libs = [
    'node_modules/es6-promise/dist/es6-promise.min.js',
    'node_modules/@hughsk/fulltilt/dist/fulltilt.min.js',
    'node_modules/gyronorm/dist/gyronorm.min.js',
    'workspace/src/libs/createjs/preloadjs-0.6.2.min.js',
    'workspace/src/libs/createjs/easeljs-0.8.2.min.js',
    'node_modules/gsap/src/minified/TweenMax.min.js'
  ];

  const libs2 = [
    'workspace/src/libs/thirdparty/vue.min.js',
    'workspace/src/libs/thirdparty/moment.min.js',
    'workspace/src/libs/thirdparty/core-min.js',
    'workspace/src/libs/thirdparty/hmac-min.js',
    'workspace/src/libs/thirdparty/sha256-min.js',
    'workspace/src/libs/thirdparty/mqttws31.min.js',
    'workspace/src/libs/thirdparty/createjs-2015.11.26.min.js'
  ];

  const three = [
    'node_modules/three/build/three.min.js',
    'node_modules/three/examples/js/controls/OrbitControls.js',
    'node_modules/three/examples/js/Detector.js',
    'node_modules/three/examples/js/libs/stats.min.js'
  ];



  const env = config.env;
  config.prebuild = [
    {
      src: core.concat(jquery, libs, libs2, three),
      dest: env.useBuildVer ? path.join(env.dest, env.buildVer, 'js') : path.join(env.dest,'js'),
      file: 'libs.js'
    }
  ];
};
