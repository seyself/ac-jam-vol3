import 'babel-polyfill';
import 'request-animation-frame-polyfill';
import EventEmitter from 'eventemitter3';
import UAParser from 'browser/UAParser';
import Storage from 'browser/Storage';
import env from 'env';
import Entry from 'Entry';

window.globalEvent = new EventEmitter();
window.device = new UAParser();
window.storage = new Storage();

$(()=>{
  window.FastClick.attach(document.body);

  let main = new Entry();
  
});
