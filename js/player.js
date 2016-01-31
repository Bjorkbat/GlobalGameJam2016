/**
 * JS for the player character and moving it around
 * * * * */

if (Game !== undefined) {

  Game.Player = function() {
    THREE.Object3D.call(this);

    var BLOCK_WIDTH = 1;
    var MATERIAL = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var mouseRaycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(0, 0);
    var lookDirection = new THREE.Vector3(0, 5, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);

    var collisionRaycaster = new THREE.Raycaster(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      0,
      2
    );
    this.collidables = [];

    this.character = new THREE.Object3D();

    // BEGIN BUILD PLAYER
    // Construct the legs
    var legGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH * 3,
      BLOCK_WIDTH);

    var leftLeg = new THREE.Mesh(legGeo, MATERIAL);
    this.character.add(leftLeg);
    leftLeg.translateX(-BLOCK_WIDTH);

    var rightLeg = new THREE.Mesh(legGeo, MATERIAL);
    this.character.add(rightLeg);
    rightLeg.translateX(BLOCK_WIDTH);

    // Add the body
    var bodyGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH * 5,
      BLOCK_WIDTH);
    var body = new THREE.Mesh(bodyGeo, MATERIAL);
    this.character.add(body);
    body.translateY(BLOCK_WIDTH * 3);

    // Add the arms
    var armGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
      BLOCK_WIDTH);

    var leftArm = new THREE.Mesh(armGeo, MATERIAL);
    this.character.add(leftArm);
    leftArm.translateX(BLOCK_WIDTH * 1.5);
    leftArm.translateY(BLOCK_WIDTH * 4);

    var rightArm = new THREE.Mesh(armGeo, MATERIAL);
    this.character.add(rightArm);
    rightArm.translateX(-BLOCK_WIDTH * 1.5);
    rightArm.translateY(BLOCK_WIDTH * 4);

    this.add(this.character);
    // END BUILD PLAYER

    // Now let's add some controls for WASD keys
    var onKeyDown = function(event) {

      switch(event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          // TODO: jump
          break;
      }
    };

    var onKeyUp = function(event) {

      switch(event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;
      }
    };

    var onMouseOver = function(event) {

      // Change the mouse's coordinates
      mouse.x = (event.clientX / Game.renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / Game.renderer.domElement.clientHeight) * 2 + 1;

    }

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('mousemove', onMouseOver, false);

    this.addCollidable = function(object) {
      this.collidables.push(object);
    }

    this.update = function(delta, camera) {
      this.velocity.x = 0;
      this.velocity.z = 0;

      // Change move direction
      if (moveForward) {
        this.velocity.x += -20 * delta;
        this.velocity.z += -20 * delta;
      }
      if (moveBackward) {
        this.velocity.x += 20 * delta;
        this.velocity.z += 20 * delta;
      }
      if (moveLeft) {
        this.velocity.x += -20 * delta;
        this.velocity.z += 20 * delta;
      }
      if (moveRight) {
        this.velocity.x += 20 * delta;
        this.velocity.z += -20 * delta;
      }

      // Cast a ray from position to velocity direction to see if any objects
      // are in player's way
      var rayOrigin = this.position.clone();
      rayOrigin.y = 3.5;
      var rayDirection = this.velocity.clone();
      rayDirection.normalize();
      collisionRaycaster.set(rayOrigin, rayDirection);
      var objects = collisionRaycaster.intersectObjects(this.collidables, true);
      if (objects.length > 0) {
        this.velocity.x = 0;
        this.velocity.z = 0;
        console.log("what the fuck?");
      }

      this.translateX(this.velocity.x);
      this.translateZ(this.velocity.z);

      // Change look direction
      mouseRaycaster.setFromCamera(mouse, camera);
      var planeIntersection = mouseRaycaster.intersectObject(Game.groundPlane);
      if (planeIntersection.length > 0) {
        lookDirection.x = planeIntersection[0].point.x;
        lookDirection.z = planeIntersection[0].point.z;
      }
      this.character.lookAtWorld(lookDirection);

    }
  }
  Game.Player.prototype = new THREE.Object3D();
  Game.Player.prototype.constructor = Game.Player;
}

THREE.Object3D.prototype.worldToLocal = function ( vector ) {
    if ( !this.__inverseMatrixWorld ) this.__inverseMatrixWorld = new THREE.Matrix4();
    return  vector.applyMatrix4( this.__inverseMatrixWorld.getInverse( this.matrixWorld ));
};


THREE.Object3D.prototype.lookAtWorld = function( vector ) {
   vector = vector.clone();
   this.parent.worldToLocal( vector );
   this.lookAt( vector );
};
