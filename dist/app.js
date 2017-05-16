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
    this.dists = [];

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
      if (this.numDots === 0) {
        this.score += this.lengthRemaining * 10;
        this.gameBar.setScore(this.score);
        this.gameBar.setPercentRemaining(this.lengthRemaining, true);

        return true;
      }

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
              this.tempLengthRemaining += this.dists[this.dists.length - 1];
              this.dists.splice(this.dists.length - 1, 1);
            } else {
              // If polygon, can't connect
              if (this.isPolygon) return;
              // Connect to new dot or to first dot (creating polygon)
              var idx = this.findLineDot(mid);
              if (idx === 0 || idx === -1) {
                if (idx === 0) this.isPolygon = true;
                var dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) * (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y) * (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
                this.dists.push(Math.floor(_Helpers.distMult * Math.sqrt(dist)));
                this.tempLengthRemaining -= this.dists[this.dists.length - 1];
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
    value: function setPercentRemaining(remain, colorFlag) {
      var cf = colorFlag ? colorFlag : false;
      remain = Math.min(Math.max(remain, 0), 100);

      $('#remaining').text(remain + '%');

      if (cf) return;
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
var distMult = exports.distMult = startDots * 0.025 / 104; // 54; // Scales based on number of dots
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
  $(dom).css('display', 'none');
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
        g = new _Game2.default(stage, gameBar);
        end = null;
        restart = false;
      }
    }

    renderer.render(stage);
    stats.end();
  };

  render();

  $('body').keypress(function (event) {
    if (event.key === 't') {
      // T
      $('#statsDiv').toggle();
    } else if (event.key === 'r') {
      // R
      restartGame();
    } else if (event.key === 'm') {
      // M
      if (background.volume() === 0.0) background.volume(1.0);else background.volume(0.0);
    }
  });
})();

},{"./EndMessage":2,"./Game":3,"./GameBar":4,"./Helpers":5,"./StartMessage":6}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvRW5kTWVzc2FnZS5qcyIsImpzL0dhbWUuanMiLCJqcy9HYW1lQmFyLmpzIiwianMvSGVscGVycy5qcyIsImpzL1N0YXJ0TWVzc2FnZS5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0lBRU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwscUJBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUws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SUFBVixXQUFqQixDQUFaOztBQUVBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLDBCQUFzQixNQUF0QjtBQUNBLFVBQU0sS0FBTjtBQUNBLE1BQUUsSUFBRjtBQUNBLFFBQUcsRUFBRSxZQUFGLEVBQUgsRUFBcUI7QUFDbkIsVUFBSSxDQUFDLEdBQUwsRUFBVTtBQUNSLGNBQU0seUJBQWUsRUFBRSxRQUFGLEVBQWYsRUFBNkIsWUFBWSxJQUFaLFdBQTdCLENBQU47QUFDRDtBQUNGOztBQUVELFFBQUksT0FBSixFQUFhO0FBQ1gsVUFBSSxFQUFFLE9BQUYsSUFBYSxDQUFqQixFQUFvQjtBQUNsQixnQkFBUSxPQUFSO0FBQ0EsZ0JBQVEsSUFBSSxLQUFLLFNBQVQsRUFBUjtBQUNBLFlBQUksbUJBQVMsS0FBVCxFQUFnQixPQUFoQixDQUFKO0FBQ0EsY0FBTSxJQUFOO0FBQ0Esa0JBQVUsS0FBVjtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0EsVUFBTSxHQUFOO0FBQ0gsR0F0QkQ7O0FBd0JBOztBQUVBLElBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsVUFBVSxLQUFWLEVBQWtCO0FBQ25DLFFBQUssTUFBTSxHQUFOLEtBQWMsR0FBbkIsRUFBeUI7QUFDdkI7QUFDQSxRQUFFLFdBQUYsRUFBZSxNQUFmO0FBQ0QsS0FIRCxNQUdPLElBQUksTUFBTSxHQUFOLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUI7QUFDQTtBQUNELEtBSE0sTUFHQSxJQUFJLE1BQU0sR0FBTixLQUFjLEdBQWxCLEVBQXVCO0FBQzVCO0FBQ0EsVUFBSSxXQUFXLE1BQVgsT0FBd0IsR0FBNUIsRUFDRSxXQUFXLE1BQVgsQ0FBa0IsR0FBbEIsRUFERixLQUdFLFdBQVcsTUFBWCxDQUFrQixHQUFsQjtBQUNIO0FBQ0YsR0FkRDtBQWVELENBakdEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7c2NvcmVNdWx0fSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yYWQqc2NvcmVNdWx0O1xuXG4gICAgdGhpcy5kID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmQuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuZC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLmQuZW5kRmlsbCgpO1xuICAgIHRoaXMuZC54ID0gcFswXTtcbiAgICB0aGlzLmQueSA9IHBbMV07XG4gICAgdGhpcy5kLnZ4ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnZ5ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyLjU7XG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLmdyb3dpbmcgPSB0cnVlO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5ncm93aW5nKSB7XG4gICAgICB0aGlzLnNjYWxlICs9IC4wNTtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ncm93aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kLnggKz0gdGhpcy5kLnZ4O1xuICAgIHRoaXMuZC55ICs9IHRoaXMuZC52eTtcblxuICAgIHRoaXMuby54ID0gdGhpcy5kLnggLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMi41O1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIEVuZE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihzY29yZSwgcmVzdGFydENCKSB7XG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjZW5kQ29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTU1MFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICAgICAgY29uc29sZS5sb2coJ2hpaScpO1xuICAgICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCgnI3NoYWRlMicpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXN0YXJ0Q0IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2VuZENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogaGVpZ2h0LzItMjc1fSk7XG4gICAgJCgnI2VuZFNjb3JlJykudGV4dChwYXJzZUZsb2F0KHNjb3JlKS50b0ZpeGVkKDApKTtcblxuICAgICQoJyNzaGFkZTInKS5zaG93KCk7XG4gICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgb3BhY2l0eTogMVxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZE1lc3NhZ2U7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHsgYmdDb2xvciwgZG90Q29sb3JzLCBzdGFydERvdHMsIGRpc3RNdWx0LCBwb2x5Z29uU2NvcmUsIHBhdGhCb251c0xlbmd0aCwgb3ZlcmxhcCwgY29sbGlkZUNpcmNzLCBjb2xsaWRlV2FsbHMsIGJ5ZVNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlLCBnKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuZ2FtZUJhciA9IGc7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5kb3RzID0gW107XG4gICAgdGhpcy53YWxscyA9IHt9O1xuXG4gICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgIHRoaXMubGluZUNvbG9yID0gMHhmZmZmZmY7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG5cbiAgICB0aGlzLnN0YXJ0RG90cyA9IHN0YXJ0RG90cztcbiAgICB0aGlzLm51bURvdHMgPSAwO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuXG4gICAgdGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLmRpc3RzID0gW107XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGdldFNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICB9XG5cbiAga2lsbEFsbCgpIHtcbiAgICAgIHRoaXMuZG90cy5mb3JFYWNoKGQgPT4gZC5raWxsKCkpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgbGV0IHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgd2hpbGUgKHRoaXMubnVtRG90cyA8IHRoaXMuc3RhcnREb3RzKSB7XG4gICAgICAgIGxldCBwb3MgPSB7IHg6IDM1ICsgTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDcwKSwgeTogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKSB9O1xuICAgICAgICBsZXQgZCA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0sIFtwb3MueCwgcG9zLnldLCBNYXRoLnJhbmRvbSgpKjIwKzE1KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgICAgaWYgKG92ZXJsYXAoZC5kLngsIGQuZC55LCBkLnJhZCwgdGhpcy5kb3RzW2ldLmQueCwgdGhpcy5kb3RzW2ldLmQueSwgdGhpcy5kb3RzW2ldLnJhZCkpIHtcbiAgICAgICAgICAgICAgICByZXNlbGVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc2VsZWN0KSB7XG4gICAgICAgICAgICByZXNlbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb3RzLnB1c2goZCk7XG4gICAgICAgIHRoaXMubnVtRG90cysrO1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRXYWxscygpIHtcbiAgICBsZXQgd2FsbENvbG9yID0gYmdDb2xvcjtcblxuICAgIGxldCB3YWxsVG9wID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFRvcC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsTGVmdCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsTGVmdC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsQm90dG9tID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgd2luZG93LmlubmVySGVpZ2h0LTFdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxCb3R0b20uZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbFJpZ2h0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgW3dpbmRvdy5pbm5lcldpZHRoLTEsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxSaWdodC5nZXRHcmFwaGljcygpKTtcblxuICAgIHRoaXMud2FsbHMgPSB7dG9wOiB3YWxsVG9wLCBsZWZ0OiB3YWxsTGVmdCwgYm90dG9tOiB3YWxsQm90dG9tLCByaWdodDogd2FsbFJpZ2h0fTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyRG90cygpO1xuXG4gICAgLy8gUmVuZGVyIGxpbmUgZ3JhcGhpY3NcbiAgICB0aGlzLnJlbmRlckxpbmUoKTtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlTXVsdGlwbGllcigpO1xuXG4gICAgdGhpcy5yZW5kZXJEcmFnTGluZSgpO1xuICB9XG5cbiAgY2hlY2tFbmRHYW1lKCkge1xuICAgIC8vIENoZWNrIGlmICMgb2YgZG90cyBvZiBlYWNoIGNvbG9yIGFyZSBhbGwgMSBvciAwXG4gICAgbGV0IGNvbG9yQ291bnQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29sb3JDb3VudC5wdXNoKDApO1xuICAgIH1cblxuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICBsZXQgY0lkeCA9IGRvdENvbG9ycy5pbmRleE9mKGQuY29sb3IpO1xuICAgICAgY29sb3JDb3VudFtjSWR4XSsrO1xuICAgIH0pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGNvbG9yQ291bnQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUgPD0gMSkgY291bnRlcisrO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvdW50ZXIgPT09IGRvdENvbG9ycy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1Igbm8gbGluZSBsZWZ0XG4gICAgaWYgKHRoaXMubGVuZ3RoUmVtYWluaW5nIDw9IDApIHJldHVybiB0cnVlO1xuXG4gICAgLy8gT1IgYWxsIGRvdHMga2lsbGVkXG4gICAgaWYgKHRoaXMubnVtRG90cyA9PT0gMCkge1xuICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmxlbmd0aFJlbWFpbmluZyoxMDtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRTY29yZSh0aGlzLnNjb3JlKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMubGVuZ3RoUmVtYWluaW5nLCB0cnVlKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Q29sb3JJZHgoY29sb3IpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kb3RDb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoY29sb3IgPT09IHRoaXMuZG90Q29sb3JzW2ldKSByZXR1cm4gaTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHJlbmRlckRvdHMoKSB7XG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQsIGkpID0+IHtcblxuICAgIGNvbGxpZGVXYWxscyhkLCB0aGlzLndhbGxzKTtcblxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubnVtRG90czsgaisrKSB7XG4gICAgICAgIGlmIChpID09PSBqKSBjb250aW51ZTtcbiAgICAgICAgY29sbGlkZUNpcmNzKGQsIHRoaXMuZG90c1tqXSk7XG4gICAgICB9XG5cbiAgICAgIGQuc3RlcCgpO1xuXG4gICAgICBpZiAoZC5kZWFkKSB7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5yZW1vdmVDaGlsZChlKSk7XG4gICAgICAgIHRoaXMuZG90cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMubnVtRG90cyAtPSAxO1xuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJMaW5lKCkge1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLmQueCwgdGhpcy5saW5lRG90c1tpXS5kLnkpO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lVG8odGhpcy5saW5lRG90c1tpKzFdLmQueCwgdGhpcy5saW5lRG90c1tpKzFdLmQueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgfVxuXG4gIHJlbmRlckRyYWdMaW5lKCkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5kcmFnTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgICAgdGhpcy5kcmFnTGluZS5tb3ZlVG8odGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLngsIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC55KTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVRvKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjb3JlTXVsdGlwbGllcigpIHtcbiAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPj0gMSkge1xuICAgICAgbGV0IGZyYWMgPSB0aGlzLmxpbmVEb3RzLmxlbmd0aC9wYXRoQm9udXNMZW5ndGg7XG4gICAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDEgKyBmcmFjKjI7XG4gICAgICB0aGlzLmdhbWVCYXIuZmlsbEJhcih0aGlzLmxpbmVDb2xvciwgZnJhYyoxMDAuMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMTtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCAwKTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIHRoaXMubGluZURvdHMucHVzaChzdGFydCk7XG4gICAgICAgIHRoaXMubGluZUNvbG9yID0gc3RhcnQuY29sb3I7XG4gICAgICB9XG4gIH1cblxuICBvbkRyYWdFbmQoKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCB0b0FkZCA9IDA7XG4gICAgICAgIHRoaXMubGluZURvdHMuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgIHRvQWRkICs9IGQua2lsbCgpO1xuICAgICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmlzUG9seWdvbikgdG9BZGQgKz0gcG9seWdvblNjb3JlO1xuICAgICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgICBieWVTb3VuZC5wbGF5KCk7XG5cbiAgICAgICAgdGhpcy5zY29yZSArPSB0b0FkZCp0aGlzLnNjb3JlTXVsdGlwbGllcjtcbiAgICAgICAgdGhpcy5nYW1lQmFyLnNldFNjb3JlKHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZztcbiAgICAgIH1cbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgfVxuXG4gIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICAgICAgbGV0IGRyYWdEaXN0ID0gKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICArICh0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgLSBNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRyYWdEaXN0KSk7XG4gICAgICAgICAgbGV0IG1pZCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICAgICAgaWYgKG1pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIENvbm5lY3QgZG90cyBvZiB0aGUgc2FtZSBjb2xvclxuICAgICAgICAgICAgICBpZiAobWlkLmNvbG9yID09PSB0aGlzLmxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZ29pbmcgYmFja3dhcmQsIHJlbW92ZSBsaW5lXG4gICAgICAgICAgICAgICAgICBpZiAobWlkID09PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMuc3BsaWNlKHRoaXMubGluZURvdHMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nICs9IHRoaXMuZGlzdHNbdGhpcy5kaXN0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3RzLnNwbGljZSh0aGlzLmRpc3RzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwb2x5Z29uLCBjYW4ndCBjb25uZWN0XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ29ubmVjdCB0byBuZXcgZG90IG9yIHRvIGZpcnN0IGRvdCAoY3JlYXRpbmcgcG9seWdvbilcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5maW5kTGluZURvdChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDAgfHwgaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwKSB0aGlzLmlzUG9seWdvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzdHMucHVzaChNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRpc3QpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtPSB0aGlzLmRpc3RzW3RoaXMuZGlzdHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMucHVzaChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgbGV0IGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZmluZExpbmVEb3QoZG90KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lRG90c1tpXSA9PT0gZG90KSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgR2FtZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2JhcicpLmNzcyh7bGVmdDogd2lkdGgvMi0xMjUsIGJvdHRvbTogLTgwfSk7XG5cbiAgICB0aGlzLnBhdGhMZW5ndGggPSA1NTQ7XG4gICAgdGhpcy5yZXN0YXJ0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGNvbG9yID0gXCIjXCIgKyBjb2xvci50b1N0cmluZygxNik7XG4gICAgZmlsbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihNYXRoLm1heChmaWxsUGVyY2VudGFnZSwgMC4wKSwgMTAwLjApO1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBzZXRTY29yZShuZXdTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSBwYXJzZUZsb2F0KG5ld1Njb3JlKS50b0ZpeGVkKDApO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dChwYXJzZUZsb2F0KHRoaXMuY291bnROdW0pLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluLCBjb2xvckZsYWcpIHtcbiAgICBsZXQgY2YgPSBjb2xvckZsYWcgPyBjb2xvckZsYWcgOiBmYWxzZTtcbiAgICByZW1haW4gPSBNYXRoLm1pbihNYXRoLm1heChyZW1haW4sIDApLCAxMDApO1xuXG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcblxuICAgIGlmIChjZikgcmV0dXJuO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5wcmV2U2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQoJzEwMCUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3Qgc3RhcnREb3RzID0gTWF0aC5mbG9vcigod2luZG93LmlubmVyV2lkdGggLSA1MCkgLyAxMjApICogTWF0aC5mbG9vcigod2luZG93LmlubmVySGVpZ2h0IC0gNTApIC8gMTIwKTtcblxuLy8gU0NPUklOR1xuZXhwb3J0IGNvbnN0IGRpc3RNdWx0ID0gKHN0YXJ0RG90cyAqIDAuMDI1KSAvIDEwNDsgLy8gNTQ7IC8vIFNjYWxlcyBiYXNlZCBvbiBudW1iZXIgb2YgZG90c1xuZXhwb3J0IGNvbnN0IHNjb3JlTXVsdCA9IDI7XG5leHBvcnQgY29uc3QgcGF0aEJvbnVzTGVuZ3RoID0gNztcbmV4cG9ydCBjb25zdCBwb2x5Z29uU2NvcmUgPSAxMDA7XG5cbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG5cbmV4cG9ydCBjb25zdCBidXR0b25Tb3VuZCA9IG5ldyBIb3dsKHtcbiAgc3JjOiBbJ2F1ZGlvL2J1dHRvbi5tcDMnXSxcbiAgdm9sdW1lOiAxLFxuICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBieWVTb3VuZCA9IG5ldyBIb3dsKHtcbiAgc3JjOiBbJ2F1ZGlvL2J5ZS5tcDMnXSxcbiAgdm9sdW1lOiAxLFxuICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIG92ZXJsYXAoeDEsIHkxLCByMSwgeDIsIHkyLCByMikge1xuICAgIGxldCBkeCA9IHgxIC0geDI7XG4gICAgbGV0IGR5ID0geTEgLSB5MjtcbiAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHgqZHggKyBkeSpkeSk7XG4gICAgaWYgKGRpc3RhbmNlIDw9IHIxICsgcjIpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29sbGlkZUNpcmNzKGRvdDEsIGRvdDIpIHtcbiAgICBpZiAob3ZlcmxhcChkb3QxLmQueCwgZG90MS5kLnksIGRvdDEucmFkLCBkb3QyLmQueCwgZG90Mi5kLnksIGRvdDIucmFkKSkge1xuICAgICAgICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2FtZWRldmVsb3BtZW50LnR1dHNwbHVzLmNvbS90dXRvcmlhbHMvd2hlbi13b3JsZHMtY29sbGlkZS1zaW11bGF0aW5nLWNpcmNsZS1jaXJjbGUtY29sbGlzaW9ucy0tZ2FtZWRldi03NjlcbiAgICAgICAgbGV0IHZmMXggPSBkb3QyLmQudng7XG4gICAgICAgIGxldCB2ZjF5ID0gZG90Mi5kLnZ5O1xuICAgICAgICBsZXQgdmYyeCA9IGRvdDEuZC52eDtcbiAgICAgICAgbGV0IHZmMnkgPSBkb3QxLmQudnk7XG5cbiAgICAgICAgZG90MS5kLnZ4ID0gdmYxeDtcbiAgICAgICAgZG90MS5kLnZ5ID0gdmYxeTtcbiAgICAgICAgZG90Mi5kLnZ4ID0gdmYyeDtcbiAgICAgICAgZG90Mi5kLnZ5ID0gdmYyeTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVXYWxscyhkb3QsIHdhbGxzKSB7XG4gICAgbGV0IHJhZGl1cyA9IGRvdC5yYWQ7XG4gICAgbGV0IGQgPSBkb3QuZDtcbiAgICBsZXQgbGVmdCA9IGQueCAtIHJhZGl1cztcbiAgICBsZXQgcmlnaHQgPSBkLnggKyByYWRpdXM7XG4gICAgbGV0IHRvcCA9IGQueSAtIHJhZGl1cztcbiAgICBsZXQgYm90dG9tID0gZC55ICsgcmFkaXVzO1xuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggbGVmdCB3YWxsXG4gICAgaWYgKGxlZnQgPCAxICkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggcmlnaHQgd2FsbFxuICAgIGVsc2UgaWYgKHJpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgtMSkge1xuICAgICAgICBkLnZ4ID0gLWQudng7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZHMgd2l0aCB0b3Agd2FsbFxuICAgIGVsc2UgaWYgKHRvcCA8IDEgKSB7XG4gICAgICAgIGQudnkgPSAtZC52eTtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCBib3R0b20gd2FsbFxuICAgIGVsc2UgaWYgKCBib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQtMSkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscyB9O1xuIiwiaW1wb3J0IHsgYnV0dG9uU291bmQgfSBmcm9tICcuL0hlbHBlcnMuanMnO1xuXG5jbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGJ1dHRvblNvdW5kLnBsYXkoKTtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBFbmRNZXNzYWdlIGZyb20gJy4vRW5kTWVzc2FnZSc7XG5pbXBvcnQgR2FtZUJhciBmcm9tICcuL0dhbWVCYXInO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuICAvLyBCZWdpbiBzdGF0c1xuICBsZXQgc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgc3RhdHMuc2hvd1BhbmVsKCAwKTsgLy8gMDogZnBzLCAxOiBtcywgMjogbWIsIDMrOiBjdXN0b21cbiAgLy8gY29uc29sZS5sb2coc3RhdHMpO1xuICBsZXQgZG9tID0gc3RhdHMuZG9tRWxlbWVudDtcbiAgZG9tLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3RhdHNEaXYnKTtcbiAgJChkb20pLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGRvbSApO1xuXG4gIC8vIEJlZ2luIGF1ZGlvXG4gIGxldCBiYWNrZ3JvdW5kID0gbmV3IEhvd2woe1xuICAgIHNyYzogWydhdWRpby9yaWxleS5tcDMnXSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIHZvbHVtZTogMSxcbiAgICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEJlZ2luIHJlbmRlclxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGdhbWVCYXIgPSBuZXcgR2FtZUJhcigpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBnYW1lQmFyKTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVCYXIuaW5pdCgpO1xuICAgIGdhbWVCYXIuZmlsbEJhcignd2hpdGUnLCAwKTtcbiAgICBnYW1lQmFyLnNldFNjb3JlKDApO1xuICAgIGdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZygxMDApO1xuICB9XG5cbiAgbGV0IHJlc3RhcnQgPSBmYWxzZTtcbiAgbGV0IGVuZCA9IG51bGw7XG4gIGxldCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnLmtpbGxBbGwoKTtcbiAgICByZXN0YXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIGxldCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIHN0YXRzLmJlZ2luKCk7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIGlmKGcuY2hlY2tFbmRHYW1lKCkpIHtcbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICBlbmQgPSBuZXcgRW5kTWVzc2FnZShnLmdldFNjb3JlKCksIHJlc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0YXJ0KSB7XG4gICAgICAgIGlmIChnLm51bURvdHMgPT0gMCkge1xuICAgICAgICAgIGdhbWVCYXIucmVzdGFydCgpO1xuICAgICAgICAgIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgICAgZyA9IG5ldyBHYW1lKHN0YWdlLCBnYW1lQmFyKTtcbiAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgIHJlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICAgICAgc3RhdHMuZW5kKCk7XG4gIH1cblxuICByZW5kZXIoKTtcblxuICAkKCdib2R5Jykua2V5cHJlc3MoZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgIGlmICggZXZlbnQua2V5ID09PSAndCcgKSB7XG4gICAgICAvLyBUXG4gICAgICAkKCcjc3RhdHNEaXYnKS50b2dnbGUoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ3InKSB7XG4gICAgICAvLyBSXG4gICAgICByZXN0YXJ0R2FtZSgpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnbScpIHtcbiAgICAgIC8vIE1cbiAgICAgIGlmIChiYWNrZ3JvdW5kLnZvbHVtZSgpID09PSAwLjApXG4gICAgICAgIGJhY2tncm91bmQudm9sdW1lKDEuMCk7XG4gICAgICBlbHNlXG4gICAgICAgIGJhY2tncm91bmQudm9sdW1lKDAuMCk7XG4gICAgfVxuICB9KTtcbn0pKCk7XG4iXX0=
