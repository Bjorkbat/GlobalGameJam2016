/**
 * JS for the clock
 * * * * */

if (Game !== undefined) {
  Game.Timer = function() {

    var clock = new THREE.Clock(true);
    var timeLeft = 60;

    var minutes = Math.floor(timeLeft / 60);
    var seconds = Math.round(timeLeft % 60);
    var hundredSeconds = Math.round((timeLeft - Math.floor(timeLeft)) * 100);

    this.updateTime = function() {
      timeLeft -= clock.getDelta();

      minutes = Math.floor(timeLeft / 60);
      seconds = Math.round(timeLeft % 60);
      hundredSeconds = Math.round((timeLeft - Math.floor(timeLeft)) * 100);

      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;
      document.getElementById("hundred").innerHTML = hundredSeconds;
    }

    this.addTime = function() {
      timeLeft += 5;
    }

    this.subtractTime = function() {
      timeLeft -= 5;
    }
  }
}
