/**
 * The altar.  This is where all the tetrominos spawn from.
 * * * * */

if (Game !== undefined) {
  Game.Altar = function() {
    this.INNER_RADIUS = 5;
    this.OUTER_RADIUS = 7;
    this.THICKNESS = 2;

    this.COLOR = 0xB9BED6;
    this.MATERIAL = new THREE.MeshPhongMaterial({
      color: this.COLOR
    });

    this.TETRA_RADIUS = 12.5
    this.ROT_AXIS = new THREE.Vector3(0, 1, 0);
    this.tetraPosition = new THREE.Vector3(this.TETRA_RADIUS, 5, 0);

    this.altar = new THREE.Object3D();

    // Create the altar
    // Start with outer wall
    var altarOuterGeo = new THREE.CylinderGeometry(
      this.OUTER_RADIUS,
      this.OUTER_RADIUS,
      this.THICKNESS,
      16,
      1,
      true
    );
    this.altar.add(new THREE.Mesh(altarOuterGeo, this.MATERIAL));

    // Move to inner wall
    var altarInnerGeo = new THREE.CylinderGeometry(
      this.INNER_RADIUS,
      this.INNER_RADIUS,
      this.THICKNESS,
      16,
      1,
      true
    );
    altarInnerGeo.scale(-1, 1, 1);
    this.altar.add(new THREE.Mesh(altarInnerGeo, this.MATERIAL));

    // Add the cap
    var capGeo = new THREE.RingGeometry(
      this.INNER_RADIUS,
      this.OUTER_RADIUS,
      16
    );
    var cap = new THREE.Mesh(capGeo, this.MATERIAL);
    cap.lookAt(new THREE.Vector3(0, 1, 0));
    cap.position.y = this.THICKNESS / 2;
    this.altar.add(cap);

    // Translate
    this.altar.position.y = 5;
  };

  // Takes an array of tetrominos (really, any 3D object) and adds them
  // around the altar, forming a circle of tetrominos
  Game.Altar.prototype.addTetrominos = function(tetrominos) {

    var radiansPerTetra = Math.PI * 2 / tetrominos.length;

    for(var i = 0; i < tetrominos.length; i ++) {

      // Rotate
      this.tetraPosition.applyAxisAngle(this.ROT_AXIS, radiansPerTetra);

      // Apply position to tetromino
      tetrominos[i].tetromino.translateX(this.tetraPosition.x);
      tetrominos[i].tetromino.translateY(this.tetraPosition.y);
      tetrominos[i].tetromino.translateZ(this.tetraPosition.z);
    }

  };
}
