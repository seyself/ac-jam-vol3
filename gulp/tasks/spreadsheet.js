module.exports = function(gulp, config, argv)
{
  gulp.task('spreadsheet', function(done) {
    var path = require('path');
    var sheets = config.spreadsheet.sheets;
    var credential = require( path.join("../../", config.spreadsheet.credential) );
    var getSheetId = require('../libs/parse_spreadsheet_url');
    var loadSpreadSheet = require('../libs/load_spreadsheet');
    var total = sheets.length;
    var count = 0;
    for(var i=0; i<total; i++)
    {
      var params = sheets[i];
      params.id = getSheetId(params.url);
      loadSpreadSheet(credential, params, onComplete);
    }

    function onComplete(err)
    {
      count++;
      if (count === total)
      {
        done();
      }
    }

  });
};
