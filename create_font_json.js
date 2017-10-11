var FONT_DIR = './workspace/fonts/';
var JSON_FILE = './workspace/data/font.json';



var sizeOf = require('image-size');
var fs = require('fs');
var data = {};

fs.readdir(FONT_DIR, function(error, files){
  var items = files
    .filter(function(file){
      return file.match(/\.png$/);
    }).map(function(file){
      return file.replace('.png', '');
    })
  items.forEach(function(code, index) {
    var filepath = FONT_DIR + code + '.png';
    var dimensions = sizeOf(filepath);
    data[code] = [dimensions.width, dimensions.height];
  });
  exportJSON();
})

function exportJSON()
{
  fs.writeFileSync(JSON_FILE, JSON.stringify(data), 'utf8');
}

