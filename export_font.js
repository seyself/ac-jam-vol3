var DEST = './workspace/fonts/';
var FONT1 = './fonts/NotoSansCJKjp-Black.otf';
var FONT2 = './fonts/NotoSansCJKjp-Black.otf';




var FONT1_SCALE = 0.85;
var FONT2_SCALE = 0.85;
var FONT_SCALE = 0.11;

var ADD_CHARS = ' ';
// var ADD_CHARS = '薔薇会場乾あいう、。「」ABCqjpyh123';

var CODE_CHOICES = [
     [0x0020, 0x007D], // ASCIIコード
     
     // ↓ 記号、日本語フォントも書き出す
     // [0x00A2, 0x00F7], // Latin-1 に含まれる各種記号
     // [0x0391, 0x03C9], // ギリシャ文字
     // [0x0401, 0x0451], // キリル文字
     // [0x2010, 0x2312], // 矢印、科学技術記号など
     // [0x2500, 0x254B], // 罫線
     // [0x25A0, 0x266F], // 図形など
     // [0x3000, 0x301C], // 全角スペース、句読点など
     // [0x3041, 0x3093], // ひらがな
     // [0x309B, 0x309E], // ゛, ゜, ゝ, ゞ
     // [0x30A1, 0x30F6], // カタカナ
     // [0x30FB, 0x30FE], // ・, ー, ヽ, ヾ
     // [0x4E00, 0x9FA0], // 漢字
     // [0xFF01, 0xFF5D], // 全角英数字など
     // [0xFF61, 0xFF9F], // 半角カナ
];

//==========================================================================================

var proc = require('child_process');
var fontkit = require('fontkit');
var fs = require('fs');

var addstr = ADD_CHARS;
var addstr_len = addstr.length;
for(var i=0; i<addstr_len; i++)
{
  var strcode = addstr.charCodeAt(i);
  CODE_CHOICES.push([strcode, strcode]);
}

var SPACE_CODES = [0x0032, 0x3000];
var font1 = fontkit.openSync(FONT1);
var font2 = fontkit.openSync(FONT2);

iterate();

function iterate()
{
  var dict = [];
  var len = CODE_CHOICES.length;
  for(var i=0;i<len;i++)
  {
    console.log(i);
    var range = CODE_CHOICES[i];
    setGlyphs(dict, range[0], range[1]);
  }
  var counter = {
    total: 0,
    max: 100
  };
  for(var i=0;i<counter.max;i++)
  {
    generateIteration(dict, counter);
  }
}

function generateIteration(glyphs, counter)
{
  if (counter.total < counter.max)
  {
    var glyph = glyphs.shift();
    if (glyph)
    {
      counter.total++;
      generateFontImage(glyph, function(){
        counter.total--;
        generateIteration(glyphs, counter);
      });
    }
    else
    {
      if (counter.total == 0)
      {
        console.log('complete');
      }
    }
  }
}

function setGlyphs(dict, start, end)
{
  for(var i=start; i<=end; i++)
  {
    if (i == 8260)
      continue;

    var char = String('\\u' + i.toString(16));
    var char = String.fromCharCode(i);
    var layout = font1.layout(char);
    var glyph = layout.glyphs[0];
    var box = glyph.bbox;
    if (box.minX != Infinity || glyph.codePoints[0] == 32)
    {
      glyph.scale = FONT1_SCALE;
      dict.push(glyph);
    }
    else
    {
      var layout2 = font2.layout(char);
      var glyph2 = layout2.glyphs[0];
      var box2 = glyph2.bbox;
      if (box2.minX != Infinity || glyph2.codePoints[0] == 32)
      {
        glyph2.scale = FONT2_SCALE;
        dict.push(glyph2);
      }
    }
  }
}


function generateFontImage(glyph, cb)
{
  var charPath = glyph.path;
  var pathCode = charPath.toSVG();
  var box = charPath.bbox;
  var fontScale = glyph.scale;
  var fontDescale = 1 / fontScale;
  var scale = FONT_SCALE * fontScale;
  var descale = 1 / scale;
  var maxWidth = Math.ceil(1100 * fontDescale);
  var maxHeight = Math.ceil(1100 * fontDescale);
  var margin = 30 * descale;
  var parceint = Number(scale * 100).toFixed(2) + '%';
  
  if (box.minX == Infinity)
  {
    box = {
      minX: 0,
      minY: 0,
      maxX: 500 * fontDescale,
      maxY: 500 * fontDescale,
    };
  }
  var viewBox = [
      0, 
      0, 
      box.maxX - box.minX + margin * 2, 
      maxHeight
    ].join(' ');
  var pos = [
      -box.minX + margin,
      1000
    ].join(',');

  var codePoint = glyph.codePoints[0];
  var code = '';
  code += '<?xml version="1.0" encoding="utf-8"?>\n';
  code += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" \n';
  code += '   viewBox="' + viewBox + '">\n';
  code += '<g transform="translate(' + pos + ') scale(1,-1)">\n';
  code += '<path d="' + pathCode + '" fill="white"/>\n';
  code += '</g>\n';
  code += '</svg>\n';
  
  var args = ['-background','none', '-resize', parceint, 'svg:', 'png32:' + DEST + codePoint + '.png'];
  var convert = proc.spawn('convert', args);
  convert.stdin.write(code);
  convert.stdin.end();
  convert.on('close', (code) => {
    cb();
  });
}

