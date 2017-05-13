(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = require('./Helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
  function Dot(color, pos, rad) {
    _classCallCheck(this, Dot);

    this.color = color ? color : 0xFF0000;
    this.rad = rad ? rad : Math.random() * 20 + 15;
    var p = pos ? pos : [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

    this.scale = 0;

    this.value = this.rad * _Helpers.scoreMult;

    this.d = new PIXI.Graphics();
    this.d.beginFill(this.color);
    this.d.drawCircle(0, 0, this.rad);
    this.d.endFill();
    this.d.x = p[0];
    this.d.y = p[1];
    this.d.vx = Math.random() * 2 - 1;
    this.d.vy = Math.random() * 2 - 1;
    this.d.scale.x = this.scale;
    this.d.scale.y = this.scale;
    this.d.circular = true;

    this.o = new PIXI.Graphics();
    this.o.lineStyle(.5, 0x000000); // (thickness, color)
    this.o.drawCircle(0, 0, this.rad);
    this.o.endFill();
    this.o.x = p[0] - this.d.vx * 2.5;
    this.o.y = p[1] - this.d.vy * 2.5;
    this.o.scale.x = this.scale;
    this.o.scale.y = this.scale;
    this.o.circular = true;

    this.killed = false;
    this.dead = false;
    this.growing = true;
  }

  _createClass(Dot, [{
    key: 'step',
    value: function step() {
      if (this.dead) return;

      if (this.growing) {
        this.scale += .05;
        this.updateScales();

        if (this.scale > 1) {
          this.scale = 1;
          this.growing = false;
        }
      }

      this.d.x += this.d.vx;
      this.d.y += this.d.vy;

      this.o.x = this.d.x - this.d.vx * 2.5;
      this.o.y = this.d.y - this.d.vy * 2.5;

      if (this.killed) {
        this.scale -= .2;
        this.updateScales();
        if (this.scale < -.005) {
          this.scale = 0;
          this.dead = true;
        }
      }
    }
  }, {
    key: 'updateScales',
    value: function updateScales() {
      this.d.scale.x = this.scale;
      this.d.scale.y = this.scale;

      this.o.scale.x = this.scale;
      this.o.scale.y = this.scale;
    }
  }, {
    key: 'getGraphics',
    value: function getGraphics() {
      return [this.d, this.o];
    }
  }, {
    key: 'kill',
    value: function kill() {
      this.killed = true;
      return this.value;
    }
  }]);

  return Dot;
}();

exports.default = Dot;

},{"./Helpers":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Helpers = require('./Helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EndMessage = function EndMessage(score, restartCB) {
  _classCallCheck(this, EndMessage);

  $('#restartButtonDiv').mouseenter(function () {
    $(this).css('background-color', '#5b5b5b');
  });

  $('#restartButtonDiv').mouseleave(function () {
    $(this).css('background-color', '#4D4D4D');
  });

  $('#restartButtonDiv').click(function () {
    _Helpers.buttonSound.play();
    $('#endContainer').animate({
      top: -550
    }, 1000, 'linear');
    console.log('hii');
    $('#shade2').animate({
      opacity: 0
    }, 1000, 'linear', function () {

      $('#shade2').hide();
    });

    restartCB();
  });

  var width = window.innerWidth;
  var height = window.innerHeight;
  $('#endContainer').css({ left: width / 2 - 300, top: height / 2 - 275 });
  $('#endScore').text(parseFloat(score).toFixed(0));

  $('#shade2').show();
  $('#shade2').animate({
    opacity: 1
  }, 1000, 'linear');
};

exports.default = EndMessage;

},{"./Helpers.js":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dot = require('./Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Wall = require('./Wall');

var _Wall2 = _interopRequireDefault(_Wall);

var _Helpers = require('./Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(stage, g) {
    _classCallCheck(this, Game);

    this.stage = stage;
    this.gameBar = g;
    this.stage.interactive = true;
    this.stage.buttonMode = true;
    this.stage.on('pointerdown', this.onDragStart.bind(this)).on('pointerup', this.onDragEnd.bind(this)).on('pointerupoutside', this.onDragEnd.bind(this)).on('pointermove', this.onDragMove.bind(this));

    this.dots = [];
    this.walls = {};

    this.lineDots = [];
    this.lineColor = 0xffffff;
    this.lineGraphics = new PIXI.Graphics();
    this.isPolygon = false;

    this.startDots = _Helpers.startDots;
    this.numDots = 0;
    this.dotColors = _Helpers.dotColors;

    this.score = 0;
    this.scoreMultiplier = 1;

    this.dragLengthRemaining = 100;
    this.tempLengthRemaining = 100;
    this.lengthRemaining = 100;
    this.prevDist = 0;

    this.initWalls();
    this.initDots();
  }

  _createClass(Game, [{
    key: 'getScore',
    value: function getScore() {
      return this.score;
    }
  }, {
    key: 'killAll',
    value: function killAll() {
      this.dots.forEach(function (d) {
        return d.kill();
      });
    }
  }, {
    key: 'initDots',
    value: function initDots() {
      var _this = this;

      // Distribute dots in a grid to ensure no overlap
      // let dim = Math.floor(Math.sqrt(this.startDots));
      // let dim = Math.floor(Math.sqrt(35)); // based on max radius of dots
      // let countWidth = Math.floor((window.innerWidth - 50)/(dim+3));
      // let countHeight = Math.floor((window.innerHeight - 50)/(dim+3));
      //
      // for (let i = 50; i < window.innerWidth-1; i+=countWidth) {
      //   for (let j = 50; j < window.innerHeight-1; j+=countHeight) {
      //     // always guarantees that two dots will be made
      //     if ((i === 50 && j === 50) || (i === 50 && j === 50+countHeight)) {
      //       let d1 = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)], [i, j], Math.random()*20+15);
      //       this.dots.push(d1);
      //       this.numDots++;
      //       d1.getGraphics().forEach(e => this.stage.addChild(e));
      //     }
      //     else {
      //       let r = Math.random();
      //       if (r >= 0.5) {
      //         let d = new Dot(this.dotColors[Math.floor(Math.random() * this.dotColors.length)], [i, j], Math.random()*20+15);
      //         this.dots.push(d);
      //         this.numDots++;
      //         d.getGraphics().forEach(e => this.stage.addChild(e));
      //       }
      //     }
      //   }
      // }

      var reselect = false;
      while (this.numDots < this.startDots) {
        var pos = { x: 35 + Math.random() * (window.innerWidth - 70), y: 35 + Math.random() * (window.innerHeight - 70) };
        var d = new _Dot2.default(this.dotColors[Math.floor(Math.random() * this.dotColors.length)], [pos.x, pos.y], Math.random() * 20 + 15);
        for (var i = 0; i < this.numDots; i++) {
          if ((0, _Helpers.overlap)(d.d.x, d.d.y, d.rad, this.dots[i].d.x, this.dots[i].d.y, this.dots[i].rad)) {
            reselect = true;
            break;
          }
        }
        if (reselect) {
          reselect = false;
          continue;
        }
        this.dots.push(d);
        this.numDots++;
        d.getGraphics().forEach(function (e) {
          return _this.stage.addChild(e);
        });
      }
    }
  }, {
    key: 'initWalls',
    value: function initWalls() {
      var wallColor = _Helpers.bgColor;
      //let wallColor = this.dotColors;

      var wallTop = new _Wall2.default(wallColor, [0, 0, window.innerWidth, 1], [0, 0]);
      this.stage.addChild(wallTop.getGraphics());

      var wallLeft = new _Wall2.default(wallColor, [0, 0, 1, window.innerHeight], [0, 0]);
      this.stage.addChild(wallLeft.getGraphics());

      var wallBottom = new _Wall2.default(wallColor, [0, 0, window.innerWidth, 1], [0, window.innerHeight - 1]);
      this.stage.addChild(wallBottom.getGraphics());

      var wallRight = new _Wall2.default(wallColor, [0, 0, 1, window.innerHeight], [window.innerWidth - 1, 0]);
      this.stage.addChild(wallRight.getGraphics());

      this.walls = { top: wallTop, left: wallLeft, bottom: wallBottom, right: wallRight };
    }
  }, {
    key: 'step',
    value: function step() {
      // Render dot graphics
      this.renderDots();

      // Render line graphics
      this.renderLine();
      this.updateScoreMultiplier();

      this.renderDragLine();
    }
  }, {
    key: 'checkEndGame',
    value: function checkEndGame() {
      // Check if # of dots of each color are all 1 or 0
      var colorCount = [];
      for (var i = 0; i < _Helpers.dotColors.length; i++) {
        colorCount.push(0);
      }

      this.dots.forEach(function (d) {
        var cIdx = _Helpers.dotColors.indexOf(d.color);
        colorCount[cIdx]++;
      });

      // console.log(this.dots);
      // console.log(colorCount);

      var counter = 0;
      colorCount.forEach(function (e) {
        if (e <= 1) counter++;
      });

      if (counter === _Helpers.dotColors.length) return true;

      // OR no line left
      if (this.lengthRemaining <= 0) return true;

      // OR all dots killed
      if (this.numDots === 0) return true;

      return false;
    }
  }, {
    key: 'getColorIdx',
    value: function getColorIdx(color) {
      for (var i = 0; i < this.dotColors.length; i++) {
        if (color === this.dotColors[i]) return i;
      }
      return -1;
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      var _this2 = this;

      this.dots.forEach(function (d, i) {
        // let dot = d.getGraphics()[0];

        (0, _Helpers.collideWalls)(d, _this2.walls);

        for (var j = 0; j < _this2.numDots; j++) {
          if (i === j) continue;
          (0, _Helpers.collideCircs)(d, _this2.dots[j]);
        }

        d.step();

        if (d.dead) {
          d.getGraphics().forEach(function (e) {
            return _this2.stage.removeChild(e);
          });
          _this2.dots.splice(i, 1);
          _this2.numDots -= 1;
        }
      });
    }
  }, {
    key: 'renderLine',
    value: function renderLine() {
      this.stage.removeChild(this.lineGraphics);
      this.lineGraphics = new PIXI.Graphics();
      this.lineGraphics.lineStyle(.5, 0x000000);
      for (var i = 0; i < this.lineDots.length - 1; i++) {
        this.lineGraphics.moveTo(this.lineDots[i].d.x, this.lineDots[i].d.y);
        this.lineGraphics.lineTo(this.lineDots[i + 1].d.x, this.lineDots[i + 1].d.y);
      }
      this.lineGraphics.endFill();
      this.stage.addChild(this.lineGraphics);
    }
  }, {
    key: 'renderDragLine',
    value: function renderDragLine() {
      if (this.dragging) {
        this.stage.removeChild(this.dragLine);
        this.dragLine = new PIXI.Graphics();
        this.dragLine.lineStyle(.5, 0x000000);
        this.dragLine.moveTo(this.lineDots[this.lineDots.length - 1].d.x, this.lineDots[this.lineDots.length - 1].d.y);
        this.dragLine.lineTo(this.pos.x, this.pos.y);
        this.stage.addChild(this.dragLine);
        this.gameBar.setPercentRemaining(this.dragLengthRemaining);
      } else {
        this.stage.removeChild(this.dragLine);
        this.gameBar.setPercentRemaining(this.tempLengthRemaining);
      }
    }
  }, {
    key: 'updateScoreMultiplier',
    value: function updateScoreMultiplier() {
      if (this.lineDots.length >= 1) {
        var frac = this.lineDots.length / _Helpers.pathBonusLength;
        this.scoreMultiplier = 1 + frac * 2;
        this.gameBar.fillBar(this.lineColor, frac * 100.0);
      } else {
        this.scoreMultiplier = 1;
        this.gameBar.fillBar(this.lineColor, 0);
      }
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.lineDots = [];
      this.dragging = true;
      this.isPolygon = false;
      this.pos = event.data.getLocalPosition(this.stage);
      var start = this.findDot(this.pos);
      if (start) {
        this.lineDots.push(start);
        this.lineColor = start.color;
      }
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      this.dragging = false;
      this.isPolygon = false;
      if (this.lineDots.length > 1) {
        var toAdd = 0;
        this.lineDots.forEach(function (d) {
          toAdd += d.kill();
        });

        _Helpers.byeSound.play();

        this.score += toAdd * this.scoreMultiplier;
        this.gameBar.setScore(this.score);
        this.lengthRemaining = this.tempLengthRemaining;
      }
      this.lineDots = [];
    }
  }, {
    key: 'onDragMove',
    value: function onDragMove(event) {
      if (this.dragging) {
        this.pos = event.data.getLocalPosition(this.stage);
        var dragDist = (this.pos.x - this.lineDots[this.lineDots.length - 1].d.x) * (this.pos.x - this.lineDots[this.lineDots.length - 1].d.x) + (this.pos.y - this.lineDots[this.lineDots.length - 1].d.y) * (this.pos.y - this.lineDots[this.lineDots.length - 1].d.y);
        this.dragLengthRemaining = this.tempLengthRemaining - Math.floor(_Helpers.distMult * Math.sqrt(dragDist));
        var mid = this.findDot(this.pos);
        if (mid !== undefined) {
          // Connect dots of the same color
          if (mid.color === this.lineColor) {
            // If going backward, remove line
            if (mid === this.lineDots[this.lineDots.length - 2]) {
              this.isPolygon = false;
              this.lineDots.splice(this.lineDots.length - 1, 1);
              this.tempLengthRemaining += this.prevDist;
            } else {
              // If polygon, can't connect
              if (this.isPolygon) return;
              // Connect to new dot or to first dot (creating polygon)
              var idx = this.findLineDot(mid);
              if (idx === 0 || idx === -1) {
                if (idx === 0) this.isPolygon = true;
                var dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) * (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y) * (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
                this.prevDist = Math.floor(_Helpers.distMult * Math.sqrt(dist));
                this.tempLengthRemaining -= this.prevDist;
                this.lineDots.push(mid);
              }
            }
          }
        }
      }
    }
  }, {
    key: 'findDot',
    value: function findDot(pos) {
      for (var i = 0; i < this.numDots; i++) {
        var snapPos = { x: this.dots[i].d.x, y: this.dots[i].d.y };
        var rad = this.dots[i].rad;
        var dist = (pos.x - snapPos.x) * (pos.x - snapPos.x) + (pos.y - snapPos.y) * (pos.y - snapPos.y);
        if (dist <= rad * rad) {
          if (this.dots[i] !== this.lineDots[this.lineDots.length - 1]) {
            return this.dots[i];
          }
        }
      }
      return undefined;
    }
  }, {
    key: 'findLineDot',
    value: function findLineDot(dot) {
      for (var i = 0; i < this.lineDots.length; i++) {
        if (this.lineDots[i] === dot) {
          return i;
        }
      }
      return -1;
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./Dot":1,"./Helpers":5,"./Wall":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBar = function () {
  function GameBar() {
    _classCallCheck(this, GameBar);

    var width = window.innerWidth;
    var height = window.innerHeight;
    $('#bar').css({ left: width / 2 - 125, bottom: -80 });

    this.pathLength = 554;
    this.restart();
  }

  _createClass(GameBar, [{
    key: 'init',
    value: function init() {
      $('#bar').animate({
        bottom: 30
      }, 1000, 'linear');
    }
  }, {
    key: 'fillBar',
    value: function fillBar(color, fillPercentage) {
      color = "#" + color.toString(16);
      fillPercentage = Math.min(Math.max(fillPercentage, 0.0), 100.0);
      var m = this.pathLength / -100.0;
      var y = m * fillPercentage + this.pathLength;
      $('#bar').css({ stroke: color, "stroke-dashoffset": y });
    }
  }, {
    key: 'setScore',
    value: function setScore(newScore) {
      var _this = this;

      this.score = parseFloat(newScore).toFixed(0);
      $({ countNum: this.prevScore }).animate({ countNum: this.score }, {
        duration: 250,
        easing: 'linear',
        step: function step() {
          // What todo on every count
          $('#score').text(parseFloat(this.countNum).toFixed(0));
        },
        complete: function complete() {
          $('#score').text(_this.score);
          _this.prevScore = _this.score;
        }
      });
    }
  }, {
    key: 'setPercentRemaining',
    value: function setPercentRemaining(remain) {
      remain = Math.min(Math.max(remain, 0), 100);
      $('#remaining').text(remain + '%');
      if (remain <= 20) {
        $('#remaining').css({ color: 'red' });
      } else {
        $('#remaining').css({ color: 'white' });
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.prevScore = 0;
      this.score = 0;
      $('#score').text(this.score);
      $('#remaining').text('100%');
    }
  }]);

  return GameBar;
}();

exports.default = GameBar;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var startDots = exports.startDots = Math.floor((window.innerWidth - 50) / 120) * Math.floor((window.innerHeight - 50) / 120);

// SCORING
var distMult = exports.distMult = .05;
var scoreMult = exports.scoreMult = 2;
var pathBonusLength = exports.pathBonusLength = 7;

var dotColors = exports.dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
var bgColor = exports.bgColor = 0xfffdf3;

var buttonSound = exports.buttonSound = new Howl({
    src: ['audio/button.mp3'],
    volume: 1,
    onend: function onend() {}
});

var byeSound = exports.byeSound = new Howl({
    src: ['audio/bye.mp3'],
    volume: 1,
    onend: function onend() {}
});

function overlap(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= r1 + r2) return true;
    return false;
}

function collideCircs(dot1, dot2) {
    if (overlap(dot1.d.x, dot1.d.y, dot1.rad, dot2.d.x, dot2.d.y, dot2.rad)) {
        // taken from https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
        var vf1x = dot2.d.vx;
        var vf1y = dot2.d.vy;
        var vf2x = dot1.d.vx;
        var vf2y = dot1.d.vy;

        dot1.d.vx = vf1x;
        dot1.d.vy = vf1y;
        dot2.d.vx = vf2x;
        dot2.d.vy = vf2y;
    }
}

function collideWalls(dot, walls) {
    var radius = dot.rad;
    var d = dot.d;
    var left = d.x - radius;
    var right = d.x + radius;
    var top = d.y - radius;
    var bottom = d.y + radius;

    // dot collides with left wall
    if (left < 1) {
        d.vx = -d.vx;
        // dot.color = walls.left.color;
        // d.beginFill(walls.left.color);
        // d.drawCircle(0, 0, radius);
        // d.endFill();
    }

    // dot collides with right wall
    else if (right > window.innerWidth - 1) {
            d.vx = -d.vx;
            // dot.color = walls.right.color;
            // d.beginFill(walls.right.color);
            // d.drawCircle(0, 0, radius);
            // d.endFill();
        }

        // dot collids with top wall
        else if (top < 1) {
                d.vy = -d.vy;
                // dot.color = walls.top.color;
                // d.beginFill(walls.top.color);
                // d.drawCircle(0, 0, radius);
                // d.endFill();
            }

            // dot collides with bottom wall
            else if (bottom > window.innerHeight - 1) {
                    d.vy = -d.vy;
                    // dot.color = walls.bottom.color;
                    // d.beginFill(walls.bottom.color);
                    // d.drawCircle(0, 0, radius);
                    // d.endFill();
                }
}

exports.overlap = overlap;
exports.collideCircs = collideCircs;
exports.collideWalls = collideWalls;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Helpers = require('./Helpers.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StartMessage = function StartMessage(cb) {
  _classCallCheck(this, StartMessage);

  // this.callback = cb;
  $('#buttonDiv').mouseenter(function () {
    $(this).css('background-color', '#5b5b5b');
  });

  $('#buttonDiv').mouseleave(function () {
    $(this).css('background-color', '#4D4D4D');
  });

  $('#buttonDiv').click(function () {
    _Helpers.buttonSound.play();
    $('#startContainer').animate({
      top: -530
    }, 1000, 'linear');

    $('#shade').animate({
      opacity: 0
    }, 1000, 'linear', function () {
      $(this).hide();
    });

    cb();
  });

  var width = window.innerWidth;
  var height = window.innerHeight;
  $('#startContainer').css({ left: width / 2 - 300, top: -530 });

  $('#startContainer').animate({
    top: height / 2 - 265
  }, 4000, 'easeOutElastic');
};

exports.default = StartMessage;

},{"./Helpers.js":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wall = function () {
  function Wall(color, rect, pos) {
    _classCallCheck(this, Wall);

    this.color = color ? color : 0xFFFFFF;

    this.wall = new PIXI.Graphics();
    this.wall.lineStyle(4, this.color, 1);
    this.wall.drawRect(rect[0], rect[1], rect[2], rect[3]);
    this.wall.endFill();
    this.wall.x = pos[0];
    this.wall.y = pos[1];
  }

  _createClass(Wall, [{
    key: "step",
    value: function step() {}
  }, {
    key: "getGraphics",
    value: function getGraphics() {
      return this.wall;
    }
  }]);

  return Wall;
}();

exports.default = Wall;

},{}],8:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _StartMessage = require('./StartMessage');

var _StartMessage2 = _interopRequireDefault(_StartMessage);

var _EndMessage = require('./EndMessage');

var _EndMessage2 = _interopRequireDefault(_EndMessage);

var _GameBar = require('./GameBar');

var _GameBar2 = _interopRequireDefault(_GameBar);

var _Helpers = require('./Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // Begin stats
  var stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  // console.log(stats);
  var dom = stats.domElement;
  dom.setAttribute('id', 'statsDiv');
  document.body.appendChild(dom);

  // Begin audio
  var background = new Howl({
    src: ['audio/riley.mp3'],
    autoplay: true,
    loop: true,
    volume: 1,
    onend: function onend() {}
  });

  // Begin render
  var type = "WebGL";

  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }

  // Create a stage and renderer and add to the DOM
  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { antialias: true, transparent: false, resolution: 1 });
  renderer.view.style.position = "absolute";
  renderer.view.style.display = "block";
  renderer.autoResize = true;
  renderer.backgroundColor = _Helpers.bgColor;
  document.body.appendChild(renderer.view);

  var gameBar = new _GameBar2.default();
  var g = new _Game2.default(stage, gameBar);

  var startGame = function startGame() {
    gameBar.init();
    gameBar.fillBar('white', 0);
    gameBar.setScore(0);
    gameBar.setPercentRemaining(100);
  };

  var restart = false;
  var end = null;
  var restartGame = function restartGame() {
    g.killAll();
    restart = true;
  };

  var start = new _StartMessage2.default(startGame.bind(undefined));

  var render = function render() {
    requestAnimationFrame(render);
    stats.begin();
    g.step();
    if (g.checkEndGame()) {
      if (!end) {
        end = new _EndMessage2.default(g.getScore(), restartGame.bind(undefined));
      }
    }

    if (restart) {
      if (g.numDots == 0) {
        gameBar.restart();
        stage = new PIXI.Container();
        g = new _Game2.default(stage, b, gameBar);
        end = null;
        restart = false;
      }
    }

    renderer.render(stage);
    stats.end();
  };

  render();
})();

},{"./EndMessage":2,"./Game":3,"./GameBar":4,"./Helpers":5,"./StartMessage":6}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvRW5kTWVzc2FnZS5qcyIsImpzL0dhbWUuanMiLCJqcy9HYW1lQmFyLmpzIiwianMvSGVscGVycy5qcyIsImpzL1N0YXJ0TWVzc2FnZS5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0lBRU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwscUJBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUws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RUFBb0I7QUFDbEIsZ0JBQVEsT0FBUjtBQUNBLGdCQUFRLElBQUksS0FBSyxTQUFULEVBQVI7QUFDQSxZQUFJLG1CQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUIsT0FBbkIsQ0FBSjtBQUNBLGNBQU0sSUFBTjtBQUNBLGtCQUFVLEtBQVY7QUFDRDtBQUNGOztBQUVELGFBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNBLFVBQU0sR0FBTjtBQUNILEdBdEJEOztBQXdCQTtBQUNELENBaEZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7c2NvcmVNdWx0fSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yYWQqc2NvcmVNdWx0O1xuXG4gICAgdGhpcy5kID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmQuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuZC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLmQuZW5kRmlsbCgpO1xuICAgIHRoaXMuZC54ID0gcFswXTtcbiAgICB0aGlzLmQueSA9IHBbMV07XG4gICAgdGhpcy5kLnZ4ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnZ5ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyLjU7XG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLmdyb3dpbmcgPSB0cnVlO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5ncm93aW5nKSB7XG4gICAgICB0aGlzLnNjYWxlICs9IC4wNTtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ncm93aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kLnggKz0gdGhpcy5kLnZ4O1xuICAgIHRoaXMuZC55ICs9IHRoaXMuZC52eTtcblxuICAgIHRoaXMuby54ID0gdGhpcy5kLnggLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMi41O1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIEVuZE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihzY29yZSwgcmVzdGFydENCKSB7XG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjZW5kQ29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTU1MFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICAgICAgY29uc29sZS5sb2coJ2hpaScpO1xuICAgICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCgnI3NoYWRlMicpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXN0YXJ0Q0IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2VuZENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogaGVpZ2h0LzItMjc1fSk7XG4gICAgJCgnI2VuZFNjb3JlJykudGV4dChwYXJzZUZsb2F0KHNjb3JlKS50b0ZpeGVkKDApKTtcblxuICAgICQoJyNzaGFkZTInKS5zaG93KCk7XG4gICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgb3BhY2l0eTogMVxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZE1lc3NhZ2U7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHsgYmdDb2xvciwgZG90Q29sb3JzLCBzdGFydERvdHMsIGRpc3RNdWx0LCBwYXRoQm9udXNMZW5ndGgsIG92ZXJsYXAsIGNvbGxpZGVDaXJjcywgY29sbGlkZVdhbGxzLCBieWVTb3VuZCB9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSwgZykge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmdhbWVCYXIgPSBnO1xuICAgIHRoaXMuc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UuYnV0dG9uTW9kZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVybW92ZScsIHRoaXMub25EcmFnTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZG90cyA9IFtdO1xuICAgIHRoaXMud2FsbHMgPSB7fTtcblxuICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICB0aGlzLmxpbmVDb2xvciA9IDB4ZmZmZmZmO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydERvdHMgPSBzdGFydERvdHM7XG4gICAgdGhpcy5udW1Eb3RzID0gMDtcbiAgICB0aGlzLmRvdENvbG9ycyA9IGRvdENvbG9ycztcblxuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMTtcblxuICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5wcmV2RGlzdCA9IDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGdldFNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICB9XG5cbiAga2lsbEFsbCgpIHtcbiAgICAgIHRoaXMuZG90cy5mb3JFYWNoKGQgPT4gZC5raWxsKCkpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgLy8gRGlzdHJpYnV0ZSBkb3RzIGluIGEgZ3JpZCB0byBlbnN1cmUgbm8gb3ZlcmxhcFxuICAgIC8vIGxldCBkaW0gPSBNYXRoLmZsb29yKE1hdGguc3FydCh0aGlzLnN0YXJ0RG90cykpO1xuICAgIC8vIGxldCBkaW0gPSBNYXRoLmZsb29yKE1hdGguc3FydCgzNSkpOyAvLyBiYXNlZCBvbiBtYXggcmFkaXVzIG9mIGRvdHNcbiAgICAvLyBsZXQgY291bnRXaWR0aCA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lcldpZHRoIC0gNTApLyhkaW0rMykpO1xuICAgIC8vIGxldCBjb3VudEhlaWdodCA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIDUwKS8oZGltKzMpKTtcbiAgICAvL1xuICAgIC8vIGZvciAobGV0IGkgPSA1MDsgaSA8IHdpbmRvdy5pbm5lcldpZHRoLTE7IGkrPWNvdW50V2lkdGgpIHtcbiAgICAvLyAgIGZvciAobGV0IGogPSA1MDsgaiA8IHdpbmRvdy5pbm5lckhlaWdodC0xOyBqKz1jb3VudEhlaWdodCkge1xuICAgIC8vICAgICAvLyBhbHdheXMgZ3VhcmFudGVlcyB0aGF0IHR3byBkb3RzIHdpbGwgYmUgbWFkZVxuICAgIC8vICAgICBpZiAoKGkgPT09IDUwICYmIGogPT09IDUwKSB8fCAoaSA9PT0gNTAgJiYgaiA9PT0gNTArY291bnRIZWlnaHQpKSB7XG4gICAgLy8gICAgICAgbGV0IGQxID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW2ksIGpdLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAvLyAgICAgICB0aGlzLmRvdHMucHVzaChkMSk7XG4gICAgLy8gICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgLy8gICAgICAgZDEuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSB7XG4gICAgLy8gICAgICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpO1xuICAgIC8vICAgICAgIGlmIChyID49IDAuNSkge1xuICAgIC8vICAgICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldLCBbaSwgal0sIE1hdGgucmFuZG9tKCkqMjArMTUpO1xuICAgIC8vICAgICAgICAgdGhpcy5kb3RzLnB1c2goZCk7XG4gICAgLy8gICAgICAgICB0aGlzLm51bURvdHMrKztcbiAgICAvLyAgICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfVxuXG4gICAgbGV0IHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgd2hpbGUgKHRoaXMubnVtRG90cyA8IHRoaXMuc3RhcnREb3RzKSB7XG4gICAgICAgIGxldCBwb3MgPSB7IHg6IDM1ICsgTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDcwKSwgeTogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKSB9O1xuICAgICAgICBsZXQgZCA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0sIFtwb3MueCwgcG9zLnldLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgICAgaWYgKG92ZXJsYXAoZC5kLngsIGQuZC55LCBkLnJhZCwgdGhpcy5kb3RzW2ldLmQueCwgdGhpcy5kb3RzW2ldLmQueSwgdGhpcy5kb3RzW2ldLnJhZCkpIHtcbiAgICAgICAgICAgICAgICByZXNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc2VsZWN0KSB7XG4gICAgICAgICAgICByZXNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb3RzLnB1c2goZCk7XG4gICAgICAgIHRoaXMubnVtRG90cysrO1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRXYWxscygpIHtcbiAgICBsZXQgd2FsbENvbG9yID0gYmdDb2xvcjtcbiAgICAvL2xldCB3YWxsQ29sb3IgPSB0aGlzLmRvdENvbG9ycztcblxuICAgIGxldCB3YWxsVG9wID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFRvcC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsTGVmdCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsTGVmdC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsQm90dG9tID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgd2luZG93LmlubmVySGVpZ2h0LTFdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxCb3R0b20uZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbFJpZ2h0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgW3dpbmRvdy5pbm5lcldpZHRoLTEsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxSaWdodC5nZXRHcmFwaGljcygpKTtcblxuICAgIHRoaXMud2FsbHMgPSB7dG9wOiB3YWxsVG9wLCBsZWZ0OiB3YWxsTGVmdCwgYm90dG9tOiB3YWxsQm90dG9tLCByaWdodDogd2FsbFJpZ2h0fTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyRG90cygpO1xuXG4gICAgLy8gUmVuZGVyIGxpbmUgZ3JhcGhpY3NcbiAgICB0aGlzLnJlbmRlckxpbmUoKTtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlTXVsdGlwbGllcigpO1xuXG4gICAgdGhpcy5yZW5kZXJEcmFnTGluZSgpO1xuICB9XG5cbiAgY2hlY2tFbmRHYW1lKCkge1xuICAgIC8vIENoZWNrIGlmICMgb2YgZG90cyBvZiBlYWNoIGNvbG9yIGFyZSBhbGwgMSBvciAwXG4gICAgbGV0IGNvbG9yQ291bnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29sb3JDb3VudC5wdXNoKDApO1xuICAgIH1cblxuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICBsZXQgY0lkeCA9IGRvdENvbG9ycy5pbmRleE9mKGQuY29sb3IpO1xuICAgICAgY29sb3JDb3VudFtjSWR4XSsrO1xuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kb3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb2xvckNvdW50KTtcblxuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBjb2xvckNvdW50LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGlmIChlIDw9IDEpIGNvdW50ZXIrKztcbiAgICB9KTtcblxuICAgIGlmIChjb3VudGVyID09PSBkb3RDb2xvcnMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIE9SIG5vIGxpbmUgbGVmdFxuICAgIGlmICh0aGlzLmxlbmd0aFJlbWFpbmluZyA8PSAwKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIE9SIGFsbCBkb3RzIGtpbGxlZFxuICAgIGlmICh0aGlzLm51bURvdHMgPT09IDApIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Q29sb3JJZHgoY29sb3IpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kb3RDb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoY29sb3IgPT09IHRoaXMuZG90Q29sb3JzW2ldKSByZXR1cm4gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHJlbmRlckRvdHMoKSB7XG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgIC8vIGxldCBkb3QgPSBkLmdldEdyYXBoaWNzKClbMF07XG5cbiAgICBjb2xsaWRlV2FsbHMoZCwgdGhpcy53YWxscyk7XG5cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIGNvbGxpZGVDaXJjcyhkLCB0aGlzLmRvdHNbal0pO1xuICAgICAgfVxuXG4gICAgICBkLnN0ZXAoKTtcblxuICAgICAgaWYgKGQuZGVhZCkge1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQoZSkpO1xuICAgICAgICB0aGlzLmRvdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLm51bURvdHMgLT0gMTtcbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyTGluZSgpIHtcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5tb3ZlVG8odGhpcy5saW5lRG90c1tpXS5kLngsIHRoaXMubGluZURvdHNbaV0uZC55KTtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVRvKHRoaXMubGluZURvdHNbaSsxXS5kLngsIHRoaXMubGluZURvdHNbaSsxXS5kLnkpO1xuICAgIH1cbiAgICB0aGlzLmxpbmVHcmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gIH1cblxuICByZW5kZXJEcmFnTGluZSgpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubW92ZVRvKHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC54LCB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueSk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVUbyh0aGlzLnBvcy54LCB0aGlzLnBvcy55KTtcbiAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY29yZU11bHRpcGxpZXIoKSB7XG4gICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID49IDEpIHtcbiAgICAgIGxldCBmcmFjID0gdGhpcy5saW5lRG90cy5sZW5ndGgvcGF0aEJvbnVzTGVuZ3RoO1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxICsgZnJhYyoyO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIGZyYWMqMTAwLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG4gICAgICB0aGlzLmdhbWVCYXIuZmlsbEJhcih0aGlzLmxpbmVDb2xvciwgMCk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgIGlmIChzdGFydCkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2goc3RhcnQpO1xuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IHN0YXJ0LmNvbG9yO1xuICAgICAgfVxuICB9XG5cbiAgb25EcmFnRW5kKCkge1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IHRvQWRkID0gMDtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgdG9BZGQgKz0gZC5raWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ5ZVNvdW5kLnBsYXkoKTtcblxuICAgICAgICB0aGlzLnNjb3JlICs9IHRvQWRkKnRoaXMuc2NvcmVNdWx0aXBsaWVyO1xuICAgICAgICB0aGlzLmdhbWVCYXIuc2V0U2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICB9XG5cbiAgb25EcmFnTW92ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgICAgICBsZXQgZHJhZ0Rpc3QgPSAodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKih0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtIE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZHJhZ0Rpc3QpKTtcbiAgICAgICAgICBsZXQgbWlkID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgICAgICBpZiAobWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gQ29ubmVjdCBkb3RzIG9mIHRoZSBzYW1lIGNvbG9yXG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBnb2luZyBiYWNrd2FyZCwgcmVtb3ZlIGxpbmVcbiAgICAgICAgICAgICAgICAgIGlmIChtaWQgPT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAyXSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5zcGxpY2UodGhpcy5saW5lRG90cy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgKz0gdGhpcy5wcmV2RGlzdDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcG9seWdvbiwgY2FuJ3QgY29ubmVjdFxuICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUG9seWdvbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENvbm5lY3QgdG8gbmV3IGRvdCBvciB0byBmaXJzdCBkb3QgKGNyZWF0aW5nIHBvbHlnb24pXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmluZExpbmVEb3QobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwIHx8IGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gMCkgdGhpcy5pc1BvbHlnb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IChtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZEaXN0ID0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkaXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmaW5kRG90KHBvcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgIGxldCBzbmFwUG9zID0geyB4OnRoaXMuZG90c1tpXS5kLngsIHk6dGhpcy5kb3RzW2ldLmQueSB9O1xuICAgICAgICAgIGxldCByYWQgPSB0aGlzLmRvdHNbaV0ucmFkO1xuICAgICAgICAgIGxldCBkaXN0ID0gKHBvcy54LXNuYXBQb3MueCkqKHBvcy54LXNuYXBQb3MueCkgK1xuICAgICAgICAgICAgICAgICAgICAgKHBvcy55LXNuYXBQb3MueSkqKHBvcy55LXNuYXBQb3MueSk7XG4gICAgICAgICAgaWYgKGRpc3QgPD0gcmFkKnJhZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5kb3RzW2ldICE9PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb3RzW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZpbmRMaW5lRG90KGRvdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGluZURvdHNbaV0gPT09IGRvdCkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNsYXNzIEdhbWVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNiYXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMTI1LCBib3R0b206IC04MH0pO1xuXG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gNTU0O1xuICAgIHRoaXMucmVzdGFydCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcjYmFyJykuYW5pbWF0ZSh7XG4gICAgICBib3R0b206IDMwXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICB9XG5cbiAgZmlsbEJhcihjb2xvciwgZmlsbFBlcmNlbnRhZ2UpIHtcbiAgICBjb2xvciA9IFwiI1wiICsgY29sb3IudG9TdHJpbmcoMTYpO1xuICAgIGZpbGxQZXJjZW50YWdlID0gTWF0aC5taW4oTWF0aC5tYXgoZmlsbFBlcmNlbnRhZ2UsIDAuMCksIDEwMC4wKTtcbiAgICBsZXQgbSA9IHRoaXMucGF0aExlbmd0aC8oLTEwMC4wKTtcbiAgICBsZXQgeSA9IG0qZmlsbFBlcmNlbnRhZ2UrdGhpcy5wYXRoTGVuZ3RoO1xuICAgICQoJyNiYXInKS5jc3Moe3N0cm9rZTogY29sb3IsIFwic3Ryb2tlLWRhc2hvZmZzZXRcIjogeX0pO1xuICB9XG5cbiAgc2V0U2NvcmUobmV3U2NvcmUpIHtcbiAgICB0aGlzLnNjb3JlID0gcGFyc2VGbG9hdChuZXdTY29yZSkudG9GaXhlZCgwKTtcbiAgICAkKHtjb3VudE51bTogdGhpcy5wcmV2U2NvcmV9KS5hbmltYXRlKHtjb3VudE51bTogdGhpcy5zY29yZX0sIHtcbiAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICBlYXNpbmc6J2xpbmVhcicsXG4gICAgICBzdGVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2hhdCB0b2RvIG9uIGV2ZXJ5IGNvdW50XG4gICAgICAgICQoJyNzY29yZScpLnRleHQocGFyc2VGbG9hdCh0aGlzLmNvdW50TnVtKS50b0ZpeGVkKDApKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLnByZXZTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRQZXJjZW50UmVtYWluaW5nKHJlbWFpbikge1xuICAgIHJlbWFpbiA9IE1hdGgubWluKE1hdGgubWF4KHJlbWFpbiwgMCksIDEwMCk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcbiAgICBpZiAocmVtYWluIDw9IDIwKSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3JlZCd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICd3aGl0ZSd9KTtcbiAgICB9XG4gIH1cblxuICByZXN0YXJ0KCkge1xuICAgIHRoaXMucHJldlNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KCcxMDAlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJhclxuIiwiZXhwb3J0IGNvbnN0IHN0YXJ0RG90cyA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lcldpZHRoIC0gNTApIC8gMTIwKSAqIE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIDUwKSAvIDEyMCk7XG5cbi8vIFNDT1JJTkdcbmV4cG9ydCBjb25zdCBkaXN0TXVsdCA9IC4wNTtcbmV4cG9ydCBjb25zdCBzY29yZU11bHQgPSAyO1xuZXhwb3J0IGNvbnN0IHBhdGhCb251c0xlbmd0aCA9IDc7XG5cbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG5cbmV4cG9ydCBjb25zdCBidXR0b25Tb3VuZCA9IG5ldyBIb3dsKHtcbiAgc3JjOiBbJ2F1ZGlvL2J1dHRvbi5tcDMnXSxcbiAgdm9sdW1lOiAxLFxuICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBieWVTb3VuZCA9IG5ldyBIb3dsKHtcbiAgc3JjOiBbJ2F1ZGlvL2J5ZS5tcDMnXSxcbiAgdm9sdW1lOiAxLFxuICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgfVxufSk7XG5cblxuZnVuY3Rpb24gb3ZlcmxhcCh4MSwgeTEsIHIxLCB4MiwgeTIsIHIyKSB7XG4gICAgbGV0IGR4ID0geDEgLSB4MjtcbiAgICBsZXQgZHkgPSB5MSAtIHkyO1xuICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcbiAgICBpZiAoZGlzdGFuY2UgPD0gcjEgKyByMikgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjb2xsaWRlQ2lyY3MoZG90MSwgZG90Mikge1xuICAgIGlmIChvdmVybGFwKGRvdDEuZC54LCBkb3QxLmQueSwgZG90MS5yYWQsIGRvdDIuZC54LCBkb3QyLmQueSwgZG90Mi5yYWQpKSB7XG4gICAgICAgIC8vIHRha2VuIGZyb20gaHR0cHM6Ly9nYW1lZGV2ZWxvcG1lbnQudHV0c3BsdXMuY29tL3R1dG9yaWFscy93aGVuLXdvcmxkcy1jb2xsaWRlLXNpbXVsYXRpbmctY2lyY2xlLWNpcmNsZS1jb2xsaXNpb25zLS1nYW1lZGV2LTc2OVxuICAgICAgICBsZXQgdmYxeCA9IGRvdDIuZC52eDtcbiAgICAgICAgbGV0IHZmMXkgPSBkb3QyLmQudnk7XG4gICAgICAgIGxldCB2ZjJ4ID0gZG90MS5kLnZ4O1xuICAgICAgICBsZXQgdmYyeSA9IGRvdDEuZC52eTtcblxuICAgICAgICBkb3QxLmQudnggPSB2ZjF4O1xuICAgICAgICBkb3QxLmQudnkgPSB2ZjF5O1xuICAgICAgICBkb3QyLmQudnggPSB2ZjJ4O1xuICAgICAgICBkb3QyLmQudnkgPSB2ZjJ5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29sbGlkZVdhbGxzKGRvdCwgd2FsbHMpIHtcbiAgICBsZXQgcmFkaXVzID0gZG90LnJhZDtcbiAgICBsZXQgZCA9IGRvdC5kO1xuICAgIGxldCBsZWZ0ID0gZC54IC0gcmFkaXVzO1xuICAgIGxldCByaWdodCA9IGQueCArIHJhZGl1cztcbiAgICBsZXQgdG9wID0gZC55IC0gcmFkaXVzO1xuICAgIGxldCBib3R0b20gPSBkLnkgKyByYWRpdXM7XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCBsZWZ0IHdhbGxcbiAgICBpZiAobGVmdCA8IDEgKSB7XG4gICAgICAgIGQudnggPSAtZC52eDtcbiAgICAgICAgLy8gZG90LmNvbG9yID0gd2FsbHMubGVmdC5jb2xvcjtcbiAgICAgICAgLy8gZC5iZWdpbkZpbGwod2FsbHMubGVmdC5jb2xvcik7XG4gICAgICAgIC8vIGQuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpO1xuICAgICAgICAvLyBkLmVuZEZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCByaWdodCB3YWxsXG4gICAgZWxzZSBpZiAocmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aC0xKSB7XG4gICAgICAgIGQudnggPSAtZC52eDtcbiAgICAgICAgLy8gZG90LmNvbG9yID0gd2FsbHMucmlnaHQuY29sb3I7XG4gICAgICAgIC8vIGQuYmVnaW5GaWxsKHdhbGxzLnJpZ2h0LmNvbG9yKTtcbiAgICAgICAgLy8gZC5kcmF3Q2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIC8vIGQuZW5kRmlsbCgpO1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRzIHdpdGggdG9wIHdhbGxcbiAgICBlbHNlIGlmICh0b3AgPCAxICkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgICAgIC8vIGRvdC5jb2xvciA9IHdhbGxzLnRvcC5jb2xvcjtcbiAgICAgICAgLy8gZC5iZWdpbkZpbGwod2FsbHMudG9wLmNvbG9yKTtcbiAgICAgICAgLy8gZC5kcmF3Q2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIC8vIGQuZW5kRmlsbCgpO1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIGJvdHRvbSB3YWxsXG4gICAgZWxzZSBpZiAoIGJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodC0xKSB7XG4gICAgICAgIGQudnkgPSAtZC52eTtcbiAgICAgICAgLy8gZG90LmNvbG9yID0gd2FsbHMuYm90dG9tLmNvbG9yO1xuICAgICAgICAvLyBkLmJlZ2luRmlsbCh3YWxscy5ib3R0b20uY29sb3IpO1xuICAgICAgICAvLyBkLmRyYXdDaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgLy8gZC5lbmRGaWxsKCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscyB9O1xuIiwiaW1wb3J0IHsgYnV0dG9uU291bmQgfSBmcm9tICcuL0hlbHBlcnMuanMnO1xuXG5jbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGJ1dHRvblNvdW5kLnBsYXkoKTtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBFbmRNZXNzYWdlIGZyb20gJy4vRW5kTWVzc2FnZSc7XG5pbXBvcnQgR2FtZUJhciBmcm9tICcuL0dhbWVCYXInO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuICAvLyBCZWdpbiBzdGF0c1xuICBsZXQgc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgc3RhdHMuc2hvd1BhbmVsKCAwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cbiAgLy8gY29uc29sZS5sb2coc3RhdHMpO1xuICBsZXQgZG9tID0gc3RhdHMuZG9tRWxlbWVudDtcbiAgZG9tLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHNEaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggZG9tICk7XG5cbiAgLy8gQmVnaW4gYXVkaW9cbiAgdmFyIGJhY2tncm91bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBbJ2F1ZGlvL3JpbGV5Lm1wMyddLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgdm9sdW1lOiAxLFxuICAgIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICAgIH1cbiAgfSk7XG5cbiAgLy8gQmVnaW4gcmVuZGVyXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgZ2FtZUJhciA9IG5ldyBHYW1lQmFyKCk7XG4gIGxldCBnID0gbmV3IEdhbWUoc3RhZ2UsIGdhbWVCYXIpO1xuXG4gIGxldCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZUJhci5pbml0KCk7XG4gICAgZ2FtZUJhci5maWxsQmFyKCd3aGl0ZScsIDApO1xuICAgIGdhbWVCYXIuc2V0U2NvcmUoMCk7XG4gICAgZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKDEwMCk7XG4gIH1cblxuICBsZXQgcmVzdGFydCA9IGZhbHNlO1xuICBsZXQgZW5kID0gbnVsbDtcbiAgbGV0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGcua2lsbEFsbCgpO1xuICAgIHJlc3RhcnQgPSB0cnVlO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gbmV3IFN0YXJ0TWVzc2FnZShzdGFydEdhbWUuYmluZCh0aGlzKSk7XG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgc3RhdHMuYmVnaW4oKTtcbiAgICAgIGcuc3RlcCgpO1xuICAgICAgaWYoZy5jaGVja0VuZEdhbWUoKSkge1xuICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgIGVuZCA9IG5ldyBFbmRNZXNzYWdlKGcuZ2V0U2NvcmUoKSwgcmVzdGFydEdhbWUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3RhcnQpIHtcbiAgICAgICAgaWYgKGcubnVtRG90cyA9PSAwKSB7XG4gICAgICAgICAgZ2FtZUJhci5yZXN0YXJ0KCk7XG4gICAgICAgICAgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgICBnID0gbmV3IEdhbWUoc3RhZ2UsIGIsIGdhbWVCYXIpO1xuICAgICAgICAgIGVuZCA9IG51bGw7XG4gICAgICAgICAgcmVzdGFydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gICAgICBzdGF0cy5lbmQoKTtcbiAgfVxuXG4gIHJlbmRlcigpO1xufSkoKTtcbiJdfQ==
