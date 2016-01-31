/**
 * JS for the tetrominos that you're supposed to carry around.
 * * * * */

if (Game !== undefined) {

  Game.Tetromino = function(type) {

    var COLOR = 0xFF2546;
    var MATERIAL = new THREE.MeshPhongMaterial({color: COLOR});
    var BLOCK_WIDTH = 1;
    var HOVER = 1;

    this.tetromino = new THREE.Object3D();

    switch (type) {

      case "i":
        // Generate an I tetromino (straight)
        var iGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH * 4, BLOCK_WIDTH);
        this.tetromino = new THREE.Mesh(iGeo, MATERIAL);
        this.tetromino.position.y = 1;
        break;

      case "o":
        var oGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2,
          BLOCK_WIDTH * 2, BLOCK_WIDTH);
        this.tetromino = new THREE.Mesh(oGeo, MATERIAL);
        this.tetromino.position.y = 1;
        break;

      case "t":

        // Add top of T
        var tTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var tTop = new THREE.Mesh(tTopGeo, MATERIAL);
        this.tetromino.add(tTop);
        tTop.translateY(1);

        // Add bottom of T
        var tBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var tBottom = new THREE.Mesh(tBottomGeo, MATERIAL);
        this.tetromino.add(tBottom);
        this.tetromino.translateY(1);
        break;

      case "j":

        // Add top of J
        var jTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var jTop = new THREE.Mesh(jTopGeo, MATERIAL);
        this.tetromino.add(jTop);
        jTop.translateY(1);

        // Add bottom of J
        var jBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var jBottom = new THREE.Mesh(jBottomGeo, MATERIAL);
        this.tetromino.add(jBottom);
        jBottom.translateX(BLOCK_WIDTH);
        this.tetromino.translateY(1);
        break;

      case "l":

        // Add top of L
        var lTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var lTop = new THREE.Mesh(lTopGeo, MATERIAL);
        this.tetromino.add(lTop);
        lTop.translateY(1);

        var lBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var lBottom = new THREE.Mesh(lBottomGeo, MATERIAL);
        this.tetromino.add(lBottom);
        lBottom.translateX(-BLOCK_WIDTH);
        this.tetromino.translateY(1);
        break;

      case "s":

        // Add top of S
        var sTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var sTop = new THREE.Mesh(sTopGeo, MATERIAL);
        this.tetromino.add(sTop);
        sTop.translateY(1);
        sTop.translateX(0.5);

        // Add bottom of S
        var sBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var sBottom = new THREE.Mesh(sBottomGeo, MATERIAL);
        this.tetromino.add(sBottom);
        sBottom.translateX(-0.5);
        this.tetromino.translateY(1);
        break;

      case "z":

        // Add top of Z
        var zTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var zTop = new THREE.Mesh(zTopGeo, MATERIAL);
        this.tetromino.add(zTop);
        zTop.translateY(1);
        zTop.translateX(-0.5);

        // Add bottom of Z
        var zBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var zBottom = new THREE.Mesh(zBottomGeo, MATERIAL);
        this.tetromino.add(zBottom);
        zBottom.translateX(0.5);
        this.tetromino.translateY(1);

      default:
        console.log("Not a valid tetromino" + type);
    }
  }
}
