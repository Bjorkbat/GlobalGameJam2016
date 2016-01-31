/**
 * JS for the player character and moving it around
 * * * * */

if (Game !== undefined) {

  Game.Player = function() {
    THREE.Object3D.call(this);

    var BLOCK_WIDTH = 1;
    var MATERIAL = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

    // Construct the legs
    var legGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH * 3,
      BLOCK_WIDTH);

    var leftLeg = new THREE.Mesh(legGeo, MATERIAL);
    this.add(leftLeg);
    leftLeg.translateX(-BLOCK_WIDTH);

    var rightLeg = new THREE.Mesh(legGeo, MATERIAL);
    this.add(rightLeg);
    rightLeg.translateX(BLOCK_WIDTH);

    // Add the body
    var bodyGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH * 5,
      BLOCK_WIDTH);
    var body = new THREE.Mesh(bodyGeo, MATERIAL);
    this.add(body);
    body.translateY(BLOCK_WIDTH * 3);

    // Add the arms
    var armGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
      BLOCK_WIDTH);

    var leftArm = new THREE.Mesh(armGeo, MATERIAL);
    this.add(leftArm);
    leftArm.translateX(BLOCK_WIDTH * 1.5);
    leftArm.translateY(BLOCK_WIDTH * 4);

    var rightArm = new THREE.Mesh(armGeo, MATERIAL);
    this.add(rightArm);
    rightArm.translateX(-BLOCK_WIDTH * 1.5);
    rightArm.translateY(BLOCK_WIDTH * 4);
  }
  Game.Player.prototype = new THREE.Object3D();
  Game.Player.prototype.constructor = Game.Player;
}
