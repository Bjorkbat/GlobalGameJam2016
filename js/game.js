/**
 * JS for main game file
 * * * * */

var Game = {

  create: function() {

    Game.initPointerLock();

    this.scene = new THREE.Scene();

    var aspect = window.innerWidth / window.innerHeight;
    var d = 20;
    this.camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      -500,
      1000
    );

    this.camera.position.x = 200;
    this.camera.position.y = 200;
    this.camera.position.z = 200;
    this.camera.zoom = 0.5;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor(0x000000, 1);
    document.body.appendChild( this.renderer.domElement );

    // Let there be light
    var ambientLight = new THREE.AmbientLight(0x888888);
    this.scene.add(ambientLight);

    var directLight = new THREE.DirectionalLight(0xffffff, 0.30);
    directLight.position.set(0, 1, 0);
    this.scene.add(directLight);

    // Add the ground
    this.ground = new Game.Ground();
    this.ground.addRing();
    this.ground.addRing();
    for(var i = 0; i < this.ground.cylinders.length; i ++) {
      this.scene.add(this.ground.cylinders[i]);
    }

    // Add the wells
    this.wells = new Game.Wells();
    this.wells.makeWells();
    this.scene.add(this.wells.wellGroup);

    // Add the altar
    this.altar = new Game.Altar();
    this.scene.add(this.altar.altar);

    // Add our tetrominos
    this.tetrominos = [];
    this.tetrominos.push(new Game.Tetromino("i"));
    this.tetrominos.push(new Game.Tetromino("o"));
    this.tetrominos.push(new Game.Tetromino("t"));
    this.tetrominos.push(new Game.Tetromino("j"));
    this.tetrominos.push(new Game.Tetromino("l"));
    this.tetrominos.push(new Game.Tetromino("s"));
    this.tetrominos.push(new Game.Tetromino("z"));

    this.altar.addTetrominos(this.tetrominos);
    for(var i = 0; i < this.tetrominos.length; i ++) {
      this.scene.add(this.tetrominos[i].tetromino);
    }

    // Add player character
    this.player = new Game.Player();
    this.player.translateY(5);
    this.player.translateX(35);
    this.scene.add(this.player)

    this.render();
  },

  render: function() {
    requestAnimationFrame(Game.render);
    var flip = 1;
    for(var i = 1; i < Game.ground.cylinders.length; i ++) {
      Game.ground.cylinders[i].rotation.y += 0.002 * flip;
      flip *= -1;
    }

    // Rotate wells as well
    Game.wells.wellGroup.rotation.y += (0.002 * flip * -1);
    Game.renderer.render(Game.scene, Game.camera);
  },

  initPointerLock: function() {
    var havePointerLock = 'pointerLockElement' in document ||
    	'webkitPointerLockElement' in document;

    if(havePointerLock) {

    	var element = document.body;

    	var pointerLockChange = function(event) {

  			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
  				controls.enabled = true;
  				console.log(controls.enabled);
  			}
  			else {
  				controls.enabled = false;
  			}
    	}

    	document.addEventListener('pointerlockchange', pointerLockChange, false);
    	document.addEventListener('webkitpointerlockchange', pointerLockChange, false);

    	document.addEventListener('click', function(event) {

    		element.requestPointerLock = element.requestPointerLock || element.webkitRequestPointerLock;
    		element.requestPointerLock();

    	});
    }
  }
}

// If the window size changes, make sure the aspect ratio and such change as
// well
function onWindowResize() {
	Game.camera.aspect = window.innerWidth / window.innerHeight;
	Game.camera.updateProjectionMatrix();

	Game.renderer.setSize(window.innerWidth, window.innerHeight);
}
// Won't be much good if we don't add the listener
window.addEventListener('resize', onWindowResize, false);
