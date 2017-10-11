function getSheetId(url)
{
  var urlParams = url.replace('https://docs.google.com/spreadsheets/d/', '').split('/');
  var fileId = urlParams[0];
  var sheetId = gid_to_wid(urlParams[1].match(/gid=([^&]+)/)[1] || 0);
  return {
    file: fileId,
    sheet: sheetId
  };
}

function gid_to_wid(gid) {
  var xorval = gid > 31578 ? 474 : 31578;
  var letter = gid > 31578 ? 'o' : '';
  return letter + parseInt((gid ^ xorval)).toString(36);
}

module.exports = getSheetId;
