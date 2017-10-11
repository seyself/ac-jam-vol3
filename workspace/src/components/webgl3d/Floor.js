
const THREE = window.THREE;

export default class Floor
{
  constructor()
  {
    this.view = new THREE.Object3D();
    // let loader = new THREE.TextureLoader();
    // loader.load(window.assetPath('/images/text.png'), (texture)=>{
    //   this.textrue = texture;
    //   this.material = new THREE.MeshPhongMaterial({color:0xffffff, transparent:true, map:texture});
    //   this.geometry = new THREE.PlaneGeometry(2000, 1000, 1, 1);
    //   this.mesh = new THREE.Mesh(this.geometry, this.material);
    //   this.view.add(this.mesh);
    // });
  }

}
