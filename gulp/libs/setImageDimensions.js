var cheerio = require("cheerio");
var path = require("path");
var sizeOf = require("image-size");

module.exports = function(base, dest) {
  // console.log(base, dest); // 'workspace/src/pages/', 'workspace/build'
  return function (content, file) {
    return content.replace(/<img [^>]+>/gm, function (code, index, text) {
      var $ = cheerio.load(code);
      var $img = $('img');
      var src = $img.attr('src');
      var alt = $img.attr('alt') || "";
      var width = $img.attr('width');
      var height = $img.attr('height');

      var html_path = path.relative(base, file.history[0]);
      var img_path = src;
      // console.log(html_path);
      if (!img_path) {
        return code;
      }
      else if (img_path.indexOf('/') == 0) {
        img_path = path.join(dest, src);
      }
      else if (img_path.indexOf('http://') == 0 || img_path.indexOf('https://') == 0 || img_path.indexOf('data:image') == 0) {
        //パスを変更しない（そもそも正しく取れるのか試してない、なにもしないほうがいいかも）
        return code;
      }
      else {
        img_path = path.join(path.dirname(html_path), src);
        img_path = path.join(dest, img_path);
      }

      try {
        var dimensions = sizeOf(img_path);
        if (width === undefined) {
          $img.attr('width', dimensions.width);
        }
        if (height === undefined) {
          $img.attr('height', dimensions.height);
        }
        $img.attr('alt', "{{alt_replace}}");
      }
      catch (e) {
        console.log(img_path + ' is not found.');
      }

      var html = $.html();
      html = html.replace("{{alt_replace}}", alt);
      return html;
    });
  }
};