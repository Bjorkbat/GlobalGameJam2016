/**
 * JS for the tetrominos that you're supposed to carry around.
 * * * * */

if (Game !== undefined) {

  Game.Tetromino = function(type, scale) {
    THREE.Object3D.call(this);

    this.homeHeight = 0;

    var COLOR = 0xFF2546;
    var MATERIAL = new THREE.MeshPhongMaterial({color: COLOR});
    var BLOCK_WIDTH = 1 * (scale || 1);
    var HOVER = 1;

    var speed = 0;
    var friction = 10;
    var gravity = 0.5;

    var raycaster = new THREE.Raycaster(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -1, 0),
      0,
      100
    );
    var rayDirection = new THREE.Vector3(0, -1, 0);

    switch (type) {

      case "i":
        // Generate an I tetromino (straight)
        var iGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH * 4, BLOCK_WIDTH);
        var iObject = new THREE.Mesh(iGeo, MATERIAL);
        this.add(iObject);
        iObject.translateY(BLOCK_WIDTH);
        this.position.y = 1.5 * (scale || 1);
        break;

      case "o":
        var oGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2,
          BLOCK_WIDTH * 2, BLOCK_WIDTH);
        this.add(new THREE.Mesh(oGeo, MATERIAL));
        this.position.y = 1.5 * (scale || 1);
        break;

      case "t":

        // Add top of T
        var tTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var tTop = new THREE.Mesh(tTopGeo, MATERIAL);
        this.add(tTop);
        tTop.translateY(BLOCK_WIDTH);

        // Add bottom of T
        var tBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var tBottom = new THREE.Mesh(tBottomGeo, MATERIAL);
        this.add(tBottom);
        this.position.y = 1 * (scale || 1);
        break;

      case "j":

        // Add top of J
        var jTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var jTop = new THREE.Mesh(jTopGeo, MATERIAL);
        this.add(jTop);
        jTop.translateY(BLOCK_WIDTH);

        // Add bottom of J
        var jBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var jBottom = new THREE.Mesh(jBottomGeo, MATERIAL);
        this.add(jBottom);
        jBottom.translateX(BLOCK_WIDTH);
        this.position.y = 1 * (scale || 1);
        break;

      case "l":

        // Add top of L
        var lTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 3,
          BLOCK_WIDTH, BLOCK_WIDTH);
        var lTop = new THREE.Mesh(lTopGeo, MATERIAL);
        this.add(lTop);
        lTop.translateY(BLOCK_WIDTH);

        var lBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var lBottom = new THREE.Mesh(lBottomGeo, MATERIAL);
        this.add(lBottom);
        lBottom.translateX(-BLOCK_WIDTH);
        this.position.y = 1 * (scale || 1);
        break;

      case "s":

        // Add top of S
        var sTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var sTop = new THREE.Mesh(sTopGeo, MATERIAL);
        this.add(sTop);
        sTop.translateY(BLOCK_WIDTH);
        sTop.translateX(BLOCK_WIDTH / 2);

        // Add bottom of S
        var sBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var sBottom = new THREE.Mesh(sBottomGeo, MATERIAL);
        this.add(sBottom);
        sBottom.translateX(-BLOCK_WIDTH / 2);
        this.position.y = 1 * (scale || 1);
        break;

      case "z":

        // Add top of Z
        var zTopGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var zTop = new THREE.Mesh(zTopGeo, MATERIAL);
        this.add(zTop);
        zTop.translateY(BLOCK_WIDTH);
        zTop.translateX(-BLOCK_WIDTH / 2);

        // Add bottom of Z
        var zBottomGeo = new THREE.BoxGeometry(BLOCK_WIDTH * 2, BLOCK_WIDTH,
          BLOCK_WIDTH);
        var zBottom = new THREE.Mesh(zBottomGeo, MATERIAL);
        this.add(zBottom);
        zBottom.translateX(BLOCK_WIDTH / 2);
        this.position.y = 1 * (scale || 1);
        break;

      default:
        console.log("Not a valid tetromino" + type);
    }
    this.tetrominoType = type;

    this.update = function(delta) {
      this.translateZ(speed * delta);
      if (speed > 0) {
        speed -= friction;
        if (speed < 0) {
          speed = 0;
        }

        if (this.position.y > this.homeHeight) {
          this.position.y -= gravity;
        }

        var rayOrigin = this.position.clone();
        rayOrigin.y = 10;
        var rayDirection = new THREE.Vector3(0, -1, 0);
        raycaster.set(rayOrigin, rayDirection);
        var intersectedWells = raycaster.intersectObject(Game.wells, true);
        if (intersectedWells.length > 0) {
          if(intersectedWells[0].object.parent.tetrominoType == this.tetrominoType) {
            Game.timer.addTime();
          } else {
            Game.timer.subtractTime();
          }
          Game.scene.remove(this);
          speed = 0;
        }
      }
    }

    this.throw = function() {
      speed = 200;
    }

  }
  Game.Tetromino.prototype = new THREE.Object3D();
  Game.Tetromino.prototype.constructor = Game.Tetromino;
}
