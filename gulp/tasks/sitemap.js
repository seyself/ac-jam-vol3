module.exports = function(gulp, config, argv)
{
  var fs = require('fs');
  gulp.task('sitemap', function(done) {
    
    var siteMapConf = config.sitemap;
    var siteDataConf = config.data['default'];
    var sitemap = '';
    sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
    
    var baseURL = siteDataConf.ogp.url;
    var len = siteMapConf.length;
    for (let i=0; i<len; i++)
    {
      var data = siteMapConf[i];
      sitemap += '  <url>\n';
      sitemap += '    <loc>' + baseURL + data.url + '</loc>\n';
      if (data.lastmod)
      {
        sitemap += '    <lastmod>' + data.lastmod + '</lastmod>\n';
      }
      if (data.image && data.image.length > 0)
      {
        var imgLen = data.image.length;
        for (let j=0; j<imgLen; j++)
        {
          var image = data.image[j];
          if (!image) continue;
          sitemap += '    <image:image>\n';
          sitemap += '      <image:loc>' + baseURL + image.url + '</image:loc>\n';
          sitemap += '      <image:caption>' + image.caption + '</image:caption>\n';
          sitemap += '    </image:image>\n';
        }
      }
      if (data.video && data.video.length > 0)
      {
        var videoLen = data.video.length;
        for (let j=0; j<videoLen; j++)
        {
          var video = data.video[j];
          if (!video) continue;
          sitemap += '    <video:video>\n';
          sitemap += '      <video:content_loc>' + baseURL + video.url + '</video:content_loc>\n';
          sitemap += '      <video:player_loc allow_embed="yes" autoplay="ap=1">' + baseURL + video.player + '</video:player_loc>\n';
          sitemap += '      <video:thumbnail_loc>' + baseURL + video.thumb + '</video:thumbnail_loc>\n';
          sitemap += '      <video:title>' + video.title + '</video:title>\n';
          sitemap += '      <video:description>' + video.description + '</video:description>\n';
          sitemap += '    </video:video>\n';
        }
      }
      sitemap += '  </url>\n';
    }
  
    sitemap += '</urlset>\n';
    
    fs.writeFileSync(config.env.static + '/sitemap_location.xml', sitemap, 'utf8');
    
    var robots = 'Sitemap: ' + baseURL + '/sitemap_location.xml\n';
    if (!argv.options.release)
    {
      robots += 'User-agent: Twitterbot\n';
      robots += 'Disallow:\n';
      robots += 'User-agent: *\n';
      robots += 'Disallow: /\n';
    }
    fs.writeFileSync(config.env.static + '/robots.txt', robots, 'utf8');
  
    done();
  });
};
