/**
 * The altar.  This is where all the tetrominos spawn from.
 * * * * */

if (Game !== undefined) {
  Game.Altar = function() {
    this.INNER_RADIUS = 5;
    this.OUTER_RADIUS = 7;
    this.THICKNESS = 2;

    this.COLOR = 0x7BD6D6;
    this.MATERIAL = new THREE.MeshPhongMaterial({
      color: this.COLOR
    });

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
  }
}
