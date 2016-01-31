/**
 * JS for controlling the ground "cylinders" in the game
 * * * * */

if (Game !== undefined) {
  Game.Ground = function() {

    this.COLOR = 0x7BD6D6;
    this.CAP_TEXTURE = new THREE.TextureLoader().load("./img/stone_cap.jpg");
    this.CAP_MATERIAL = new THREE.MeshPhongMaterial({ color: this.COLOR,
      bumpMap: this.CAP_TEXTURE, bumpScale: 1});
    this.SIDE_MATERIAL = new THREE.MeshBasicMaterial({ color: this.COLOR});
    this.RADIUS = 25;
    this.RADIUS_STEP = 20;
    this.THICKNESS = 5;
    this.SEGMENTS = 32;

    this.cylinders = [];
    var innerGeo;
    var innerCylinder;
    var outerGeo;
    var outerCylinder;
    var capGeo;
    var cap;
    var cylinder;

    // Generate the center cylinder
    var cylinder = new THREE.Object3D();

    innerGeometry = new THREE.CylinderGeometry(
      this.RADIUS,
      this.RADIUS,
      this.THICKNESS,
      this.SEGMENTS,
      1,
      true
    );
    innerCylinder = new THREE.Mesh(innerGeometry, this.SIDE_MATERIAL);
    cylinder.add(innerCylinder);

    capGeo = new THREE.CircleGeometry(this.RADIUS, this.SEGMENTS);
    capMaterial = new THREE.MeshPhongMaterial({
      color: this.COLOR,
      bumpMap: new THREE.TextureLoader().load("./img/stone_cap.jpg")
    })
    cap = new THREE.Mesh(capGeo, capMaterial);
    cap.lookAt(new THREE.Vector3(0, 1, 0));
    cap.position.y = this.THICKNESS / 2;
    cylinder.add(cap);

    this.cylinders.push(cylinder);
  }

  Game.Ground.prototype.addRing = function() {

    // Use the length of our cylinders array to calculate the radius of the
    // inner and outer cylinders
    var cylinder = new THREE.Object3D();
    var innerGeometry = new THREE.CylinderGeometry(
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length - 1),
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length - 1),
      this.THICKNESS,
      this.SEGMENTS,
      1,
      true
    );
    innerGeometry.scale(-1, 1, 1);
    var innerCylinder = new THREE.Mesh(innerGeometry, this.SIDE_MATERIAL);
    cylinder.add(innerCylinder);

    var outerGeometry = new THREE.CylinderGeometry(
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length),
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length),
      this.THICKNESS,
      this.SEGMENTS,
      1,
      true
    );
    var outerCylinder = new THREE.Mesh(outerGeometry, this.SIDE_MATERIAL);
    cylinder.add(outerCylinder);

    var capGeo = new THREE.RingGeometry(
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length - 1),
      this.RADIUS + this.RADIUS_STEP * (this.cylinders.length),
      this.SEGMENTS,
      this.SEGMENTS
    );
    capGeo.faceVertexUvs.push(new THREE.Vector2(
      this.RADIUS + (this.RADIUS_STEP * (this.cylinders.length -1)) / this.SEGMENTS,
      this.RADIUS + (this.RADIUS_STEP * (this.cylinders.length)) / this.SEGMENTS
    ));
    var cap = new THREE.Mesh(capGeo, this.CAP_MATERIAL);
    cap.lookAt(new THREE.Vector3(0, 1, 0));
    cap.position.y = this.THICKNESS / 2;
    cylinder.add(cap);
    this.cylinders.push(cylinder);
  };
}
