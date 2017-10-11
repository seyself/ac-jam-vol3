
import World3D from './webgl3d/World3D';
import Floor from './webgl3d/Floor';
import Background from './webgl3d/Background';

export default class Contents3D
{
  constructor()
  {
    this.world = new World3D('#screen', {stats:false, fixed:false});
    this.floor = new Floor();
    this.background = new Background();
    this.world.scene.add(this.floor.view);
    this.world.scene.add(this.background.view);

    this._init();
    this.init();
  }

  
  init()
  {

  }

  start()
  {
    this._renderUpdate();
  }

  resize()
  {
    // this.world.resize(this.windowWidth, this.windowHeight);
  }

  update()
  {
    this.world.update();
  }

  load(url)
  {
    return new Promise((resolve, reject)=>{
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: (data)=>{
          resolve(data);
        },
        error: (xhr, error)=>{
          reject({error:'load error'});
        }
      });
    });
  }

  _init()
  {
    this.$window = $(window);
    this.$window.on('resize', ()=>{
      this._resize();
    });
    this._resize();
  }

  _resize()
  {
    this.windowWidth = this.$window.width();
    this.windowHeight = this.$window.height();
    this.resize();
  }

  _renderUpdate()
  {
    requestAnimationFrame(_ => this._renderUpdate());
    this.update();
  }


}