import EventEmitter from 'eventemitter3';

export default class Polling extends EventEmitter
{
  constructor(url, interval=15000)
  {
    super();
    this.url = url;
    this.interval = interval;
    this.isRunning = false;
    this._timer = 0;
  }

  start()
  {
    this.isRunning = true;
    this.load();
  }

  stop()
  {
    this.isRunning = false;
    clearTimeout(this._timer);
  }

  load()
  {
    clearTimeout(this._timer);
    $.ajax({
      url: this.url,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: (data)=>{
        if (this.isRunning)
        {
          this.emit('load', data);
          this.next();
        }
      },
      error: (xhr, error)=>{
        this.emit('error', 'Polling : load error');
      }
    });
  }

  next()
  {
    if (!this.isRunning) return;

    this._timer = setTimeout(()=>{
      if (this.isRunning)
      {
        this.load();
      }
    }, this.interval);
  }

}
