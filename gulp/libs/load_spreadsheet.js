var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var GoogleSpreadsheet = require('google-spreadsheet');

function loadSpreadSheet(credential, params, callback)
{
  var spreadSheet = new GoogleSpreadsheet( params.id.file );
  spreadSheet.useServiceAccountAuth(credential, function(err){
    if (err) { if (callback) callback(err); return; }

    spreadSheet.getInfo(function(err, sheet_info){
      if (err) { if (callback) callback(err); return; }

      var numSheets = sheet_info.worksheets.length;
      for (var i=0; i<numSheets; i++)
      {
        var sheet = sheet_info.worksheets[i];
        if (sheet.id === params.id.sheet)
        {
          __loadSpreadSheet(params, sheet, callback);
          break;
        }
      }
    });
  });
}

function __loadSpreadSheet(params, sheet, callback)
{
  console.log(sheet.title + ' [' + params.id.sheet + ']');
  sheet.getRows(function(err, rows){
    if (err) { if (callback) callback(err); return; }

    var len = rows.length;
    var table = [];
    var data = {};
    for(var i=0;i<len;i++)
    {
      var item = rows[i];
      var key = item[params.key];
      var value = item[params.value];
      data[key] = value;
    }
    var json = JSON.stringify(data, null, "  ");
    var dir = path.dirname(params.dest);

    exec('mkdir -p ' + dir, function(){
      fs.writeFileSync(params.dest, json, 'utf-8');
      console.log('write', params.dest);
      callback();
    })
  });
}

module.exports = loadSpreadSheet;