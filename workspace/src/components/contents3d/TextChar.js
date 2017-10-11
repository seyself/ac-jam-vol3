
const THREE = window.THREE;



export default class TextChar
{
  constructor(char, charCode, size)
  {
    this.view = new THREE.Object3D();
    this.char = char;
    this.charCode = charCode;
    this.width = size[0];
    this.height = size[1];

    if (!window.textures) window.textures = {};

    if (window.textures[charCode])
    {
      this._setContent(window.textures[charCode]);
    }
    else
    {
      let loader = new THREE.TextureLoader();
      loader.load(window.assetPath('/../fonts/' + charCode + '.png'), (texture)=>{
        window.textures[charCode] = texture;
        this._setContent(texture);
      });
    }
  }

  _setContent(texture)
  {
    this.textrue = texture;
    this.material = new THREE.MeshPhongMaterial({color:0xffffff, alphaMap:texture, transparent:true, side:THREE.DoubleSide});
    this.geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.view.add(this.mesh);
  }

}