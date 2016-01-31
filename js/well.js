/**
 * JS for constructing and managing wells.  These guys are where you shoot your
 * tetris blocks into
 * * * * */

if (Game !== undefined) {
  Game.Wells = function() {

    this.INNER_RADIUS = 3;
    this.OUTER_RADIUS = 5;
    this.THICKNESS = 2;

    this.COLOR = 0xB9BED6;
    this.MATERIAL = new THREE.MeshPhongMaterial({
      color: this.COLOR
    });

    this.wellGroup = new THREE.Object3D();
    this.groupRadius = 55;
    this.radianPerWell = Math.PI * 2 / 7;
    this.rotationAxis = new THREE.Vector3(0, 1, 0);
    this.wellPosition = new THREE.Vector3(this.groupRadius, 2.5, 0);
  }

  Game.Wells.prototype.makeWells = function() {

    // Start off by generating the outer wall of the well
    for(var i = 0; i < 8; i ++) {

      var well = new THREE.Object3D();
      var wellOuterGeo = new THREE.CylinderGeometry(
        this.OUTER_RADIUS,
        this.OUTER_RADIUS,
        this.THICKNESS,
        16,
        1,
        true
      );
      var wellOuter = new THREE.Mesh(wellOuterGeo, this.MATERIAL);
      well.add(wellOuter);

      // Then the inner wall
      var wellInnerGeo = new THREE.CylinderGeometry(
        this.INNER_RADIUS,
        this.INNER_RADIUS,
        this.THICKNESS,
        16,
        1,
        true
      );
      wellInnerGeo.scale(-1, 1, 1);
      var wellInner = new THREE.Mesh(wellInnerGeo, this.MATERIAL);
      well.add(wellInner);

      // Now add the cap
      var capGeo = new THREE.RingGeometry(
        this.INNER_RADIUS,
        this.OUTER_RADIUS,
        16
      );
      var cap = new THREE.Mesh(capGeo, this.MATERIAL);
      cap.lookAt(new THREE.Vector3(0, 1, 0));
      cap.position.y = this.THICKNESS / 2;
      well.add(cap);

      // Translate the whole thing
      this.wellPosition.applyAxisAngle(this.rotationAxis, this.radianPerWell);
      well.translateX(this.wellPosition.x);
      well.translateY(this.wellPosition.y);
      well.translateZ(this.wellPosition.z);
      this.wellGroup.add(well);
    }

  }
}
