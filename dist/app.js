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
    this.o.x = p[0] - this.d.vx * 2;
    this.o.y = p[1] - this.d.vy * 2;
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

      this.o.x = this.d.x - this.d.vx * 2;
      this.o.y = this.d.y - this.d.vy * 2;

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
  function Game(stage, b, g) {
    _classCallCheck(this, Game);

    this.stage = stage;
    this.gameBar = g;
    this.stage.interactive = true;
    this.stage.buttonMode = true;
    this.stage.on('pointerdown', this.onDragStart.bind(this)).on('pointerup', this.onDragEnd.bind(this)).on('pointerupoutside', this.onDragEnd.bind(this)).on('pointermove', this.onDragMove.bind(this));
    this.b = b; // NOTE: never used

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

      this.startDots = Math.floor((window.innerWidth - 50) / 120) * Math.floor((window.innerHeight - 50) / 120);
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
          // this.b.hit(dot, this.dots[j].getGraphics()[0], true, true);
          // this.b.collideCircs(dot, this.dots[j].getGraphics()[0]);
          (0, _Helpers.collideCircs)(d, _this2.dots[j]);
          //console.log(this.dots[j].getGraphics()[0])
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
var startDots = exports.startDots = 35;
var distMult = exports.distMult = .01;
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

  var b = new Bump(PIXI);
  // let b = new ParticlePhysics();

  var gameBar = new _GameBar2.default();
  var g = new _Game2.default(stage, b, gameBar);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9FbmRNZXNzYWdlLmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7SUFFTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxxQkFBYjs7QUFFQSxTQUFLLENBQUwsR0FBUyxJQUFJLEtBQUssUUFBVCxFQUFUO0FBQ0EsU0FBSyxDQUFMLENBQU8sU0FBUCxDQUFpQixLQUFLLEtBQXRCO0FBQ0EsU0FBSyxDQUFMLENBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUFLLEdBQTdCO0FBQ0EsU0FBSyxDQUFMLENBQU8sT0FBUDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLEVBQVAsR0FBYSxLQUFLLE1BQUwsS0FBZ0IsQ0FBakIsR0FBc0IsQ0FBbEM7QUFDQSxTQUFL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WUFBWSxJQUFaLFdBQTdCLENBQU47QUFDRDtBQUNGOztBQUVELFFBQUksT0FBSixFQUFhO0FBQ1gsVUFBSSxFQUFFLE9BQUYsSUFBYSxDQUFqQixFQUFvQjtBQUNsQixnQkFBUSxPQUFSO0FBQ0EsZ0JBQVEsSUFBSSxLQUFLLFNBQVQsRUFBUjtBQUNBLFlBQUksbUJBQVMsS0FBVCxFQUFnQixDQUFoQixFQUFtQixPQUFuQixDQUFKO0FBQ0EsY0FBTSxJQUFOO0FBQ0Esa0JBQVUsS0FBVjtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0EsVUFBTSxHQUFOO0FBQ0gsR0F0QkQ7O0FBd0JBO0FBQ0QsQ0FuRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtzY29yZU11bHR9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIERvdCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3MsIHJhZCkge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRjAwMDA7XG4gICAgdGhpcy5yYWQgPSByYWQgPyByYWQgOiBNYXRoLnJhbmRvbSgpKjIwKzE1O1xuICAgIGxldCBwID0gcG9zID8gcG9zIDogW01hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCwgTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICB0aGlzLnNjYWxlID0gMDtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLnJhZCpzY29yZU11bHQ7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIEVuZE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihzY29yZSwgcmVzdGFydENCKSB7XG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjZW5kQ29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTU1MFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICAgICAgY29uc29sZS5sb2coJ2hpaScpO1xuICAgICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCgnI3NoYWRlMicpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXN0YXJ0Q0IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2VuZENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogaGVpZ2h0LzItMjc1fSk7XG4gICAgJCgnI2VuZFNjb3JlJykudGV4dChwYXJzZUZsb2F0KHNjb3JlKS50b0ZpeGVkKDApKTtcblxuICAgICQoJyNzaGFkZTInKS5zaG93KCk7XG4gICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgb3BhY2l0eTogMVxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZE1lc3NhZ2U7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHsgYmdDb2xvciwgZG90Q29sb3JzLCBzdGFydERvdHMsIGRpc3RNdWx0LCBwYXRoQm9udXNMZW5ndGgsIG92ZXJsYXAsIGNvbGxpZGVDaXJjcywgY29sbGlkZVdhbGxzLCBieWVTb3VuZCB9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSwgYiwgZykge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmdhbWVCYXIgPSBnO1xuICAgIHRoaXMuc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UuYnV0dG9uTW9kZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVybW92ZScsIHRoaXMub25EcmFnTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmIgPSBiOyAvLyBOT1RFOiBuZXZlciB1c2VkXG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0ge307XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnREb3RzID0gc3RhcnREb3RzO1xuICAgIHRoaXMubnVtRG90cyA9IDA7XG4gICAgdGhpcy5kb3RDb2xvcnMgPSBkb3RDb2xvcnM7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG5cbiAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMucHJldkRpc3QgPSAwO1xuXG4gICAgdGhpcy5pbml0V2FsbHMoKTtcbiAgICB0aGlzLmluaXREb3RzKCk7XG4gIH1cblxuICBnZXRTY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgfVxuXG4gIGtpbGxBbGwoKSB7XG4gICAgICB0aGlzLmRvdHMuZm9yRWFjaChkID0+IGQua2lsbCgpKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIC8vIERpc3RyaWJ1dGUgZG90cyBpbiBhIGdyaWQgdG8gZW5zdXJlIG5vIG92ZXJsYXBcbiAgICAvLyBsZXQgZGltID0gTWF0aC5mbG9vcihNYXRoLnNxcnQodGhpcy5zdGFydERvdHMpKTtcbiAgICAvLyBsZXQgZGltID0gTWF0aC5mbG9vcihNYXRoLnNxcnQoMzUpKTsgLy8gYmFzZWQgb24gbWF4IHJhZGl1cyBvZiBkb3RzXG4gICAgLy8gbGV0IGNvdW50V2lkdGggPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDUwKS8oZGltKzMpKTtcbiAgICAvLyBsZXQgY291bnRIZWlnaHQgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MCkvKGRpbSszKSk7XG4gICAgLy9cbiAgICAvLyBmb3IgKGxldCBpID0gNTA7IGkgPCB3aW5kb3cuaW5uZXJXaWR0aC0xOyBpKz1jb3VudFdpZHRoKSB7XG4gICAgLy8gICBmb3IgKGxldCBqID0gNTA7IGogPCB3aW5kb3cuaW5uZXJIZWlnaHQtMTsgais9Y291bnRIZWlnaHQpIHtcbiAgICAvLyAgICAgLy8gYWx3YXlzIGd1YXJhbnRlZXMgdGhhdCB0d28gZG90cyB3aWxsIGJlIG1hZGVcbiAgICAvLyAgICAgaWYgKChpID09PSA1MCAmJiBqID09PSA1MCkgfHwgKGkgPT09IDUwICYmIGogPT09IDUwK2NvdW50SGVpZ2h0KSkge1xuICAgIC8vICAgICAgIGxldCBkMSA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0sIFtpLCBqXSwgTWF0aC5yYW5kb20oKSoyMCsxNSk7XG4gICAgLy8gICAgICAgdGhpcy5kb3RzLnB1c2goZDEpO1xuICAgIC8vICAgICAgIHRoaXMubnVtRG90cysrO1xuICAgIC8vICAgICAgIGQxLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2Uge1xuICAgIC8vICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKTtcbiAgICAvLyAgICAgICBpZiAociA+PSAwLjUpIHtcbiAgICAvLyAgICAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW2ksIGpdLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAvLyAgICAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgIC8vICAgICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgLy8gICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHRoaXMuc3RhcnREb3RzID0gTWF0aC5mbG9vcigod2luZG93LmlubmVyV2lkdGggLSA1MCkgLyAxMjApICogTWF0aC5mbG9vcigod2luZG93LmlubmVySGVpZ2h0IC0gNTApIC8gMTIwKTtcbiAgICBsZXQgcmVzZWxlY3QgPSBmYWxzZTtcbiAgICB3aGlsZSAodGhpcy5udW1Eb3RzIDwgdGhpcy5zdGFydERvdHMpIHtcbiAgICAgICAgbGV0IHBvcyA9IHsgeDogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoIC0gNzApLCB5OiAzNSArIE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVySGVpZ2h0IC0gNzApIH07XG4gICAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW3Bvcy54LCBwb3MueV0sIE1hdGgucmFuZG9tKCkqMjArMTUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxhcChkLmQueCwgZC5kLnksIGQucmFkLCB0aGlzLmRvdHNbaV0uZC54LCB0aGlzLmRvdHNbaV0uZC55LCB0aGlzLmRvdHNbaV0ucmFkKSkge1xuICAgICAgICAgICAgICAgIHJlc2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzZWxlY3QpIHtcbiAgICAgICAgICAgIHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuICAgIC8vbGV0IHdhbGxDb2xvciA9IHRoaXMuZG90Q29sb3JzO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IHt0b3A6IHdhbGxUb3AsIGxlZnQ6IHdhbGxMZWZ0LCBib3R0b206IHdhbGxCb3R0b20sIHJpZ2h0OiB3YWxsUmlnaHR9O1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJEb3RzKCk7XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyTGluZSgpO1xuICAgIHRoaXMudXBkYXRlU2NvcmVNdWx0aXBsaWVyKCk7XG5cbiAgICB0aGlzLnJlbmRlckRyYWdMaW5lKCk7XG4gIH1cblxuICBjaGVja0VuZEdhbWUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgIyBvZiBkb3RzIG9mIGVhY2ggY29sb3IgYXJlIGFsbCAxIG9yIDBcbiAgICBsZXQgY29sb3JDb3VudCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb2xvckNvdW50LnB1c2goMCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgIGxldCBjSWR4ID0gZG90Q29sb3JzLmluZGV4T2YoZC5jb2xvcik7XG4gICAgICBjb2xvckNvdW50W2NJZHhdKys7XG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmRvdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvbG9yQ291bnQpO1xuXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGNvbG9yQ291bnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgPD0gMSkgY291bnRlcisrO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ZXIgPT09IGRvdENvbG9ycy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1Igbm8gbGluZSBsZWZ0XG4gICAgaWYgKHRoaXMubGVuZ3RoUmVtYWluaW5nIDw9IDApIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1IgYWxsIGRvdHMga2lsbGVkXG4gICAgaWYgKHRoaXMubnVtRG90cyA9PT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRDb2xvcklkeChjb2xvcikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjb2xvciA9PT0gdGhpcy5kb3RDb2xvcnNbaV0pIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmVuZGVyRG90cygpIHtcbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCwgaSkgPT4ge1xuICAgICAgLy8gbGV0IGRvdCA9IGQuZ2V0R3JhcGhpY3MoKVswXTtcblxuICAgIGNvbGxpZGVXYWxscyhkLCB0aGlzLndhbGxzKTtcblxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubnVtRG90czsgaisrKSB7XG4gICAgICAgIGlmIChpID09PSBqKSBjb250aW51ZTtcbiAgICAgICAgLy8gdGhpcy5iLmhpdChkb3QsIHRoaXMuZG90c1tqXS5nZXRHcmFwaGljcygpWzBdLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgLy8gdGhpcy5iLmNvbGxpZGVDaXJjcyhkb3QsIHRoaXMuZG90c1tqXS5nZXRHcmFwaGljcygpWzBdKTtcbiAgICAgICAgY29sbGlkZUNpcmNzKGQsIHRoaXMuZG90c1tqXSk7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5kb3RzW2pdLmdldEdyYXBoaWNzKClbMF0pXG4gICAgICB9XG5cbiAgICAgIGQuc3RlcCgpO1xuXG4gICAgICBpZiAoZC5kZWFkKSB7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5yZW1vdmVDaGlsZChlKSk7XG4gICAgICAgIHRoaXMuZG90cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMubnVtRG90cyAtPSAxO1xuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJMaW5lKCkge1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLmQueCwgdGhpcy5saW5lRG90c1tpXS5kLnkpO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lVG8odGhpcy5saW5lRG90c1tpKzFdLmQueCwgdGhpcy5saW5lRG90c1tpKzFdLmQueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgfVxuXG4gIHJlbmRlckRyYWdMaW5lKCkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5kcmFnTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgICAgdGhpcy5kcmFnTGluZS5tb3ZlVG8odGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLngsIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC55KTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVRvKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjb3JlTXVsdGlwbGllcigpIHtcbiAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPj0gMSkge1xuICAgICAgbGV0IGZyYWMgPSB0aGlzLmxpbmVEb3RzLmxlbmd0aC9wYXRoQm9udXNMZW5ndGg7XG4gICAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDEgKyBmcmFjKjI7XG4gICAgICB0aGlzLmdhbWVCYXIuZmlsbEJhcih0aGlzLmxpbmVDb2xvciwgZnJhYyoxMDAuMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMTtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCAwKTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIHRoaXMubGluZURvdHMucHVzaChzdGFydCk7XG4gICAgICAgIHRoaXMubGluZUNvbG9yID0gc3RhcnQuY29sb3I7XG4gICAgICB9XG4gIH1cblxuICBvbkRyYWdFbmQoKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID4gMSkge1xuICAgICAgICBsZXQgdG9BZGQgPSAwO1xuICAgICAgICB0aGlzLmxpbmVEb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICB0b0FkZCArPSBkLmtpbGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnllU291bmQucGxheSgpO1xuXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdG9BZGQqdGhpcy5zY29yZU11bHRpcGxpZXI7XG4gICAgICAgIHRoaXMuZ2FtZUJhci5zZXRTY29yZSh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmc7XG4gICAgICB9XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgICAgIGxldCBkcmFnRGlzdCA9ICh0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKih0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgdGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkcmFnRGlzdCkpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBDb25uZWN0IGRvdHMgb2YgdGhlIHNhbWUgY29sb3JcbiAgICAgICAgICAgICAgaWYgKG1pZC5jb2xvciA9PT0gdGhpcy5saW5lQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGdvaW5nIGJhY2t3YXJkLCByZW1vdmUgbGluZVxuICAgICAgICAgICAgICAgICAgaWYgKG1pZCA9PT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnNwbGljZSh0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyArPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwb2x5Z29uLCBjYW4ndCBjb25uZWN0XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ29ubmVjdCB0byBuZXcgZG90IG9yIHRvIGZpcnN0IGRvdCAoY3JlYXRpbmcgcG9seWdvbilcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5maW5kTGluZURvdChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDAgfHwgaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwKSB0aGlzLmlzUG9seWdvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkRpc3QgPSBNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC09IHRoaXMucHJldkRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMucHVzaChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgbGV0IGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZmluZExpbmVEb3QoZG90KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lRG90c1tpXSA9PT0gZG90KSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgR2FtZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2JhcicpLmNzcyh7bGVmdDogd2lkdGgvMi0xMjUsIGJvdHRvbTogLTgwfSk7XG5cbiAgICB0aGlzLnBhdGhMZW5ndGggPSA1NTQ7XG4gICAgdGhpcy5yZXN0YXJ0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGNvbG9yID0gXCIjXCIgKyBjb2xvci50b1N0cmluZygxNik7XG4gICAgZmlsbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihNYXRoLm1heChmaWxsUGVyY2VudGFnZSwgMC4wKSwgMTAwLjApO1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBzZXRTY29yZShuZXdTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSBwYXJzZUZsb2F0KG5ld1Njb3JlKS50b0ZpeGVkKDApO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dChwYXJzZUZsb2F0KHRoaXMuY291bnROdW0pLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluKSB7XG4gICAgcmVtYWluID0gTWF0aC5taW4oTWF0aC5tYXgocmVtYWluLCAwKSwgMTAwKTtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dChyZW1haW4gKyAnJScpO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5wcmV2U2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQoJzEwMCUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3Qgc3RhcnREb3RzID0gMzU7XG5leHBvcnQgY29uc3QgZGlzdE11bHQgPSAuMDE7XG5leHBvcnQgY29uc3Qgc2NvcmVNdWx0ID0gMjtcbmV4cG9ydCBjb25zdCBwYXRoQm9udXNMZW5ndGggPSA3O1xuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcblxuZXhwb3J0IGNvbnN0IGJ1dHRvblNvdW5kID0gbmV3IEhvd2woe1xuICBzcmM6IFsnYXVkaW8vYnV0dG9uLm1wMyddLFxuICB2b2x1bWU6IDEsXG4gIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGJ5ZVNvdW5kID0gbmV3IEhvd2woe1xuICBzcmM6IFsnYXVkaW8vYnllLm1wMyddLFxuICB2b2x1bWU6IDEsXG4gIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICB9XG59KTtcblxuXG5mdW5jdGlvbiBvdmVybGFwKHgxLCB5MSwgcjEsIHgyLCB5MiwgcjIpIHtcbiAgICBsZXQgZHggPSB4MSAtIHgyO1xuICAgIGxldCBkeSA9IHkxIC0geTI7XG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuICAgIGlmIChkaXN0YW5jZSA8PSByMSArIHIyKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVDaXJjcyhkb3QxLCBkb3QyKSB7XG4gICAgaWYgKG92ZXJsYXAoZG90MS5kLngsIGRvdDEuZC55LCBkb3QxLnJhZCwgZG90Mi5kLngsIGRvdDIuZC55LCBkb3QyLnJhZCkpIHtcbiAgICAgICAgLy8gdGFrZW4gZnJvbSBodHRwczovL2dhbWVkZXZlbG9wbWVudC50dXRzcGx1cy5jb20vdHV0b3JpYWxzL3doZW4td29ybGRzLWNvbGxpZGUtc2ltdWxhdGluZy1jaXJjbGUtY2lyY2xlLWNvbGxpc2lvbnMtLWdhbWVkZXYtNzY5XG4gICAgICAgIGxldCB2ZjF4ID0gZG90Mi5kLnZ4O1xuICAgICAgICBsZXQgdmYxeSA9IGRvdDIuZC52eTtcbiAgICAgICAgbGV0IHZmMnggPSBkb3QxLmQudng7XG4gICAgICAgIGxldCB2ZjJ5ID0gZG90MS5kLnZ5O1xuXG4gICAgICAgIGRvdDEuZC52eCA9IHZmMXg7XG4gICAgICAgIGRvdDEuZC52eSA9IHZmMXk7XG4gICAgICAgIGRvdDIuZC52eCA9IHZmMng7XG4gICAgICAgIGRvdDIuZC52eSA9IHZmMnk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb2xsaWRlV2FsbHMoZG90LCB3YWxscykge1xuICAgIGxldCByYWRpdXMgPSBkb3QucmFkO1xuICAgIGxldCBkID0gZG90LmQ7XG4gICAgbGV0IGxlZnQgPSBkLnggLSByYWRpdXM7XG4gICAgbGV0IHJpZ2h0ID0gZC54ICsgcmFkaXVzO1xuICAgIGxldCB0b3AgPSBkLnkgLSByYWRpdXM7XG4gICAgbGV0IGJvdHRvbSA9IGQueSArIHJhZGl1cztcblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIGxlZnQgd2FsbFxuICAgIGlmIChsZWZ0IDwgMSApIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgICAgICAvLyBkb3QuY29sb3IgPSB3YWxscy5sZWZ0LmNvbG9yO1xuICAgICAgICAvLyBkLmJlZ2luRmlsbCh3YWxscy5sZWZ0LmNvbG9yKTtcbiAgICAgICAgLy8gZC5kcmF3Q2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIC8vIGQuZW5kRmlsbCgpO1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIHJpZ2h0IHdhbGxcbiAgICBlbHNlIGlmIChyaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoLTEpIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgICAgICAvLyBkb3QuY29sb3IgPSB3YWxscy5yaWdodC5jb2xvcjtcbiAgICAgICAgLy8gZC5iZWdpbkZpbGwod2FsbHMucmlnaHQuY29sb3IpO1xuICAgICAgICAvLyBkLmRyYXdDaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgLy8gZC5lbmRGaWxsKCk7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZHMgd2l0aCB0b3Agd2FsbFxuICAgIGVsc2UgaWYgKHRvcCA8IDEgKSB7XG4gICAgICAgIGQudnkgPSAtZC52eTtcbiAgICAgICAgLy8gZG90LmNvbG9yID0gd2FsbHMudG9wLmNvbG9yO1xuICAgICAgICAvLyBkLmJlZ2luRmlsbCh3YWxscy50b3AuY29sb3IpO1xuICAgICAgICAvLyBkLmRyYXdDaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgLy8gZC5lbmRGaWxsKCk7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggYm90dG9tIHdhbGxcbiAgICBlbHNlIGlmICggYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0LTEpIHtcbiAgICAgICAgZC52eSA9IC1kLnZ5O1xuICAgICAgICAvLyBkb3QuY29sb3IgPSB3YWxscy5ib3R0b20uY29sb3I7XG4gICAgICAgIC8vIGQuYmVnaW5GaWxsKHdhbGxzLmJvdHRvbS5jb2xvcik7XG4gICAgICAgIC8vIGQuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpO1xuICAgICAgICAvLyBkLmVuZEZpbGwoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IG92ZXJsYXAsIGNvbGxpZGVDaXJjcywgY29sbGlkZVdhbGxzIH07XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIFN0YXJ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGNiKSB7XG4gICAgLy8gdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgYnV0dG9uU291bmQucGxheSgpO1xuICAgICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTUzMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gICAgICAkKCcjc2hhZGUnKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IC01MzB9KTtcblxuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgdG9wOiBoZWlnaHQvMi0yNjVcbiAgICB9LCA0MDAwLCAnZWFzZU91dEVsYXN0aWMnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydE1lc3NhZ2U7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTdGFydE1lc3NhZ2UgZnJvbSAnLi9TdGFydE1lc3NhZ2UnO1xuaW1wb3J0IEVuZE1lc3NhZ2UgZnJvbSAnLi9FbmRNZXNzYWdlJztcbmltcG9ydCBHYW1lQmFyIGZyb20gJy4vR2FtZUJhcic7XG5pbXBvcnQge2JnQ29sb3J9IGZyb20gJy4vSGVscGVycyc7XG5cbigoKSA9PiB7XG4gIC8vIEJlZ2luIHN0YXRzXG4gIGxldCBzdGF0cyA9IG5ldyBTdGF0cygpO1xuICBzdGF0cy5zaG93UGFuZWwoIDApOyAvLyAwOiBmcHMsIDE6IG1zLCAyOiBtYiwgMys6IGN1c3RvbVxuICAvLyBjb25zb2xlLmxvZyhzdGF0cyk7XG4gIGxldCBkb20gPSBzdGF0cy5kb21FbGVtZW50O1xuICBkb20uc2V0QXR0cmlidXRlKCdpZCcsICdzdGF0c0RpdicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBkb20gKTtcblxuICAvLyBCZWdpbiBhdWRpb1xuICB2YXIgYmFja2dyb3VuZCA9IG5ldyBIb3dsKHtcbiAgICBzcmM6IFsnYXVkaW8vcmlsZXkubXAzJ10sXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICB2b2x1bWU6IDEsXG4gICAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgfVxuICB9KTtcblxuICAvLyBCZWdpbiByZW5kZXJcbiAgbGV0IHR5cGUgPSBcIldlYkdMXCI7XG5cbiAgaWYoIVBJWEkudXRpbHMuaXNXZWJHTFN1cHBvcnRlZCgpKSB7XG4gICAgICB0eXBlID0gXCJjYW52YXNcIjtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHN0YWdlIGFuZCByZW5kZXJlciBhbmQgYWRkIHRvIHRoZSBET01cbiAgbGV0IHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIGxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMX0pO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIGxldCBiID0gbmV3IEJ1bXAoUElYSSk7XG4gIC8vIGxldCBiID0gbmV3IFBhcnRpY2xlUGh5c2ljcygpO1xuXG4gIGxldCBnYW1lQmFyID0gbmV3IEdhbWVCYXIoKTtcbiAgbGV0IGcgPSBuZXcgR2FtZShzdGFnZSwgYiwgZ2FtZUJhcik7XG5cbiAgbGV0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lQmFyLmluaXQoKTtcbiAgICBnYW1lQmFyLmZpbGxCYXIoJ3doaXRlJywgMCk7XG4gICAgZ2FtZUJhci5zZXRTY29yZSgwKTtcbiAgICBnYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcoMTAwKTtcbiAgfVxuXG4gIGxldCByZXN0YXJ0ID0gZmFsc2U7XG4gIGxldCBlbmQgPSBudWxsO1xuICBsZXQgcmVzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZy5raWxsQWxsKCk7XG4gICAgcmVzdGFydCA9IHRydWU7XG4gIH1cblxuICBsZXQgc3RhcnQgPSBuZXcgU3RhcnRNZXNzYWdlKHN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBzdGF0cy5iZWdpbigpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICBpZihnLmNoZWNrRW5kR2FtZSgpKSB7XG4gICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgZW5kID0gbmV3IEVuZE1lc3NhZ2UoZy5nZXRTY29yZSgpLCByZXN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzdGFydCkge1xuICAgICAgICBpZiAoZy5udW1Eb3RzID09IDApIHtcbiAgICAgICAgICBnYW1lQmFyLnJlc3RhcnQoKTtcbiAgICAgICAgICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgICAgIGcgPSBuZXcgR2FtZShzdGFnZSwgYiwgZ2FtZUJhcik7XG4gICAgICAgICAgZW5kID0gbnVsbDtcbiAgICAgICAgICByZXN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbiAgICAgIHN0YXRzLmVuZCgpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59KSgpO1xuIl19
