
import Polling from 'loader/Polling';
import SocketParams from './SocketParams';
import Contents3D from './Contents3D';
import Text from './contents3d/Text';
import SocketClient from './socket/SocketClient';

const THREE = window.THREE;
const AUTO_BOT = false;

export default class Entry
{
  constructor()
  {
    this.init();
  }

  
  init()
  {
    this.sid = String(Math.floor(Math.random() * 1000000)) + '-' + String(Math.floor(Math.random() * 100000000000));
    this.socket = new SocketClient(new SocketParams());
    this.socket.on('ready', ()=>{
      console.log('ready');
      this.onReady();
    });
    this.socket.on('error', (error)=>{
      console.log('error', error);
    });
    this.socket.on('message', (message)=>{
      console.log('message', message);
    });
    this.socket.connect();
  }

  onReady()
  {
    $('button.send').on('click', ()=>{
      let text = $('#entry input.text')[0].value;
      if(text)
      {
        this.socket.emit({id:this.sid, text:text});
      }
    });
  }

  resize()
  {
  }

  update()
  {

  }

  


}