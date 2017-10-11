module.exports = function(config, argv, path)
{
  var env = config.env;
  config.spreadsheet = {
    credential: 'credentials/googledrive.json',
    sheets: [
      {
        name: 'en',
        url: 'https://docs.google.com/spreadsheets/d/{FILE_ID}/edit#gid={SHEET_ID}',
        dest: 'workspace/data/sheet.json'
      }
    ]
  };
};