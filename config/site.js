module.exports = function(config, argv, path)
{
  const env = config.env;
  const switchValue = config.getValue;

  const title = 'example';
  const site_name = 'example';
  const description = 'example';
  const keywords = 'example';
  const host = '';
  const baseDir = '/';

  const version = switchValue({
    default: '1',
    release: '1'
  });

  const option = switchValue({
    default: {
      ga_id: 'UA-XXXXXXXXX-X',
      sns : {
        tweet : 'ツイート',
        line : 'LINEシェア',
        hashtags : '#ハッシュタグ'
      }
    }
  });

  let __host = 'localhost';
  if (config.addr.ipv4[0])
  {
    __host = config.addr.ipv4[0].address;
  }
  // 後ろにスラッシュは付けない
  const api = switchValue({
    default:'http://dev.example.com',
    local:'http://' + __host + ':8002',
    develop:'http://dev.example.com',
    staging:'https://stg.example.com',
    release:'https://www.example.com'
  });

  // 後ろにスラッシュは付けない
  const socket = null;

  // 後ろにスラッシュは付けない
  const url = switchValue({
    default:'http://dev.example.com',
    staging:'https://stg.example.com',
    release:'https://www.example.com'
  });
  
  // 後ろにスラッシュは付けない
  // ディレクトリのみの場合は先頭にスラッシュを付ける
  // CDNが別URLのときは、ここにURLを入れる
  const cdn = switchValue({
    default: env.useBuildVer ? '/' + env.buildVer : ''
  });

  const image = cdn + '/images/common/ogp.png';
  const appid = switchValue({
    default: '',
    release: '',
    staging: ''
  });
  const twitter_account = 'twitter_account';



  //========================================================


  config.site = {
    version: version,
    debug: env.debug,
    url: url,
    cdn: cdn,
    api: api,
    socket: socket,
    baseDir: baseDir
  };
  
  config.jsconf = {
    conf: cdn + '/config.js'
  };
  
  config.data = {};
  config.data['default'] = {
    meta: {
      title: title,
      description: description,
      keywords: keywords
    },
    ogp: {
      url: url,
      title: title,
      site_name: site_name,
      description: description,
      image: image
    },
    fb: {
      app_id: appid
    },
    card: {
      url: url,
      title: title,
      description: description,
      image: image
    },
    icon: {
      favicon: cdn + '/images/common/favicon.ico',
      touch_icon: cdn + '/images/common/apple-touch-icon.png'
    },
    gaid: switchValue({
      develop:'',
      staging:'',
      release:''
    }),
    link: {
      privacy: '',
      terms: '',
      __end__: null
    },
    option: option
  };
  
  config.sitemap = [
    {
      url: '/',
      lastmod: datetime()
    }
  ];
};

function datetime()
{
  let dat = new Date();
  let Y = dat.getFullYear();
  let M = zp(dat.getMonth() + 1);
  let D = zp(dat.getDate());
  let H = zp(dat.getHours());
  let m = zp(dat.getMinutes());
  let s = zp(dat.getSeconds());
  return [Y,M,D].join('-') + 'T' + [H,m,s].join(':') + '+09:00';
}

function zp(num)
{
  if (num < 10) return '0' + num;
  return String(num);
}