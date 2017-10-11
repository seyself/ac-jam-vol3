export default class Cookie
{
  static clear(){
    document.cookie = 'tpdata=' + encodeURIComponent(JSON.stringify({})) + '; path=/; expires=' + new Date('2046/12/31 23:59:59').toUTCString();
  }

  static saveJSON(json, session){
    if (session)
    {
      var date = new Date(new Date().getTime() + 1800000);
      document.cookie = 'tpdata=' + encodeURIComponent(JSON.stringify(json)) + '; path=/; expires=' + date.toUTCString();
    }
    else
    {
      document.cookie = 'tpdata=' + encodeURIComponent(JSON.stringify(json)) + '; path=/; expires=' + new Date('2046/12/31 23:59:59').toUTCString();
    }
  }

  static parseJSON(){
    var _data = document.cookie;
    if (!_data) return {};
    var json = _data.match(/tpdata=([^;]+)/);
    if(json && json[1])
    {
      return JSON.parse(decodeURIComponent(json[1])) || {};
    }
    return {};
  }
}
