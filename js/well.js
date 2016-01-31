/**
 * JS for constructing and managing wells.  These guys are where you shoot your
 * tetris blocks into
 * * * * */

if (Game !== undefined) {
  Game.Well = function(type) {
    THREE.Object3D.call(this);

    var INNER_RADIUS = 3;
    var OUTER_RADIUS = 5;
    var THICKNESS = 2;

    var COLOR = 0xB9BED6;
    var MATERIAL = new THREE.MeshPhongMaterial({
      color: COLOR
    });

    // Make outer wall
    var wellOuterGeo = new THREE.CylinderGeometry(
      OUTER_RADIUS,
      OUTER_RADIUS,
      THICKNESS,
      16,
      1,
      true
    );
    wellOuter = new THREE.Mesh(wellOuterGeo, MATERIAL);
    this.add(wellOuter);

    // Then the inner wall
    var wellInnerGeo = new THREE.CylinderGeometry(
      INNER_RADIUS,
      INNER_RADIUS,
      THICKNESS,
      16,
      1,
      true
    );
    wellInnerGeo.scale(-1, 1, 1);
    var wellInner = new THREE.Mesh(wellInnerGeo, MATERIAL);
    this.add(wellInner);

    // Now add the cap
    var capGeo = new THREE.RingGeometry(INNER_RADIUS, OUTER_RADIUS, 16);
    var cap = new THREE.Mesh(capGeo, MATERIAL);
    cap.lookAt(new THREE.Vector3(0, 1, 0));
    cap.position.y = THICKNESS / 2;
    this.add(cap);

    // Now create a special tetromino above the well to indicate what kind
    // of well it is
    var tetromino = new Game.Tetromino(type, 2);
    this.add(tetromino);
    this.tetrominoType = type;
    tetromino.translateY(8);
  }

  Game.Well.prototype = new THREE.Object3D();
  Game.Well.prototype.constructor = Game.Well;
}
