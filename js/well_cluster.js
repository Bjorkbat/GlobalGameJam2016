/**
 * JS for the well cluster.  It's used to manage all our wells
 * * * * */

if (Game !== undefined) {
  Game.WellCluster = function() {
    THREE.Object3D.call(this);

    var groupRadius = 55;
    var radianPerWell = Math.PI * 2 / 7;
    var rotationAxis = new THREE.Vector3(0, 1, 0);
    var wellPosition = new THREE.Vector3(groupRadius, 3.5, 0);

    this.wells = [];

    // Creates wells, populates own wells array
    this.makeWells = function() {

      var well;
      for(var i = 0; i < 7; i ++) {

        // Create and push well
        well = new Game.Well(Game.blockTypes[i]);
        this.add(well);

        // Find position
        wellPosition.applyAxisAngle(rotationAxis, radianPerWell);
        well.translateX(wellPosition.x);
        well.translateY(wellPosition.y);
        well.translateZ(wellPosition.z);

        this.wells.push(well);
      }
    }

    this.expand = function() {
      // Modify and reset well position
      groupRadius += 20;
      wellPosition.x = groupRadius
      wellPosition.y = 3.5;
      wellPosition.z = 0;

      for(var i = 0; i < this.wells.length; i ++) {

        // Reset well
        this.wells[i].position.x = 0;
        this.wells[i].position.y = 0;
        this.wells[i].position.z = 0;

        // Find position
        wellPosition.applyAxisAngle(rotationAxis, radianPerWell);
        this.wells[i].translateX(wellPosition.x);
        this.wells[i].translateY(wellPosition.y);
        this.wells[i].translateZ(wellPosition.z);
      }
    }

  }
  Game.WellCluster.prototype = new THREE.Object3D();
  Game.WellCluster.prototype.constructor = Game.WellCluster;
}
