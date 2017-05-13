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
      if (this.lineDots.length > 1) {
        var toAdd = 0;
        this.lineDots.forEach(function (d) {
          toAdd += d.kill();
        });
        if (this.isPolygon) toAdd += _Helpers.polygonScore;
        this.isPolygon = false;
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
var polygonScore = exports.polygonScore = 100;

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
        // Taken from https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
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
    }

    // dot collides with right wall
    else if (right > window.innerWidth - 1) {
            d.vx = -d.vx;
        }

        // dot collids with top wall
        else if (top < 1) {
                d.vy = -d.vy;
            }

            // dot collides with bottom wall
            else if (bottom > window.innerHeight - 1) {
                    d.vy = -d.vy;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9FbmRNZXNzYWdlLmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7SUFFTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxxQkFBYjs7QUFFQSxTQUFLLENBQUwsR0FBUyxJQUFJLEtBQUssUUFBVCxFQUFUO0FBQ0EsU0FBSyxDQUFMLENBQU8sU0FBUCxDQUFpQixLQUFLLEtBQXRCO0FBQ0EsU0FBSyxDQUFMLENBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUFLLEdBQTdCO0FBQ0EsU0FBSyxDQUFMLENBQU8sT0FBUDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLEVBQVAsR0FBYSxLQUFLLE1BQUwsS0FBZ0IsQ0FB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ImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge3Njb3JlTXVsdH0gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgRG90IHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvcywgcmFkKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGMDAwMDtcbiAgICB0aGlzLnJhZCA9IHJhZCA/IHJhZCA6IE1hdGgucmFuZG9tKCkqMjArMTU7XG4gICAgbGV0IHAgPSBwb3MgPyBwb3MgOiBbTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoLCBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIHRoaXMuc2NhbGUgPSAwO1xuXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMucmFkKnNjb3JlTXVsdDtcblxuICAgIHRoaXMuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5kLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLmQuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5kLmVuZEZpbGwoKTtcbiAgICB0aGlzLmQueCA9IHBbMF07XG4gICAgdGhpcy5kLnkgPSBwWzFdO1xuICAgIHRoaXMuZC52eCA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC52eSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMubyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5vLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApOyAgLy8gKHRoaWNrbmVzcywgY29sb3IpXG4gICAgdGhpcy5vLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuby5lbmRGaWxsKCk7XG4gICAgdGhpcy5vLnggPSBwWzBdIC0gdGhpcy5kLnZ4KjIuNTtcbiAgICB0aGlzLm8ueSA9IHBbMV0gLSB0aGlzLmQudnkqMi41O1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjIuNTtcbiAgICB0aGlzLm8ueSA9IHRoaXMuZC55IC0gdGhpcy5kLnZ5KjIuNTtcblxuICAgIGlmICh0aGlzLmtpbGxlZCkge1xuICAgICAgdGhpcy5zY2FsZSAtPSAuMjtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IC0uMDA1KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjYWxlcygpIHtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuXG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgfVxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gW3RoaXMuZCwgdGhpcy5vXTtcbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgdGhpcy5raWxsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG90O1xuIiwiaW1wb3J0IHsgYnV0dG9uU291bmQgfSBmcm9tICcuL0hlbHBlcnMuanMnO1xuXG5jbGFzcyBFbmRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3Ioc2NvcmUsIHJlc3RhcnRDQikge1xuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgYnV0dG9uU291bmQucGxheSgpO1xuICAgICAgJCgnI2VuZENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01NTBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgICAgIGNvbnNvbGUubG9nKCdoaWknKTtcbiAgICAgICQoJyNzaGFkZTInKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICQoJyNzaGFkZTInKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgcmVzdGFydENCKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNlbmRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IGhlaWdodC8yLTI3NX0pO1xuICAgICQoJyNlbmRTY29yZScpLnRleHQocGFyc2VGbG9hdChzY29yZSkudG9GaXhlZCgwKSk7XG5cbiAgICAkKCcjc2hhZGUyJykuc2hvdygpO1xuICAgICQoJyNzaGFkZTInKS5hbmltYXRlKHtcbiAgICAgIG9wYWNpdHk6IDFcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmRNZXNzYWdlO1xuIiwiaW1wb3J0IERvdCBmcm9tICcuL0RvdCdcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcbmltcG9ydCB7IGJnQ29sb3IsIGRvdENvbG9ycywgc3RhcnREb3RzLCBkaXN0TXVsdCwgcG9seWdvblNjb3JlLCBwYXRoQm9udXNMZW5ndGgsIG92ZXJsYXAsIGNvbGxpZGVDaXJjcywgY29sbGlkZVdhbGxzLCBieWVTb3VuZCB9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSwgZykge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmdhbWVCYXIgPSBnO1xuICAgIHRoaXMuc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UuYnV0dG9uTW9kZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVybW92ZScsIHRoaXMub25EcmFnTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZG90cyA9IFtdO1xuICAgIHRoaXMud2FsbHMgPSB7fTtcblxuICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICB0aGlzLmxpbmVDb2xvciA9IDB4ZmZmZmZmO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydERvdHMgPSBzdGFydERvdHM7XG4gICAgdGhpcy5udW1Eb3RzID0gMDtcbiAgICB0aGlzLmRvdENvbG9ycyA9IGRvdENvbG9ycztcblxuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMTtcblxuICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5wcmV2RGlzdCA9IDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGdldFNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICB9XG5cbiAga2lsbEFsbCgpIHtcbiAgICAgIHRoaXMuZG90cy5mb3JFYWNoKGQgPT4gZC5raWxsKCkpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgbGV0IHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgd2hpbGUgKHRoaXMubnVtRG90cyA8IHRoaXMuc3RhcnREb3RzKSB7XG4gICAgICAgIGxldCBwb3MgPSB7IHg6IDM1ICsgTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDcwKSwgeTogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKSB9O1xuICAgICAgICBsZXQgZCA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0sIFtwb3MueCwgcG9zLnldLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgICAgaWYgKG92ZXJsYXAoZC5kLngsIGQuZC55LCBkLnJhZCwgdGhpcy5kb3RzW2ldLmQueCwgdGhpcy5kb3RzW2ldLmQueSwgdGhpcy5kb3RzW2ldLnJhZCkpIHtcbiAgICAgICAgICAgICAgICByZXNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc2VsZWN0KSB7XG4gICAgICAgICAgICByZXNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb3RzLnB1c2goZCk7XG4gICAgICAgIHRoaXMubnVtRG90cysrO1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRXYWxscygpIHtcbiAgICBsZXQgd2FsbENvbG9yID0gYmdDb2xvcjtcblxuICAgIGxldCB3YWxsVG9wID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFRvcC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsTGVmdCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsTGVmdC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsQm90dG9tID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgd2luZG93LmlubmVySGVpZ2h0LTFdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxCb3R0b20uZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbFJpZ2h0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgW3dpbmRvdy5pbm5lcldpZHRoLTEsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxSaWdodC5nZXRHcmFwaGljcygpKTtcblxuICAgIHRoaXMud2FsbHMgPSB7dG9wOiB3YWxsVG9wLCBsZWZ0OiB3YWxsTGVmdCwgYm90dG9tOiB3YWxsQm90dG9tLCByaWdodDogd2FsbFJpZ2h0fTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyRG90cygpO1xuXG4gICAgLy8gUmVuZGVyIGxpbmUgZ3JhcGhpY3NcbiAgICB0aGlzLnJlbmRlckxpbmUoKTtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlTXVsdGlwbGllcigpO1xuXG4gICAgdGhpcy5yZW5kZXJEcmFnTGluZSgpO1xuICB9XG5cbiAgY2hlY2tFbmRHYW1lKCkge1xuICAgIC8vIENoZWNrIGlmICMgb2YgZG90cyBvZiBlYWNoIGNvbG9yIGFyZSBhbGwgMSBvciAwXG4gICAgbGV0IGNvbG9yQ291bnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29sb3JDb3VudC5wdXNoKDApO1xuICAgIH1cblxuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICBsZXQgY0lkeCA9IGRvdENvbG9ycy5pbmRleE9mKGQuY29sb3IpO1xuICAgICAgY29sb3JDb3VudFtjSWR4XSsrO1xuICAgIH0pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGNvbG9yQ291bnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgPD0gMSkgY291bnRlcisrO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ZXIgPT09IGRvdENvbG9ycy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1Igbm8gbGluZSBsZWZ0XG4gICAgaWYgKHRoaXMubGVuZ3RoUmVtYWluaW5nIDw9IDApIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1IgYWxsIGRvdHMga2lsbGVkXG4gICAgaWYgKHRoaXMubnVtRG90cyA9PT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRDb2xvcklkeChjb2xvcikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjb2xvciA9PT0gdGhpcy5kb3RDb2xvcnNbaV0pIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmVuZGVyRG90cygpIHtcbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCwgaSkgPT4ge1xuXG4gICAgY29sbGlkZVdhbGxzKGQsIHRoaXMud2FsbHMpO1xuXG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICBjb2xsaWRlQ2lyY3MoZCwgdGhpcy5kb3RzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZC5zdGVwKCk7XG5cbiAgICAgIGlmIChkLmRlYWQpIHtcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgICAgdGhpcy5kb3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzIC09IDE7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckxpbmUoKSB7XG4gICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0uZC54LCB0aGlzLmxpbmVEb3RzW2ldLmQueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0uZC54LCB0aGlzLmxpbmVEb3RzW2krMV0uZC55KTtcbiAgICB9XG4gICAgdGhpcy5saW5lR3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICB9XG5cbiAgcmVuZGVyRHJhZ0xpbmUoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmRyYWdMaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLm1vdmVUbyh0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueCwgdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLnkpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lVG8odGhpcy5wb3MueCwgdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NvcmVNdWx0aXBsaWVyKCkge1xuICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgZnJhYyA9IHRoaXMubGluZURvdHMubGVuZ3RoL3BhdGhCb251c0xlbmd0aDtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMSArIGZyYWMqMjtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCBmcmFjKjEwMC4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBzdGFydC5jb2xvcjtcbiAgICAgIH1cbiAgfVxuXG4gIG9uRHJhZ0VuZCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IHRvQWRkID0gMDtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgdG9BZGQgKz0gZC5raWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSB0b0FkZCArPSBwb2x5Z29uU2NvcmU7XG4gICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgIGJ5ZVNvdW5kLnBsYXkoKTtcblxuICAgICAgICB0aGlzLnNjb3JlICs9IHRvQWRkKnRoaXMuc2NvcmVNdWx0aXBsaWVyO1xuICAgICAgICB0aGlzLmdhbWVCYXIuc2V0U2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICB9XG5cbiAgb25EcmFnTW92ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgICAgICBsZXQgZHJhZ0Rpc3QgPSAodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKih0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtIE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZHJhZ0Rpc3QpKTtcbiAgICAgICAgICBsZXQgbWlkID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgICAgICBpZiAobWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gQ29ubmVjdCBkb3RzIG9mIHRoZSBzYW1lIGNvbG9yXG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBnb2luZyBiYWNrd2FyZCwgcmVtb3ZlIGxpbmVcbiAgICAgICAgICAgICAgICAgIGlmIChtaWQgPT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAyXSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5zcGxpY2UodGhpcy5saW5lRG90cy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgKz0gdGhpcy5wcmV2RGlzdDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcG9seWdvbiwgY2FuJ3QgY29ubmVjdFxuICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUG9seWdvbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENvbm5lY3QgdG8gbmV3IGRvdCBvciB0byBmaXJzdCBkb3QgKGNyZWF0aW5nIHBvbHlnb24pXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmluZExpbmVEb3QobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwIHx8IGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gMCkgdGhpcy5pc1BvbHlnb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IChtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZEaXN0ID0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkaXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmaW5kRG90KHBvcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgIGxldCBzbmFwUG9zID0geyB4OnRoaXMuZG90c1tpXS5kLngsIHk6dGhpcy5kb3RzW2ldLmQueSB9O1xuICAgICAgICAgIGxldCByYWQgPSB0aGlzLmRvdHNbaV0ucmFkO1xuICAgICAgICAgIGxldCBkaXN0ID0gKHBvcy54LXNuYXBQb3MueCkqKHBvcy54LXNuYXBQb3MueCkgK1xuICAgICAgICAgICAgICAgICAgICAgKHBvcy55LXNuYXBQb3MueSkqKHBvcy55LXNuYXBQb3MueSk7XG4gICAgICAgICAgaWYgKGRpc3QgPD0gcmFkKnJhZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5kb3RzW2ldICE9PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb3RzW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZpbmRMaW5lRG90KGRvdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGluZURvdHNbaV0gPT09IGRvdCkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNsYXNzIEdhbWVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNiYXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMTI1LCBib3R0b206IC04MH0pO1xuXG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gNTU0O1xuICAgIHRoaXMucmVzdGFydCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcjYmFyJykuYW5pbWF0ZSh7XG4gICAgICBib3R0b206IDMwXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICB9XG5cbiAgZmlsbEJhcihjb2xvciwgZmlsbFBlcmNlbnRhZ2UpIHtcbiAgICBjb2xvciA9IFwiI1wiICsgY29sb3IudG9TdHJpbmcoMTYpO1xuICAgIGZpbGxQZXJjZW50YWdlID0gTWF0aC5taW4oTWF0aC5tYXgoZmlsbFBlcmNlbnRhZ2UsIDAuMCksIDEwMC4wKTtcbiAgICBsZXQgbSA9IHRoaXMucGF0aExlbmd0aC8oLTEwMC4wKTtcbiAgICBsZXQgeSA9IG0qZmlsbFBlcmNlbnRhZ2UrdGhpcy5wYXRoTGVuZ3RoO1xuICAgICQoJyNiYXInKS5jc3Moe3N0cm9rZTogY29sb3IsIFwic3Ryb2tlLWRhc2hvZmZzZXRcIjogeX0pO1xuICB9XG5cbiAgc2V0U2NvcmUobmV3U2NvcmUpIHtcbiAgICB0aGlzLnNjb3JlID0gcGFyc2VGbG9hdChuZXdTY29yZSkudG9GaXhlZCgwKTtcbiAgICAkKHtjb3VudE51bTogdGhpcy5wcmV2U2NvcmV9KS5hbmltYXRlKHtjb3VudE51bTogdGhpcy5zY29yZX0sIHtcbiAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICBlYXNpbmc6J2xpbmVhcicsXG4gICAgICBzdGVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2hhdCB0b2RvIG9uIGV2ZXJ5IGNvdW50XG4gICAgICAgICQoJyNzY29yZScpLnRleHQocGFyc2VGbG9hdCh0aGlzLmNvdW50TnVtKS50b0ZpeGVkKDApKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLnByZXZTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRQZXJjZW50UmVtYWluaW5nKHJlbWFpbikge1xuICAgIHJlbWFpbiA9IE1hdGgubWluKE1hdGgubWF4KHJlbWFpbiwgMCksIDEwMCk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcbiAgICBpZiAocmVtYWluIDw9IDIwKSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3JlZCd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICd3aGl0ZSd9KTtcbiAgICB9XG4gIH1cblxuICByZXN0YXJ0KCkge1xuICAgIHRoaXMucHJldlNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KCcxMDAlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJhclxuIiwiZXhwb3J0IGNvbnN0IHN0YXJ0RG90cyA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lcldpZHRoIC0gNTApIC8gMTIwKSAqIE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIDUwKSAvIDEyMCk7XG5cbi8vIFNDT1JJTkdcbmV4cG9ydCBjb25zdCBkaXN0TXVsdCA9IC4wNTtcbmV4cG9ydCBjb25zdCBzY29yZU11bHQgPSAyO1xuZXhwb3J0IGNvbnN0IHBhdGhCb251c0xlbmd0aCA9IDc7XG5leHBvcnQgY29uc3QgcG9seWdvblNjb3JlID0gMTAwO1xuXG5leHBvcnQgY29uc3QgZG90Q29sb3JzID0gWzB4RjlGNzUxLCAweDM1Q0EzNywgMHhBRTM0QzksIDB4MkU1RUM5LCAweENBMzY2M107XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IDB4ZmZmZGYzO1xuXG5leHBvcnQgY29uc3QgYnV0dG9uU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9idXR0b24ubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgYnllU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9ieWUubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIG92ZXJsYXAoeDEsIHkxLCByMSwgeDIsIHkyLCByMikge1xuICAgIGxldCBkeCA9IHgxIC0geDI7XG4gICAgbGV0IGR5ID0geTEgLSB5MjtcbiAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG4gICAgaWYgKGRpc3RhbmNlIDw9IHIxICsgcjIpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29sbGlkZUNpcmNzKGRvdDEsIGRvdDIpIHtcbiAgICBpZiAob3ZlcmxhcChkb3QxLmQueCwgZG90MS5kLnksIGRvdDEucmFkLCBkb3QyLmQueCwgZG90Mi5kLnksIGRvdDIucmFkKSkge1xuICAgICAgICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2FtZWRldmVsb3BtZW50LnR1dHNwbHVzLmNvbS90dXRvcmlhbHMvd2hlbi13b3JsZHMtY29sbGlkZS1zaW11bGF0aW5nLWNpcmNsZS1jaXJjbGUtY29sbGlzaW9ucy0tZ2FtZWRldi03NjlcbiAgICAgICAgbGV0IHZmMXggPSBkb3QyLmQudng7XG4gICAgICAgIGxldCB2ZjF5ID0gZG90Mi5kLnZ5O1xuICAgICAgICBsZXQgdmYyeCA9IGRvdDEuZC52eDtcbiAgICAgICAgbGV0IHZmMnkgPSBkb3QxLmQudnk7XG5cbiAgICAgICAgZG90MS5kLnZ4ID0gdmYxeDtcbiAgICAgICAgZG90MS5kLnZ5ID0gdmYxeTtcbiAgICAgICAgZG90Mi5kLnZ4ID0gdmYyeDtcbiAgICAgICAgZG90Mi5kLnZ5ID0gdmYyeTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVXYWxscyhkb3QsIHdhbGxzKSB7XG4gICAgbGV0IHJhZGl1cyA9IGRvdC5yYWQ7XG4gICAgbGV0IGQgPSBkb3QuZDtcbiAgICBsZXQgbGVmdCA9IGQueCAtIHJhZGl1cztcbiAgICBsZXQgcmlnaHQgPSBkLnggKyByYWRpdXM7XG4gICAgbGV0IHRvcCA9IGQueSAtIHJhZGl1cztcbiAgICBsZXQgYm90dG9tID0gZC55ICsgcmFkaXVzO1xuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggbGVmdCB3YWxsXG4gICAgaWYgKGxlZnQgPCAxICkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggcmlnaHQgd2FsbFxuICAgIGVsc2UgaWYgKHJpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgtMSkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZHMgd2l0aCB0b3Agd2FsbFxuICAgIGVsc2UgaWYgKHRvcCA8IDEgKSB7XG4gICAgICAgIGQudnkgPSAtZC52eTtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCBib3R0b20gd2FsbFxuICAgIGVsc2UgaWYgKCBib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQtMSkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscyB9O1xuIiwiaW1wb3J0IHsgYnV0dG9uU291bmQgfSBmcm9tICcuL0hlbHBlcnMuanMnO1xuXG5jbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGJ1dHRvblNvdW5kLnBsYXkoKTtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBFbmRNZXNzYWdlIGZyb20gJy4vRW5kTWVzc2FnZSc7XG5pbXBvcnQgR2FtZUJhciBmcm9tICcuL0dhbWVCYXInO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuICAvLyBCZWdpbiBzdGF0c1xuICBsZXQgc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgc3RhdHMuc2hvd1BhbmVsKCAwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cbiAgLy8gY29uc29sZS5sb2coc3RhdHMpO1xuICBsZXQgZG9tID0gc3RhdHMuZG9tRWxlbWVudDtcbiAgZG9tLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHNEaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggZG9tICk7XG5cbiAgLy8gQmVnaW4gYXVkaW9cbiAgdmFyIGJhY2tncm91bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBbJ2F1ZGlvL3JpbGV5Lm1wMyddLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgdm9sdW1lOiAxLFxuICAgIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICAgIH1cbiAgfSk7XG5cbiAgLy8gQmVnaW4gcmVuZGVyXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgZ2FtZUJhciA9IG5ldyBHYW1lQmFyKCk7XG4gIGxldCBnID0gbmV3IEdhbWUoc3RhZ2UsIGdhbWVCYXIpO1xuXG4gIGxldCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZUJhci5pbml0KCk7XG4gICAgZ2FtZUJhci5maWxsQmFyKCd3aGl0ZScsIDApO1xuICAgIGdhbWVCYXIuc2V0U2NvcmUoMCk7XG4gICAgZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKDEwMCk7XG4gIH1cblxuICBsZXQgcmVzdGFydCA9IGZhbHNlO1xuICBsZXQgZW5kID0gbnVsbDtcbiAgbGV0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGcua2lsbEFsbCgpO1xuICAgIHJlc3RhcnQgPSB0cnVlO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gbmV3IFN0YXJ0TWVzc2FnZShzdGFydEdhbWUuYmluZCh0aGlzKSk7XG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgc3RhdHMuYmVnaW4oKTtcbiAgICAgIGcuc3RlcCgpO1xuICAgICAgaWYoZy5jaGVja0VuZEdhbWUoKSkge1xuICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgIGVuZCA9IG5ldyBFbmRNZXNzYWdlKGcuZ2V0U2NvcmUoKSwgcmVzdGFydEdhbWUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3RhcnQpIHtcbiAgICAgICAgaWYgKGcubnVtRG90cyA9PSAwKSB7XG4gICAgICAgICAgZ2FtZUJhci5yZXN0YXJ0KCk7XG4gICAgICAgICAgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgICBnID0gbmV3IEdhbWUoc3RhZ2UsIGIsIGdhbWVCYXIpO1xuICAgICAgICAgIGVuZCA9IG51bGw7XG4gICAgICAgICAgcmVzdGFydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gICAgICBzdGF0cy5lbmQoKTtcbiAgfVxuXG4gIHJlbmRlcigpO1xufSkoKTtcbiJdfQ==
