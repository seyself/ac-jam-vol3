const THREE = window.THREE;

export default class World3D
{
  constructor(containerSelector, options)
  {
    if (!options) options = {};
    this.options = options;
    this.containerSelector = containerSelector;
    this.container = null;
    this.camera = null;
    this.controls = null;
    this.scene  = null;
    this.renderer = null;
    this.stats = null;
    this.speed = 8;
    this.devicePixelRatio = options.pixelRatio || window.devicePixelRatio;
    this.width = options.width || window.innerWidth;
    this.height = options.height || window.innerHeight;

    this.setup(options);
  }

  setup(options)
  {
    this.setupContainer();
    this.setupScene();
    this.setupRenderer();
    this.setupCamera();
    this.setupControl();
    this.setupLight();
    if (options.stats)
    {
      this.setupStats();
    }
    if (!options.fixed)
    {
      this.setupResizeEvent();
    }
  }

  setupContainer()
  {
    this.container = document.querySelector(this.containerSelector);
  }

  setupScene()
  {
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
  }

  setupRenderer()
  {
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    // this.renderer.setClearColor(0xffffff, 1);
    // this.renderer.setClearColor( this.scene.fog.color );
    this.renderer.setPixelRatio( this.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    this.container.appendChild( this.renderer.domElement );
  }

  setupCamera()
  {
    const fov = 60;
    this.camera = new THREE.PerspectiveCamera( fov, this.width / this.height, 1, 100000 );
    this.camera.position.z = 1150;
    this.camera.lookAt(new THREE.Vector3(0,0,0));
  }

  setupControl()
  {
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.addEventListener( 'change', _=> this.render() ); // remove when using animation loop
    // enable animation loop when using damping or autorotation
    //this.controls.enableDamping = true;
    //this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
  }

  setupLight()
  {
    // let light1 = new THREE.DirectionalLight( 0xffffff );
    // light1.position.set( 1, 1, 1 );
    // this.scene.add( light1 );
    //
    // let light2 = new THREE.DirectionalLight( 0x002288 );
    // light2.position.set( -1, -1, -1 );
    // this.scene.add( light2 );

    let light3 = new THREE.AmbientLight( 0xffffff );
    this.scene.add( light3 );
  }

  setupStats()
  {
    this.stats = new window.Stats();
    this.container.appendChild( this.stats.dom );
  }

  setupResizeEvent()
  {
    window.addEventListener( 'resize', _=> this.onWindowResize(), false );
  }

  onWindowResize()
  {
    this.resize(window.innerWidth, window.innerHeight);
  }

  resize(width, height)
  {
    this.width = width || window.innerWidth;
    this.height = height || window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.width, this.height );
  }

  update()
  {
    // requestAnimationFrame( ()=>{ this.update(); } );
    // this.camera.rotation.y -= 0.001;
    // this.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    if (this.stats) this.stats.update();
    this.render();
  }

  render()
  {
    this.renderer.render( this.scene, this.camera );
  }

}