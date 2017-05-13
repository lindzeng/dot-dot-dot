class GameBar {
  constructor() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    $('#bar').css({left: width/2-125, bottom: -80});

    this.pathLength = 554;
    this.restart();
  }

  init() {
    $('#bar').animate({
      bottom: 30
    }, 1000, 'linear');
  }

  fillBar(color, fillPercentage) {
    color = "#" + color.toString(16);
    fillPercentage = Math.min(Math.max(fillPercentage, 0.0), 100.0);
    let m = this.pathLength/(-100.0);
    let y = m*fillPercentage+this.pathLength;
    $('#bar').css({stroke: color, "stroke-dashoffset": y});
  }

  setScore(newScore) {
    this.score = parseFloat(newScore).toFixed(0);
    $({countNum: this.prevScore}).animate({countNum: this.score}, {
      duration: 250,
      easing:'linear',
      step: function() {
        // What todo on every count
        $('#score').text(parseFloat(this.countNum).toFixed(0));
      },
      complete: () => {
        $('#score').text(this.score);
        this.prevScore = this.score;
      }
    });
  }

  setPercentRemaining(remain, colorFlag) {
    let cf = colorFlag ? colorFlag : false;
    remain = Math.min(Math.max(remain, 0), 100);

    $('#remaining').text(remain + '%');

    if (cf) return;
    if (remain <= 20) {
      $('#remaining').css({color: 'red'});
    } else {
      $('#remaining').css({color: 'white'});
    }
  }

  restart() {
    this.prevScore = 0;
    this.score = 0;
    $('#score').text(this.score);
    $('#remaining').text('100%');
  }
}

export default GameBar
