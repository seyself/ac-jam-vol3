import _uaparser from 'ua-parser-js';

export default class UAParser
{
  constructor(ua=null)
  {
    this.win = null;
    this.mac = null;
    this.android = null;
    this.ios = null;
    this.other = null;

    this.chrome = null;
    this.firefox = null;
    this.ie = null;
    this.edge = null;
    this.safari = null;

    this.mobile = false;
    this.pc = false;

    this.facebookBrowser = null;
    this.twitterBrowser = null;
    this.lineBrowser = null;

    this.data = null;

    try
    {
      this.parse(ua);
    }
    catch(e)
    {
      this.other = '1';
    }
  }

  parse(ua=null)
  {
    let parser = new _uaparser();
    if(ua)
    {
      parser.setUA(ua);
    }
    let data = parser.getResult();
    let browser = String(data.browser.name).toLowerCase();
    let browser_version = String(data.browser.major || 0);
    let os = String(data.os.name).toLowerCase();
    let os_version = String(data.os.version || 0);

    let browser_version_num = 0;
    let os_version_num = 0;
    try
    {
      browser_version_num = Number(browser_version.match(/[0-9]+(\.[0-9]+)?/)[0]);
      os_version_num = Number(os_version.match(/[0-9]+(\.[0-9]+)?/)[0]);
    }
    catch(e)
    {
      // console.log(e);
    }

    this.ua = ua || window.navigator.userAgent;
    this.data = data;

    this.osVersionNum = os_version_num;
    this.browserVersionNum = browser_version_num;

    this._setOS(os, os_version, os_version_num);
    this._setBrowser(browser, browser_version, browser_version_num);
    this._setDeviceType((ua || window.navigator.userAgent || '').toLowerCase());

    this._setAppBrowser();
  }

  _setAppBrowser()
  {
    let ua = this.ua;
    let matches = null;
    if ((matches = ua.match(/\s(Line)\/([\d\.]+)/)))
    {
      this.lineBrowser = matches[2];
    }
    if ((matches = ua.match(/;FBAV\/([\d\.]+)/)))
    {
      this.facebookBrowser = matches[1];
    }
    if ((matches = ua.match(/Twitter.+/)))
    {
      this.twitterBrowser = matches[0];
    }
  }

  _setOS(os, version)
  {
    if (os.indexOf('windows') >= 0)
    {
      this.win = version;
      $('html').addClass('win win_'+version);
    }
    else if (os.indexOf('mac') >= 0)
    {
      this.mac = version;
      $('html').addClass('mac mac_'+version);
    }
    else if (os.indexOf('ios') >= 0)
    {
      this.ios = version;
      $('html').addClass('ios ios_'+version);
    }
    else if (os.indexOf('android') >= 0)
    {
      this.android = version;
      $('html').addClass('android android_'+version);
    }
    else
    {
      this.other = true;
    }
  }

  _setBrowser(browser, version)
  {
    if (browser.indexOf('chrome') >= 0)
    {
      this.chrome = version;
      $('html').addClass('chrome chrome_'+version);
    }
    else if (browser.indexOf('firefox') >= 0)
    {
      this.firefox = version;
      $('html').addClass('firefox firefox_'+version);
    }
    else if (browser.indexOf('edge') >= 0)
    {
      this.edge = version;
      $('html').addClass('edge edge_'+version);
    }
    else if (browser.indexOf('ie') >= 0)
    {
      this.ie = version;
      $('html').addClass('ie ie_'+version);
    }
    else if (browser.indexOf('safari') >= 0)
    {
      this.safari = version;
      $('html').addClass('safari safari_'+version);
    }
    else
    {
      this.other = version;
      $('html').addClass('other other_'+version);
    }
  }

  _setDeviceType(u)
  {
    var _ua = {
      ios: u.indexOf('iphone') != -1 || u.indexOf('ipod') != -1 || u.indexOf('ipad') != -1,
      android: u.indexOf('android') != -1 && u.indexOf('mobile') != -1,
      mobile: (u.indexOf('windows') != -1 && u.indexOf('phone') != -1) || u.indexOf('iphone') != -1 || u.indexOf('ipod') != -1 || (u.indexOf('android') != -1 && u.indexOf('mobile') != -1) || (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1) || u.indexOf('blackberry') != -1,
      tablet: (u.indexOf('windows') != -1 && u.indexOf('touch') != -1 && u.indexOf('tablet pc') == -1) || u.indexOf('ipad') != -1 || (u.indexOf('android') != -1 && u.indexOf('mobile') == -1) || (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1) || u.indexOf('kindle') != -1 || u.indexOf('silk') != -1 || u.indexOf('playbook') != -1
    };
    _ua.pc = !_ua.mobile && !_ua.tablet;
    var $html = $('html');
    if (_ua.pc)
    {
      if (!$html.hasClass('pc'))
        $html.addClass('pc');
      this.pc = true;
    }
    else
    {
      if (!$html.hasClass('mobile'))
        $html.addClass('mobile');
      this.mobile = true;
    }
    this.setViewport();
    //if (_ua.ios && !$html.hasClass('ios')) $html.addClass('ios');
    //if (_ua.android && !$html.hasClass('android')) $html.addClass('android');
    //if (_ua.mobile && !$html.hasClass('mobile')) $html.addClass('mobile');
    //if (_ua.tablet && !$html.hasClass('tablet')) $html.addClass('tablet');
  }

  setViewport()
  {
    if (this.pc)
    {
      //$('meta[name=viewport]').attr('content', 'width=device-width');
    }
  }

}