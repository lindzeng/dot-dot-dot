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
var polygonScore = exports.polygonScore = 50;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvRW5kTWVzc2FnZS5qcyIsImpzL0dhbWUuanMiLCJqcy9HYW1lQmFyLmpzIiwianMvSGVscGVycy5qcyIsImpzL1N0YXJ0TWVzc2FnZS5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0lBRU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwscUJBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUws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LEVBQUUsT0FBRixJQUFhLENBQWpCLEVBQW9CO0FBQ2xCLGdCQUFRLE9BQVI7QUFDQSxnQkFBUSxJQUFJLEtBQUssU0FBVCxFQUFSO0FBQ0EsWUFBSSxtQkFBUyxLQUFULEVBQWdCLENBQWhCLEVBQW1CLE9BQW5CLENBQUo7QUFDQSxjQUFNLElBQU47QUFDQSxrQkFBVSxLQUFWO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEI7QUFDQSxVQUFNLEdBQU47QUFDSCxHQXRCRDs7QUF3QkE7QUFDRCxDQWhGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3Njb3JlTXVsdH0gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgRG90IHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvcywgcmFkKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGMDAwMDtcbiAgICB0aGlzLnJhZCA9IHJhZCA/IHJhZCA6IE1hdGgucmFuZG9tKCkqMjArMTU7XG4gICAgbGV0IHAgPSBwb3MgPyBwb3MgOiBbTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoLCBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIHRoaXMuc2NhbGUgPSAwO1xuXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucmFkKnNjb3JlTXVsdDtcblxuICAgIHRoaXMuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5kLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLmQuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5kLmVuZEZpbGwoKTtcbiAgICB0aGlzLmQueCA9IHBbMF07XG4gICAgdGhpcy5kLnkgPSBwWzFdO1xuICAgIHRoaXMuZC52eCA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC52eSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMubyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5vLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApOyAgLy8gKHRoaWNrbmVzcywgY29sb3IpXG4gICAgdGhpcy5vLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuby5lbmRGaWxsKCk7XG4gICAgdGhpcy5vLnggPSBwWzBdIC0gdGhpcy5kLnZ4KjIuNTtcbiAgICB0aGlzLm8ueSA9IHBbMV0gLSB0aGlzLmQudnkqMi41O1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjIuNTtcbiAgICB0aGlzLm8ueSA9IHRoaXMuZC55IC0gdGhpcy5kLnZ5KjIuNTtcblxuICAgIGlmICh0aGlzLmtpbGxlZCkge1xuICAgICAgdGhpcy5zY2FsZSAtPSAuMjtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IC0uMDA1KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjYWxlcygpIHtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuXG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgfVxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gW3RoaXMuZCwgdGhpcy5vXTtcbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgdGhpcy5raWxsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG90O1xuIiwiaW1wb3J0IHsgYnV0dG9uU291bmQgfSBmcm9tICcuL0hlbHBlcnMuanMnO1xuXG5jbGFzcyBFbmRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3Ioc2NvcmUsIHJlc3RhcnRDQikge1xuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgYnV0dG9uU291bmQucGxheSgpO1xuICAgICAgJCgnI2VuZENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01NTBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgICAgIGNvbnNvbGUubG9nKCdoaWknKTtcbiAgICAgICQoJyNzaGFkZTInKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICQoJyNzaGFkZTInKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgcmVzdGFydENCKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNlbmRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IGhlaWdodC8yLTI3NX0pO1xuICAgICQoJyNlbmRTY29yZScpLnRleHQocGFyc2VGbG9hdChzY29yZSkudG9GaXhlZCgwKSk7XG5cbiAgICAkKCcjc2hhZGUyJykuc2hvdygpO1xuICAgICQoJyNzaGFkZTInKS5hbmltYXRlKHtcbiAgICAgIG9wYWNpdHk6IDFcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmRNZXNzYWdlO1xuIiwiaW1wb3J0IERvdCBmcm9tICcuL0RvdCdcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcbmltcG9ydCB7IGJnQ29sb3IsIGRvdENvbG9ycywgc3RhcnREb3RzLCBkaXN0TXVsdCwgcGF0aEJvbnVzTGVuZ3RoLCBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscywgYnllU291bmQgfSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Ioc3RhZ2UsIGcpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5nYW1lQmFyID0gZztcbiAgICB0aGlzLnN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2Uub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCB0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0ge307XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnREb3RzID0gc3RhcnREb3RzO1xuICAgIHRoaXMubnVtRG90cyA9IDA7XG4gICAgdGhpcy5kb3RDb2xvcnMgPSBkb3RDb2xvcnM7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG5cbiAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMucHJldkRpc3QgPSAwO1xuXG4gICAgdGhpcy5pbml0V2FsbHMoKTtcbiAgICB0aGlzLmluaXREb3RzKCk7XG4gIH1cblxuICBnZXRTY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgfVxuXG4gIGtpbGxBbGwoKSB7XG4gICAgICB0aGlzLmRvdHMuZm9yRWFjaChkID0+IGQua2lsbCgpKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIC8vIERpc3RyaWJ1dGUgZG90cyBpbiBhIGdyaWQgdG8gZW5zdXJlIG5vIG92ZXJsYXBcbiAgICAvLyBsZXQgZGltID0gTWF0aC5mbG9vcihNYXRoLnNxcnQodGhpcy5zdGFydERvdHMpKTtcbiAgICAvLyBsZXQgZGltID0gTWF0aC5mbG9vcihNYXRoLnNxcnQoMzUpKTsgLy8gYmFzZWQgb24gbWF4IHJhZGl1cyBvZiBkb3RzXG4gICAgLy8gbGV0IGNvdW50V2lkdGggPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDUwKS8oZGltKzMpKTtcbiAgICAvLyBsZXQgY291bnRIZWlnaHQgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MCkvKGRpbSszKSk7XG4gICAgLy9cbiAgICAvLyBmb3IgKGxldCBpID0gNTA7IGkgPCB3aW5kb3cuaW5uZXJXaWR0aC0xOyBpKz1jb3VudFdpZHRoKSB7XG4gICAgLy8gICBmb3IgKGxldCBqID0gNTA7IGogPCB3aW5kb3cuaW5uZXJIZWlnaHQtMTsgais9Y291bnRIZWlnaHQpIHtcbiAgICAvLyAgICAgLy8gYWx3YXlzIGd1YXJhbnRlZXMgdGhhdCB0d28gZG90cyB3aWxsIGJlIG1hZGVcbiAgICAvLyAgICAgaWYgKChpID09PSA1MCAmJiBqID09PSA1MCkgfHwgKGkgPT09IDUwICYmIGogPT09IDUwK2NvdW50SGVpZ2h0KSkge1xuICAgIC8vICAgICAgIGxldCBkMSA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0sIFtpLCBqXSwgTWF0aC5yYW5kb20oKSoyMCsxNSk7XG4gICAgLy8gICAgICAgdGhpcy5kb3RzLnB1c2goZDEpO1xuICAgIC8vICAgICAgIHRoaXMubnVtRG90cysrO1xuICAgIC8vICAgICAgIGQxLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2Uge1xuICAgIC8vICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKTtcbiAgICAvLyAgICAgICBpZiAociA+PSAwLjUpIHtcbiAgICAvLyAgICAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW2ksIGpdLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAvLyAgICAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgIC8vICAgICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgLy8gICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIGxldCByZXNlbGVjdCA9IGZhbHNlO1xuICAgIHdoaWxlICh0aGlzLm51bURvdHMgPCB0aGlzLnN0YXJ0RG90cykge1xuICAgICAgICBsZXQgcG9zID0geyB4OiAzNSArIE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggLSA3MCksIHk6IDM1ICsgTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCkgfTtcbiAgICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldLCBbcG9zLngsIHBvcy55XSwgTWF0aC5yYW5kb20oKSoyMCsxNSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvdmVybGFwKGQuZC54LCBkLmQueSwgZC5yYWQsIHRoaXMuZG90c1tpXS5kLngsIHRoaXMuZG90c1tpXS5kLnksIHRoaXMuZG90c1tpXS5yYWQpKSB7XG4gICAgICAgICAgICAgICAgcmVzZWxlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNlbGVjdCkge1xuICAgICAgICAgICAgcmVzZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgICAgICB0aGlzLm51bURvdHMrKztcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLmFkZENoaWxkKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbml0V2FsbHMoKSB7XG4gICAgbGV0IHdhbGxDb2xvciA9IGJnQ29sb3I7XG4gICAgLy9sZXQgd2FsbENvbG9yID0gdGhpcy5kb3RDb2xvcnM7XG5cbiAgICBsZXQgd2FsbFRvcCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxUb3AuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbExlZnQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbExlZnQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbEJvdHRvbSA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIHdpbmRvdy5pbm5lckhlaWdodC0xXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsQm90dG9tLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxSaWdodCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFt3aW5kb3cuaW5uZXJXaWR0aC0xLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsUmlnaHQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICB0aGlzLndhbGxzID0ge3RvcDogd2FsbFRvcCwgbGVmdDogd2FsbExlZnQsIGJvdHRvbTogd2FsbEJvdHRvbSwgcmlnaHQ6IHdhbGxSaWdodH07XG4gIH1cblxuICBzdGVwKCkge1xuICAgIC8vIFJlbmRlciBkb3QgZ3JhcGhpY3NcbiAgICB0aGlzLnJlbmRlckRvdHMoKTtcblxuICAgIC8vIFJlbmRlciBsaW5lIGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJMaW5lKCk7XG4gICAgdGhpcy51cGRhdGVTY29yZU11bHRpcGxpZXIoKTtcblxuICAgIHRoaXMucmVuZGVyRHJhZ0xpbmUoKTtcbiAgfVxuXG4gIGNoZWNrRW5kR2FtZSgpIHtcbiAgICAvLyBDaGVjayBpZiAjIG9mIGRvdHMgb2YgZWFjaCBjb2xvciBhcmUgYWxsIDEgb3IgMFxuICAgIGxldCBjb2xvckNvdW50ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb3RDb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbG9yQ291bnQucHVzaCgwKTtcbiAgICB9XG5cbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgbGV0IGNJZHggPSBkb3RDb2xvcnMuaW5kZXhPZihkLmNvbG9yKTtcbiAgICAgIGNvbG9yQ291bnRbY0lkeF0rKztcbiAgICB9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZG90cyk7XG4gICAgLy8gY29uc29sZS5sb2coY29sb3JDb3VudCk7XG5cbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgY29sb3JDb3VudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZSA8PSAxKSBjb3VudGVyKys7XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnRlciA9PT0gZG90Q29sb3JzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBubyBsaW5lIGxlZnRcbiAgICBpZiAodGhpcy5sZW5ndGhSZW1haW5pbmcgPD0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBhbGwgZG90cyBraWxsZWRcbiAgICBpZiAodGhpcy5udW1Eb3RzID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldENvbG9ySWR4KGNvbG9yKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNvbG9yID09PSB0aGlzLmRvdENvbG9yc1tpXSkgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cblxuICByZW5kZXJEb3RzKCkge1xuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAvLyBsZXQgZG90ID0gZC5nZXRHcmFwaGljcygpWzBdO1xuXG4gICAgY29sbGlkZVdhbGxzKGQsIHRoaXMud2FsbHMpO1xuXG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICBjb2xsaWRlQ2lyY3MoZCwgdGhpcy5kb3RzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZC5zdGVwKCk7XG5cbiAgICAgIGlmIChkLmRlYWQpIHtcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgICAgdGhpcy5kb3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzIC09IDE7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckxpbmUoKSB7XG4gICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0uZC54LCB0aGlzLmxpbmVEb3RzW2ldLmQueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0uZC54LCB0aGlzLmxpbmVEb3RzW2krMV0uZC55KTtcbiAgICB9XG4gICAgdGhpcy5saW5lR3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICB9XG5cbiAgcmVuZGVyRHJhZ0xpbmUoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmRyYWdMaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLm1vdmVUbyh0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueCwgdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLnkpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lVG8odGhpcy5wb3MueCwgdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NvcmVNdWx0aXBsaWVyKCkge1xuICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgZnJhYyA9IHRoaXMubGluZURvdHMubGVuZ3RoL3BhdGhCb251c0xlbmd0aDtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMSArIGZyYWMqMjtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCBmcmFjKjEwMC4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBzdGFydC5jb2xvcjtcbiAgICAgIH1cbiAgfVxuXG4gIG9uRHJhZ0VuZCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCB0b0FkZCA9IDA7XG4gICAgICAgIHRoaXMubGluZURvdHMuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgIHRvQWRkICs9IGQua2lsbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBieWVTb3VuZC5wbGF5KCk7XG5cbiAgICAgICAgdGhpcy5zY29yZSArPSB0b0FkZCp0aGlzLnNjb3JlTXVsdGlwbGllcjtcbiAgICAgICAgdGhpcy5nYW1lQmFyLnNldFNjb3JlKHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZztcbiAgICAgIH1cbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgfVxuXG4gIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICAgICAgbGV0IGRyYWdEaXN0ID0gKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICArICh0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgLSBNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRyYWdEaXN0KSk7XG4gICAgICAgICAgbGV0IG1pZCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICAgICAgaWYgKG1pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIENvbm5lY3QgZG90cyBvZiB0aGUgc2FtZSBjb2xvclxuICAgICAgICAgICAgICBpZiAobWlkLmNvbG9yID09PSB0aGlzLmxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZ29pbmcgYmFja3dhcmQsIHJlbW92ZSBsaW5lXG4gICAgICAgICAgICAgICAgICBpZiAobWlkID09PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMuc3BsaWNlKHRoaXMubGluZURvdHMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nICs9IHRoaXMucHJldkRpc3Q7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHBvbHlnb24sIGNhbid0IGNvbm5lY3RcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1BvbHlnb24pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBDb25uZWN0IHRvIG5ldyBkb3Qgb3IgdG8gZmlyc3QgZG90IChjcmVhdGluZyBwb2x5Z29uKVxuICAgICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLmZpbmRMaW5lRG90KG1pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gMCB8fCBpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDApIHRoaXMuaXNQb2x5Z29uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKihtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIChtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2RGlzdCA9IE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZGlzdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgLT0gdGhpcy5wcmV2RGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKG1pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgZmluZERvdChwb3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICBsZXQgc25hcFBvcyA9IHsgeDp0aGlzLmRvdHNbaV0uZC54LCB5OnRoaXMuZG90c1tpXS5kLnkgfTtcbiAgICAgICAgICBsZXQgcmFkID0gdGhpcy5kb3RzW2ldLnJhZDtcbiAgICAgICAgICBsZXQgZGlzdCA9IChwb3MueC1zbmFwUG9zLngpKihwb3MueC1zbmFwUG9zLngpICtcbiAgICAgICAgICAgICAgICAgICAgIChwb3MueS1zbmFwUG9zLnkpKihwb3MueS1zbmFwUG9zLnkpO1xuICAgICAgICAgIGlmIChkaXN0IDw9IHJhZCpyYWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZG90c1tpXSAhPT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG90c1tpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmaW5kTGluZURvdChkb3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmxpbmVEb3RzW2ldID09PSBkb3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBHYW1lQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjYmFyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTEyNSwgYm90dG9tOiAtODB9KTtcblxuICAgIHRoaXMucGF0aExlbmd0aCA9IDU1NDtcbiAgICB0aGlzLnJlc3RhcnQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnI2JhcicpLmFuaW1hdGUoe1xuICAgICAgYm90dG9tOiAzMFxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgfVxuXG4gIGZpbGxCYXIoY29sb3IsIGZpbGxQZXJjZW50YWdlKSB7XG4gICAgY29sb3IgPSBcIiNcIiArIGNvbG9yLnRvU3RyaW5nKDE2KTtcbiAgICBmaWxsUGVyY2VudGFnZSA9IE1hdGgubWluKE1hdGgubWF4KGZpbGxQZXJjZW50YWdlLCAwLjApLCAxMDAuMCk7XG4gICAgbGV0IG0gPSB0aGlzLnBhdGhMZW5ndGgvKC0xMDAuMCk7XG4gICAgbGV0IHkgPSBtKmZpbGxQZXJjZW50YWdlK3RoaXMucGF0aExlbmd0aDtcbiAgICAkKCcjYmFyJykuY3NzKHtzdHJva2U6IGNvbG9yLCBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IHl9KTtcbiAgfVxuXG4gIHNldFNjb3JlKG5ld1Njb3JlKSB7XG4gICAgdGhpcy5zY29yZSA9IHBhcnNlRmxvYXQobmV3U2NvcmUpLnRvRml4ZWQoMCk7XG4gICAgJCh7Y291bnROdW06IHRoaXMucHJldlNjb3JlfSkuYW5pbWF0ZSh7Y291bnROdW06IHRoaXMuc2NvcmV9LCB7XG4gICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgZWFzaW5nOidsaW5lYXInLFxuICAgICAgc3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdoYXQgdG9kbyBvbiBldmVyeSBjb3VudFxuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHBhcnNlRmxvYXQodGhpcy5jb3VudE51bSkudG9GaXhlZCgwKSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5wcmV2U2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0UGVyY2VudFJlbWFpbmluZyhyZW1haW4pIHtcbiAgICByZW1haW4gPSBNYXRoLm1pbihNYXRoLm1heChyZW1haW4sIDApLCAxMDApO1xuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KHJlbWFpbiArICclJyk7XG4gICAgaWYgKHJlbWFpbiA8PSAyMCkge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICdyZWQnfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAnd2hpdGUnfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnByZXZTY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dCgnMTAwJScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCYXJcbiIsImV4cG9ydCBjb25zdCBzdGFydERvdHMgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDUwKSAvIDEyMCkgKiBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MCkgLyAxMjApO1xuXG4vLyBTQ09SSU5HXG5leHBvcnQgY29uc3QgZGlzdE11bHQgPSAuMDU7XG5leHBvcnQgY29uc3Qgc2NvcmVNdWx0ID0gMjtcbmV4cG9ydCBjb25zdCBwYXRoQm9udXNMZW5ndGggPSA3O1xuZXhwb3J0IGNvbnN0IHBvbHlnb25TY29yZSA9IDUwO1xuXG5leHBvcnQgY29uc3QgZG90Q29sb3JzID0gWzB4RjlGNzUxLCAweDM1Q0EzNywgMHhBRTM0QzksIDB4MkU1RUM5LCAweENBMzY2M107XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IDB4ZmZmZGYzO1xuXG5leHBvcnQgY29uc3QgYnV0dG9uU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9idXR0b24ubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgYnllU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9ieWUubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIG92ZXJsYXAoeDEsIHkxLCByMSwgeDIsIHkyLCByMikge1xuICAgIGxldCBkeCA9IHgxIC0geDI7XG4gICAgbGV0IGR5ID0geTEgLSB5MjtcbiAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG4gICAgaWYgKGRpc3RhbmNlIDw9IHIxICsgcjIpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29sbGlkZUNpcmNzKGRvdDEsIGRvdDIpIHtcbiAgICBpZiAob3ZlcmxhcChkb3QxLmQueCwgZG90MS5kLnksIGRvdDEucmFkLCBkb3QyLmQueCwgZG90Mi5kLnksIGRvdDIucmFkKSkge1xuICAgICAgICAvLyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2FtZWRldmVsb3BtZW50LnR1dHNwbHVzLmNvbS90dXRvcmlhbHMvd2hlbi13b3JsZHMtY29sbGlkZS1zaW11bGF0aW5nLWNpcmNsZS1jaXJjbGUtY29sbGlzaW9ucy0tZ2FtZWRldi03NjlcbiAgICAgICAgbGV0IHZmMXggPSBkb3QyLmQudng7XG4gICAgICAgIGxldCB2ZjF5ID0gZG90Mi5kLnZ5O1xuICAgICAgICBsZXQgdmYyeCA9IGRvdDEuZC52eDtcbiAgICAgICAgbGV0IHZmMnkgPSBkb3QxLmQudnk7XG5cbiAgICAgICAgZG90MS5kLnZ4ID0gdmYxeDtcbiAgICAgICAgZG90MS5kLnZ5ID0gdmYxeTtcbiAgICAgICAgZG90Mi5kLnZ4ID0gdmYyeDtcbiAgICAgICAgZG90Mi5kLnZ5ID0gdmYyeTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVXYWxscyhkb3QsIHdhbGxzKSB7XG4gICAgbGV0IHJhZGl1cyA9IGRvdC5yYWQ7XG4gICAgbGV0IGQgPSBkb3QuZDtcbiAgICBsZXQgbGVmdCA9IGQueCAtIHJhZGl1cztcbiAgICBsZXQgcmlnaHQgPSBkLnggKyByYWRpdXM7XG4gICAgbGV0IHRvcCA9IGQueSAtIHJhZGl1cztcbiAgICBsZXQgYm90dG9tID0gZC55ICsgcmFkaXVzO1xuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggbGVmdCB3YWxsXG4gICAgaWYgKGxlZnQgPCAxICkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgICAgIC8vIGRvdC5jb2xvciA9IHdhbGxzLmxlZnQuY29sb3I7XG4gICAgICAgIC8vIGQuYmVnaW5GaWxsKHdhbGxzLmxlZnQuY29sb3IpO1xuICAgICAgICAvLyBkLmRyYXdDaXJjbGUoMCwgMCwgcmFkaXVzKTtcbiAgICAgICAgLy8gZC5lbmRGaWxsKCk7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggcmlnaHQgd2FsbFxuICAgIGVsc2UgaWYgKHJpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgtMSkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgICAgIC8vIGRvdC5jb2xvciA9IHdhbGxzLnJpZ2h0LmNvbG9yO1xuICAgICAgICAvLyBkLmJlZ2luRmlsbCh3YWxscy5yaWdodC5jb2xvcik7XG4gICAgICAgIC8vIGQuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpO1xuICAgICAgICAvLyBkLmVuZEZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkcyB3aXRoIHRvcCB3YWxsXG4gICAgZWxzZSBpZiAodG9wIDwgMSApIHtcbiAgICAgICAgZC52eSA9IC1kLnZ5O1xuICAgICAgICAvLyBkb3QuY29sb3IgPSB3YWxscy50b3AuY29sb3I7XG4gICAgICAgIC8vIGQuYmVnaW5GaWxsKHdhbGxzLnRvcC5jb2xvcik7XG4gICAgICAgIC8vIGQuZHJhd0NpcmNsZSgwLCAwLCByYWRpdXMpO1xuICAgICAgICAvLyBkLmVuZEZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCBib3R0b20gd2FsbFxuICAgIGVsc2UgaWYgKCBib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQtMSkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgICAgIC8vIGRvdC5jb2xvciA9IHdhbGxzLmJvdHRvbS5jb2xvcjtcbiAgICAgICAgLy8gZC5iZWdpbkZpbGwod2FsbHMuYm90dG9tLmNvbG9yKTtcbiAgICAgICAgLy8gZC5kcmF3Q2lyY2xlKDAsIDAsIHJhZGl1cyk7XG4gICAgICAgIC8vIGQuZW5kRmlsbCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgb3ZlcmxhcCwgY29sbGlkZUNpcmNzLCBjb2xsaWRlV2FsbHMgfTtcbiIsImltcG9ydCB7IGJ1dHRvblNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzLmpzJztcblxuY2xhc3MgU3RhcnRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoY2IpIHtcbiAgICAvLyB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTMwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgICAgICQoJyNzaGFkZScpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogLTUzMH0pO1xuXG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICB0b3A6IGhlaWdodC8yLTI2NVxuICAgIH0sIDQwMDAsICdlYXNlT3V0RWxhc3RpYycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXJ0TWVzc2FnZTtcbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcmVjdCwgcG9zKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGRkZGRjtcblxuICAgIHRoaXMud2FsbCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy53YWxsLmxpbmVTdHlsZSg0LCB0aGlzLmNvbG9yLCAxKTtcbiAgICB0aGlzLndhbGwuZHJhd1JlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgdGhpcy53YWxsLmVuZEZpbGwoKTtcbiAgICB0aGlzLndhbGwueCA9cG9zWzBdO1xuICAgIHRoaXMud2FsbC55ID0gcG9zWzFdO1xuXG4gIH1cblxuICBzdGVwKCkge1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IFN0YXJ0TWVzc2FnZSBmcm9tICcuL1N0YXJ0TWVzc2FnZSc7XG5pbXBvcnQgRW5kTWVzc2FnZSBmcm9tICcuL0VuZE1lc3NhZ2UnO1xuaW1wb3J0IEdhbWVCYXIgZnJvbSAnLi9HYW1lQmFyJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcbiAgLy8gQmVnaW4gc3RhdHNcbiAgbGV0IHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNob3dQYW5lbCggMCk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iLCAzKzogY3VzdG9tXG4gIC8vIGNvbnNvbGUubG9nKHN0YXRzKTtcbiAgbGV0IGRvbSA9IHN0YXRzLmRvbUVsZW1lbnQ7XG4gIGRvbS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0YXRzRGl2Jyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGRvbSApO1xuXG4gIC8vIEJlZ2luIGF1ZGlvXG4gIHZhciBiYWNrZ3JvdW5kID0gbmV3IEhvd2woe1xuICAgIHNyYzogWydhdWRpby9yaWxleS5tcDMnXSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIHZvbHVtZTogMSxcbiAgICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEJlZ2luIHJlbmRlclxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGdhbWVCYXIgPSBuZXcgR2FtZUJhcigpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBnYW1lQmFyKTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVCYXIuaW5pdCgpO1xuICAgIGdhbWVCYXIuZmlsbEJhcignd2hpdGUnLCAwKTtcbiAgICBnYW1lQmFyLnNldFNjb3JlKDApO1xuICAgIGdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZygxMDApO1xuICB9XG5cbiAgbGV0IHJlc3RhcnQgPSBmYWxzZTtcbiAgbGV0IGVuZCA9IG51bGw7XG4gIGxldCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnLmtpbGxBbGwoKTtcbiAgICByZXN0YXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIGxldCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIHN0YXRzLmJlZ2luKCk7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIGlmKGcuY2hlY2tFbmRHYW1lKCkpIHtcbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICBlbmQgPSBuZXcgRW5kTWVzc2FnZShnLmdldFNjb3JlKCksIHJlc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0YXJ0KSB7XG4gICAgICAgIGlmIChnLm51bURvdHMgPT0gMCkge1xuICAgICAgICAgIGdhbWVCYXIucmVzdGFydCgpO1xuICAgICAgICAgIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgICAgZyA9IG5ldyBHYW1lKHN0YWdlLCBiLCBnYW1lQmFyKTtcbiAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgIHJlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICAgICAgc3RhdHMuZW5kKCk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0pKCk7XG4iXX0=
