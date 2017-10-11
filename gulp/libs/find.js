var fs = require('fs');
var path = require('path');

function find(dir, filter)
{
  var dest = [];
  var files = fs.readdirSync(dir);
  var len = files.length;
  for (let i=0; i<len; i++)
  {
    var file = path.join(dir, files[i]);
    var stat = fs.statSync(file);
    if (stat.isFile())
    {
      if (!filter || file.match(filter))
      {
        dest.push(file);
      }
    }
    if (stat.isDirectory())
    {
      dest = dest.concat(find(file, filter));
    }
  }
  return dest;
}

// var list = find('../', /test/);
// console.log(list);

module.exports = find;
