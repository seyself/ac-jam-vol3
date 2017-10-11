import TextChar from './TextChar';

const FontMap = require('../../../data/font.json');
const THREE = window.THREE;
const tween = window.TweenMax.to;

export default class Text
{
  constructor(text, scale=1, map=null)
  {
    this.view = new THREE.Object3D();
    this.text = text;
    this.map = map;
    this.scale = scale * 0.9 + 0.1;
    this.list = [];
    if (text)
    {
      this.setText(text);
    }

  }


  setText(text)
  {
    this.text = text;
    // this.view.rotation.z = Math.random() - 0.5;

    let len = text.length;
    let width = 0;
    let height = 0;
    let spacing = 10;
    for(let i=0;i<len;i++)
    {
      let str = text.charAt(i);
      let code = String(str.charCodeAt(0));
      let size = FontMap[code];
      if(size)
      {
        let char = new TextChar(str, code, size);
        this.list.push(char);
        this.view.add(char.view);
        char.view.position.x = width;
        // char.view.rotation.z = (Math.random() * 0.5 - 0.25) * 0.1;
        char.view.scale.x = 0.01;
        char.view.scale.y = 0.01;
        char.ts = Math.random() * 0.3 + 0.85;
        width += (size[0] + spacing) * this.scale;
        if (height < size[1])
        {
          height = size[1];
        }
      }
    }
    let t_delay = Math.random();
    let offsetX = -width / 2;
    len = this.list.length;
    let interval = 0.35 / len;
    let count = 0;
    let total = len;
    if (interval < 0.03) interval = 0.03;
    let totalDelay = 0;
    let time = 0.35;
    for(let i=0;i<len;i++)
    {
      let char = this.list[i];
      char.view.position.x += offsetX;

      let delay = interval * i + t_delay;
      let ts = char.ts * this.scale;
      let ts2 = ts * 0.94;
      let tr = char.view.rotation.z;
      let sr = tr;
      if (sr > 0)
      {
        sr += Math.random() * 0.25;
      }
      else
      {
        sr -= Math.random() * 0.25;
      }
      char.view.rotation.z = sr;
      tween(char.view.scale, time, {delay:delay, x:ts, y:ts, ease:window.Back.easeOut});
      tween(char.view.scale, 1.3, {delay:delay+time, x:ts2, y:ts2, ease:window.Linear.ease});
      // tween(char.view.rotation, time*2+1.3, {delay:delay, z:tr, ease:window.Linear.ease});
      let pt = this.getPos();
      tween(char.view.position, time, {delay:delay+1.3, x:pt.x, y:pt.y, z:0, ease:window.Back.easeIn});
      tween(char.view.scale, time, {delay:delay+1.3, x:0.3, y:0.3, ease:window.Back.easeIn, onComplete:()=>{
        count++;
        if (count == total)
        {
          this._allComplete();
        }
      }});
      totalDelay = delay;
      tween(this.view.position, time, {delay:totalDelay+1.3, x:0, y:0, ease:window.Back.easeIn});
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
      let scale = 8;
      return {x: (x - this.map.w/2) * scale, y: -(y - this.map.h/2) * scale};
    }
    return this.getPos();
  }


  _allComplete()
  {
    // window.globalEvent.emit('removeText', this);
  }
}