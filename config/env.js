const DEVELOP_STATE = 'develop';
const RELEASE_STATE = 'release';
const STAGING_STATE = 'staging';
const EXTRA_STATE   = 'extra';

module.exports = function(config, argv, path)
{
  const __state   = argv.options.state;
  const __release = argv.options.release;
  const __staging = argv.options.staging;
  const __extra   = argv.options.extra;
  const __local   = argv.options.local;
  const __develop = argv.options.develop;
  const __archive = argv.options.archive;
  const __debug   = argv.options.debug;
  
  let buildNumber = 1;
  if (__release)
  {
    buildNumber = 201709020000;
  }
  
  const buildVersion = __release ? 'r' + buildNumber
                   : __staging ? 's' + buildNumber
                   : __archive ? 'a' + buildNumber
                   : __extra   ? 'x' + buildNumber
                   :             'd' + buildNumber;
  
  const env = {
    __state  :  __state,
    __release:  __release,
    __staging:  __staging,
    __archive:  __archive,
    __develop:  __develop,
    __extra:    __extra,
    __local:    __local,
    debug:      __debug,
    
    // ファイルをバージョン別に分けるときはこの値のディレクトリを作成
    buildVer:   buildVersion,
    useBuildVer:true,
    src:        'workspace/src',
    pages:      'workspace/src/pages',
    libs:       'workspace/src/libs',
    components: 'workspace/src/components',
    contents:   'workspace/src/contents',
    static:     'workspace/src/static',
    assets:     'workspace/src/static/assets',
    command:    'workspace/src/command',
    data:       'workspace/data',
    tmp:        'workspace/.tmp',
    dest:       'workspace/build',
    api :       'workspace/api',
    deploy:     'workspace/deploy',
    test:       'workspace/test',
    path: '',
    cache: '.cache',
    default_use_html: '.pug',
    default_use_script: '.js',
    default_use_style: '.styl'
  };

  config.env = env;
  config.template = {
    page      : 'gulp/template/page/**/*',
    component : 'gulp/template/comp/**/*',
    libs      : 'gulp/template/libs/**/*',
    static    : 'gulp/template/static',
    settings  : 'gulp/template/settings',
    test      : 'gulp/template/test'
  };
};


function datetime()
{
  const date = new Date();
  let y,m,d,h,f;
  y = date.getFullYear();
  m = (m=date.getMonth()+1) < 10 ? '0'+m : m;
  d = (d=date.getDate()) < 10 ? '0'+d : d;
  h = (h=date.getHours()) < 10 ? '0'+h : h;
  f = (f=date.getMinutes()) < 10 ? '0'+f : f;
  return y + m + d + h + f;
}
