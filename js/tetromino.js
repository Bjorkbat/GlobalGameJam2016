/**
 * JS for the tetrominos that you're supposed to carry around.
 * * * * */

if (Game !== undefined) {

  Game.Tetromino = function(type) {

    var COLOR = 0xFF6C17;
    var MATERIAL = new THREE.MeshPhongMaterial({color: COLOR});
    var BLOCK_WIDTH = 2;

    this.tetrmino = new THREE.Object3D();

    switch (type) {
      case "i":
        // Generate an I tetromino (straight)
        var iGeo = new THREE.Geometry(BLOCK_WIDTH * 4,
          BLOCK_WIDTH, BLOCK_WIDTH);
        this.tetromino = new THREE.Mesh(iGeo, MATERIAL);
    }
  }
}
