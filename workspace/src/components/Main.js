
import Polling from 'loader/Polling';
import SocketParams from './SocketParams';
import Contents3D from './Contents3D';
import Text from './contents3d/Text';
import SocketClient from './socket/SocketClient';
import ColorMap from './canvas/ColorMap';

const THREE = window.THREE;
const AUTO_BOT = false;

export default class IndexMain extends Contents3D
{
  constructor()
  {
    super();

    this.start();
  }

  
  init()
  {
    this.frame = 0;
    this.history = [];

    this.initTex();
    this.init3d();
  }

  initTex()
  {
    this.map = new ColorMap();

  }

  init3d()
  {
    this.dict = {};

    this.space = new THREE.Object3D();
    this.world.scene.add(this.space);
    this.background.view.position.z = 0;

    window.globalEvent.on('removeText', (text)=>{
      this.space.remove(text.view);
      this.dict[text.id] = null;
    });

    try 
    {
      this.socket = new SocketClient(new SocketParams());
      this.socket.on('ready', ()=>{
        console.log('ready');
      });
      this.socket.on('error', (error)=>{
        console.log('error', error);
      });
      this.socket.on('message', (message)=>{
        console.log('message', message);
        let data = {id:message.id, 'text':message.text, value:1};
        this.history.push(data);
        this.addTextItems([data]);
      });
      this.socket.connect();
    }
    catch(e) 
    {
      console.log(e);
    }
    

    $('button.test1').on('click', ()=>{
      this.autoBotStart();
    });

  }


  addTextItems(list)
  {
    let len = list.length;
    for(let i=0;i<len;i++)
    {
      let item = list[i];
      let text = new Text(item.text, item.value, this.map);
      text.id = item.id;
      this.space.add(text.view);
      text.view.position.x = Math.random() * this.windowWidth - this.windowWidth / 2;
      text.view.position.y = Math.random() * this.windowHeight - this.windowHeight / 2;
      this.dict[item.id] = text;
    }
  }

  getPos()
  {
    let len = this.map.len;
    let y = Math.floor(Math.random() * this.map.h);
    let x = Math.floor(Math.random() * this.map.w);
    let i = x + y * this.map.w;
    if (this.map.map[i] == 1)
    {
      let scale = 20;
      return {x: (x - this.map.w/2) * scale, y: (y - this.map.h/2) * scale};
    }
    return this.getPos();
  }


  resize()
  {
  }

  autoBotStart()
  {
    this.auto = !this.auto;
    $.ajax({
      url: window.assetPath('/json/message.json'),
      type: 'get',
      dataType: 'json'
    }).done((data)=>{
      this.history = data;
    });
  }


  update()
  {
    if (this.auto)
    {
      let len = this.history.length;
      let i = Math.floor(Math.random() * len);
      let data = this.history[i];
      if (data)
      {
        this.addTextItems([data]);
      }
    }

    this.world.update();
  }

}