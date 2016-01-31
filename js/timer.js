/**
 * JS for the clock
 * * * * */

if (Game !== undefined) {
  Game.Timer = function() {

    var clock = new THREE.Clock(true);
    this.timeLeft = 60;

    var minutes = Math.floor(this.timeLeft / 60);
    var seconds = Math.round(this.timeLeft % 60);
    var hundredSeconds = Math.round((this.timeLeft - Math.floor(this.timeLeft)) * 100);

    this.updateTime = function() {
      this.timeLeft -= clock.getDelta();

      minutes = Math.floor(this.timeLeft / 60);
      seconds = Math.round(this.timeLeft % 60);
      hundredSeconds = Math.round((this.timeLeft - Math.floor(this.timeLeft)) * 100);

      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;
      document.getElementById("hundred").innerHTML = hundredSeconds;
    }

    this.addTime = function() {
      this.timeLeft += 5;

      minutes = Math.floor(this.timeLeft / 60);
      seconds = Math.round(this.timeLeft % 60);
      hundredSeconds = Math.round((this.timeLeft - Math.floor(this.timeLeft)) * 100);

      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;
      document.getElementById("hundred").innerHTML = hundredSeconds;
    }

    this.subtractTime = function() {
      this.timeLeft -= 5;

      minutes = Math.floor(this.timeLeft / 60);
      seconds = Math.round(this.timeLeft % 60);
      hundredSeconds = Math.round((this.timeLeft - Math.floor(this.timeLeft)) * 100);

      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;
      document.getElementById("hundred").innerHTML = hundredSeconds;
    }
  }
}
