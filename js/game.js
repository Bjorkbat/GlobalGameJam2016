/**
 * JS for main game file
 * * * * */

var Game = {

  create: function() {

    //Game.initPointerLock();

    this.blockTypes = ["i", "o", "t", "j", "l", "s", "z"];

    // Create the scene
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

    // Add the clock
    this.clock = new THREE.Clock(true);

    // Create the camera;
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
    for(var i = 0; i < 1; i ++) {
      this.scene.add(this.ground.cylinders[i]);
    }

    // Add an invisible ground plane, for tracking user's mouse
    var groundPlaneGeo = new THREE.PlaneGeometry(500, 500);
    var groundPlaneMat = new THREE.MeshBasicMaterial({visible: false});
    this.groundPlane = new THREE.Mesh(groundPlaneGeo, groundPlaneMat);
    this.groundPlane.rotation.x = -Math.PI / 2;
    this.scene.add(this.groundPlane);

    // Add the wells
    this.wells = new Game.WellCluster();
    this.wells.makeWells();
    this.scene.add(this.wells);

    // Add the altar
    this.altar = new Game.Altar();
    this.scene.add(this.altar.altar);

    // Add our tetrominos
    this.tetrominos = [];
    for(var i = 0; i < this.blockTypes.length; i ++) {
      this.tetrominos.push(new Game.Tetromino(this.blockTypes[i]));
    }
    this.altar.addTetrominos(this.tetrominos);

    // Add player character
    this.player = new Game.Player();
    this.player.translateY(4);
    this.player.translateX(35);
    this.scene.add(this.player);

    this.camera.position.x += 35;

    // Add things player can collide into
    this.player.addCollidable(this.altar.altar);
    this.player.addCollidable(this.wells);

    // Add the timer
    this.timer = new Game.Timer();

    this.render();
  },

  render: function() {
    requestAnimationFrame(Game.render);

    var clockdelta = Game.clock.getDelta();

    var flip = 1;
    for(var i = 1; i < Game.ground.cylinders.length; i ++) {
      Game.ground.cylinders[i].rotation.y += 0.002 * flip;
      flip *= -1;
    }

    // Rotate wells as well
    Game.wells.rotation.y += (0.002 * flip * -1);

    // Update player
    Game.player.update(clockdelta, Game.camera, Game.tetrominos);

    // Update the tetrominos
    var tetsActive = false;
    for (var i = 0; i < Game.tetrominos.length; i ++) {
      Game.tetrominos[i].update(clockdelta);
      if (Game.tetrominos[i].active == true) {
        tetsActive = true;
      }
    }

    if (tetsActive == false) {
      Game.altar.addTetrominos(Game.tetrominos);
      Game.ground.addRing();
      Game.wells.expand();
    }

    if (Game.timer.timeLeft > 0) {
      // Update time
      Game.timer.updateTime();
    } else {
      Game.gameOver();
    }

    Game.renderer.render(Game.scene, Game.camera);
  },

  gameOver: function() {
    for(var i = 0; i < Game.ground.cylinders.length; i ++) {
      Game.scene.remove(Game.ground.cylinders[i]);
    }

    Game.scene.remove(Game.wells);

    Game.scene.remove(Game.altar.altar);

    for(var i = 0; i < Game.tetrominos.length; i ++) {
      Game.scene.remove(Game.tetrominos[i]);
    }
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
