class GameBar {
  constructor() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    $('#bar').css({left: width/2-125, bottom: -80});

    this.pathLength = 554;
    this.prevScore = 0;
    this.score = 0;
  }

  init() {
    $('#bar').animate({
      bottom: 30
    }, 1000, 'linear');
  }

  fillBar(color, fillPercentage) {
    let m = this.pathLength/(-100.0);
    let y = m*fillPercentage+this.pathLength;
    $('#bar').css({stroke: color, "stroke-dashoffset": y});
  }

  addScore(incrementScore) {
    this.score = this.prevScore + incrementScore;
    $({countNum: this.prevScore}).animate({countNum: this.score}, {
      duration: 500,
      easing:'linear',
      step: function() {
        // What todo on every count
        $('#score').text(this.countNum.toFixed(0));
      },
      complete: () => {
        $('#score').text(this.score);
        this.prevScore = this.score;
      }
    });
  }

  setPercentRemaining(remain) {
    $('#remaining').text(remain + '%');
    if (remain <= 20) {
      $('#remaining').css({color: 'red'});
    } else {
      $('#remaining').css({color: 'white'});
    }
  }
}

export default GameBar
