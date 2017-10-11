
const THREE = window.THREE;

export default class Background
{
  constructor()
  {
    this.view = new THREE.Object3D();
    // let loader = new THREE.TextureLoader();
    // loader.load(window.assetPath('/images/bg.jpg'), (texture)=>{
    //   this.textrue = texture;
    //   this.material = new THREE.MeshPhongMaterial({color:0xffffff, map:texture, side:THREE.FrontSide});
    //   this.geometry = new THREE.SphereGeometry(600, 64, 32);
    //   this.mesh = new THREE.Mesh(this.geometry, this.material);
    //   this.view.add(this.mesh);
    // });

    // this.material = new THREE.MeshPhongMaterial({color:0x000000, side:THREE.BackSide});
    // this.material = new THREE.MeshPhongMaterial({color:0x000000, side:THREE.FrontSide});
    // this.geometry = new THREE.SphereGeometry(300, 64, 32);
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.view.add(this.mesh);
  }
}