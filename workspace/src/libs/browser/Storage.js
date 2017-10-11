import Cookie from './Cookie';

export default class Storage
{
  constructor(logger)
  {
    this._L = logger;
    this.useSessionStorage = false;
    this.useLocalStorage = true;
    this.useCookie = true;
    this._tmp = {};
  }

  clear()
  {
    if (this._L) this._L.log('[[ CLEAR ]]');
    this._tmp = {};
    
    try {
      if (this.availableSessionStorage())
      {
        sessionStorage.clear();
      }
    } catch(e) {
      // logger.log(e);
    }

    try {
      if (this.availableLocalStorage())
      {
        localStorage.clear();
      }
    } catch(e) {
      // logger.log(e);
    }

    if (this.useCookie)
    {
      try {
        Cookie.clear();
      } catch(e) {
        // logger.log(e);
      }
    }
  }

  get(key)
  {
    try {
      if (this.availableSessionStorage())
      {
        let json = sessionStorage.getItem(key);
        if (json)
        {
          let jsonData = JSON.parse(json);
          if (this._L) this._L.log('[[ GET ]] ' + key + ' >>', jsonData.value);
          return jsonData.value;
        }
      }
      if (this.availableLocalStorage())
      {
        let json = localStorage.getItem(key);
        if (json)
        {
          var jsonData = JSON.parse(json);
          if (this._L) this._L.log('[[ GET ]] ' + key + ' >>', jsonData.value);
          return jsonData.value;
        }
        return null;
      }
    } catch(e) {
      // logger.log(e);
    }

    if (this.useCookie)
    {
      try {
        let json = Cookie.parseJSON();
        if (this._L) this._L.log('[[ GET ]] ' + key + ' >>', json[key]);
        return json[key];
      } catch(e) {
        // logger.log(e);
      }
    }
    if (this._L) this._L.log('[[ GET ]] ' + key + ' >>', (this._tmp[key] || null));
    return this._tmp[key] || null;
  }

  set(key, value, session=false)
  {
    if (this._L) this._L.log('[[ SET ]] ' + key + ' >>', value);
    this._tmp[key] = value;
    
    try {
      if (session)
      {
        if (this.availableSessionStorage())
        {
          sessionStorage.setItem(key, JSON.stringify({value:value}));
          return;
        }
      }
      else
      {
        if (this.availableLocalStorage())
        {
          localStorage.setItem(key, JSON.stringify({value:value}));
          return;
        }
      }
    } catch(e) {
      // logger.log(e);
    }

    if (this.useCookie)
    {
      try {
        var json = Cookie.parseJSON();
        json[key] = value;
        Cookie.saveJSON(json, session);
      } catch(e) {
        // logger.log(e);
      }
    }
  }

  availableLocalStorage()
  {
    if (this.useLocalStorage && ('localStorage' in window) && window['localStorage'] !== null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  availableSessionStorage()
  {
    if (this.useSessionStorage && ('sessionStorage' in window) && window['sessionStorage'] !== null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}

