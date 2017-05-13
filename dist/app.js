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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9FbmRNZXNzYWdlLmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7SUFFTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxxQkFBYjs7QUFFQSxTQUFLLENBQUwsR0FBUyxJQUFJLEtBQUssUUFBVCxFQUFUO0FBQ0EsU0FBSyxDQUFMLENBQU8sU0FBUCxDQUFpQixLQUFLLEtBQXRCO0FBQ0EsU0FBSyxDQUFMLENBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUFLLEdBQTdCO0FBQ0EsU0FBSyxDQUFMLENBQU8sT0FBUDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLEVBQVAsR0FBYSxLQUFLLE1BQUwsS0FBZ0IsQ0FB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QVQsTUFBUyxHQUFNO0FBQ2YsMEJBQXNCLE1BQXRCO0FBQ0EsVUFBTSxLQUFOO0FBQ0EsTUFBRSxJQUFGO0FBQ0EsUUFBRyxFQUFFLFlBQUYsRUFBSCxFQUFxQjtBQUNuQixVQUFJLENBQUMsR0FBTCxFQUFVO0FBQ1IsY0FBTSx5QkFBZSxFQUFFLFFBQUYsRUFBZixFQUE2QixZQUFZLElBQVosV0FBN0IsQ0FBTjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSSxPQUFKLEVBQWE7QUFDWCxVQUFJLEVBQUUsT0FBRixJQUFhLENBQWpCLEVBQW9CO0FBQ2xCLGdCQUFRLE9BQVI7QUFDQSxnQkFBUSxJQUFJLEtBQUssU0FBVCxFQUFSO0FBQ0EsWUFBSSxtQkFBUyxLQUFULEVBQWdCLE9BQWhCLENBQUo7QUFDQSxjQUFNLElBQU47QUFDQSxrQkFBVSxLQUFWO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEI7QUFDQSxVQUFNLEdBQU47QUFDSCxHQXRCRDs7QUF3QkE7O0FBRUEsSUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixVQUFVLEtBQVYsRUFBa0I7QUFDbkMsUUFBSyxNQUFNLEdBQU4sS0FBYyxHQUFuQixFQUF5QjtBQUN2QjtBQUNBLFFBQUUsV0FBRixFQUFlLE1BQWY7QUFDRCxLQUhELE1BR08sSUFBSSxNQUFNLEdBQU4sS0FBYyxHQUFsQixFQUF1QjtBQUM1QjtBQUNBO0FBQ0QsS0FITSxNQUdBLElBQUksTUFBTSxHQUFOLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUI7QUFDQSxVQUFJLFdBQVcsTUFBWCxPQUF3QixHQUE1QixFQUNFLFdBQVcsTUFBWCxDQUFrQixHQUFsQixFQURGLEtBR0UsV0FBVyxNQUFYLENBQWtCLEdBQWxCO0FBQ0g7QUFDRixHQWREO0FBZUQsQ0FqR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtzY29yZU11bHR9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIERvdCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3MsIHJhZCkge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRjAwMDA7XG4gICAgdGhpcy5yYWQgPSByYWQgPyByYWQgOiBNYXRoLnJhbmRvbSgpKjIwKzE1O1xuICAgIGxldCBwID0gcG9zID8gcG9zIDogW01hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCwgTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICB0aGlzLnNjYWxlID0gMDtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLnJhZCpzY29yZU11bHQ7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyLjU7XG4gICAgdGhpcy5vLnkgPSBwWzFdIC0gdGhpcy5kLnZ5KjIuNTtcbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLmtpbGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3Jvd2luZyA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmdyb3dpbmcpIHtcbiAgICAgIHRoaXMuc2NhbGUgKz0gLjA1O1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcblxuICAgICAgaWYgKHRoaXMuc2NhbGUgPiAxKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLmdyb3dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmQueCArPSB0aGlzLmQudng7XG4gICAgdGhpcy5kLnkgKz0gdGhpcy5kLnZ5O1xuXG4gICAgdGhpcy5vLnggPSB0aGlzLmQueCAtIHRoaXMuZC52eCoyLjU7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyLjU7XG5cbiAgICBpZiAodGhpcy5raWxsZWQpIHtcbiAgICAgIHRoaXMuc2NhbGUgLT0gLjI7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuICAgICAgaWYgKHRoaXMuc2NhbGUgPCAtLjAwNSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMDtcbiAgICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY2FsZXMoKSB7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcblxuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gIH1cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmQsIHRoaXMub107XG4gIH1cblxuICBraWxsKCkge1xuICAgIHRoaXMua2lsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvdDtcbiIsImltcG9ydCB7IGJ1dHRvblNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzLmpzJztcblxuY2xhc3MgRW5kTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlLCByZXN0YXJ0Q0IpIHtcbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGJ1dHRvblNvdW5kLnBsYXkoKTtcbiAgICAgICQoJyNlbmRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTUwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gICAgICBjb25zb2xlLmxvZygnaGlpJyk7XG4gICAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAkKCcjc2hhZGUyJykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlc3RhcnRDQigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjZW5kQ29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiBoZWlnaHQvMi0yNzV9KTtcbiAgICAkKCcjZW5kU2NvcmUnKS50ZXh0KHBhcnNlRmxvYXQoc2NvcmUpLnRvRml4ZWQoMCkpO1xuXG4gICAgJCgnI3NoYWRlMicpLnNob3coKTtcbiAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICBvcGFjaXR5OiAxXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5kTWVzc2FnZTtcbiIsImltcG9ydCBEb3QgZnJvbSAnLi9Eb3QnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQgeyBiZ0NvbG9yLCBkb3RDb2xvcnMsIHN0YXJ0RG90cywgZGlzdE11bHQsIHBvbHlnb25TY29yZSwgcGF0aEJvbnVzTGVuZ3RoLCBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscywgYnllU291bmQgfSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Ioc3RhZ2UsIGcpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5nYW1lQmFyID0gZztcbiAgICB0aGlzLnN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2Uub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCB0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0ge307XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnREb3RzID0gc3RhcnREb3RzO1xuICAgIHRoaXMubnVtRG90cyA9IDA7XG4gICAgdGhpcy5kb3RDb2xvcnMgPSBkb3RDb2xvcnM7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG5cbiAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMuZGlzdHMgPSBbXTtcblxuICAgIHRoaXMuaW5pdFdhbGxzKCk7XG4gICAgdGhpcy5pbml0RG90cygpO1xuICB9XG5cbiAgZ2V0U2NvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gIH1cblxuICBraWxsQWxsKCkge1xuICAgICAgdGhpcy5kb3RzLmZvckVhY2goZCA9PiBkLmtpbGwoKSk7XG4gIH1cblxuICBpbml0RG90cygpIHtcbiAgICBsZXQgcmVzZWxlY3QgPSBmYWxzZTtcbiAgICB3aGlsZSAodGhpcy5udW1Eb3RzIDwgdGhpcy5zdGFydERvdHMpIHtcbiAgICAgICAgbGV0IHBvcyA9IHsgeDogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoIC0gNzApLCB5OiAzNSArIE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVySGVpZ2h0IC0gNzApIH07XG4gICAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW3Bvcy54LCBwb3MueV0sIE1hdGgucmFuZG9tKCkqMjArMTUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxhcChkLmQueCwgZC5kLnksIGQucmFkLCB0aGlzLmRvdHNbaV0uZC54LCB0aGlzLmRvdHNbaV0uZC55LCB0aGlzLmRvdHNbaV0ucmFkKSkge1xuICAgICAgICAgICAgICAgIHJlc2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzZWxlY3QpIHtcbiAgICAgICAgICAgIHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IHt0b3A6IHdhbGxUb3AsIGxlZnQ6IHdhbGxMZWZ0LCBib3R0b206IHdhbGxCb3R0b20sIHJpZ2h0OiB3YWxsUmlnaHR9O1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJEb3RzKCk7XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyTGluZSgpO1xuICAgIHRoaXMudXBkYXRlU2NvcmVNdWx0aXBsaWVyKCk7XG5cbiAgICB0aGlzLnJlbmRlckRyYWdMaW5lKCk7XG4gIH1cblxuICBjaGVja0VuZEdhbWUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgIyBvZiBkb3RzIG9mIGVhY2ggY29sb3IgYXJlIGFsbCAxIG9yIDBcbiAgICBsZXQgY29sb3JDb3VudCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb2xvckNvdW50LnB1c2goMCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgIGxldCBjSWR4ID0gZG90Q29sb3JzLmluZGV4T2YoZC5jb2xvcik7XG4gICAgICBjb2xvckNvdW50W2NJZHhdKys7XG4gICAgfSk7XG5cbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgY29sb3JDb3VudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZSA8PSAxKSBjb3VudGVyKys7XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnRlciA9PT0gZG90Q29sb3JzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBubyBsaW5lIGxlZnRcbiAgICBpZiAodGhpcy5sZW5ndGhSZW1haW5pbmcgPD0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBhbGwgZG90cyBraWxsZWRcbiAgICBpZiAodGhpcy5udW1Eb3RzID09PSAwKSB7XG4gICAgICB0aGlzLnNjb3JlICs9IHRoaXMubGVuZ3RoUmVtYWluaW5nKjEwO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFNjb3JlKHRoaXMuc2NvcmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5sZW5ndGhSZW1haW5pbmcsIHRydWUpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRDb2xvcklkeChjb2xvcikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjb2xvciA9PT0gdGhpcy5kb3RDb2xvcnNbaV0pIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmVuZGVyRG90cygpIHtcbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCwgaSkgPT4ge1xuXG4gICAgY29sbGlkZVdhbGxzKGQsIHRoaXMud2FsbHMpO1xuXG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICBjb2xsaWRlQ2lyY3MoZCwgdGhpcy5kb3RzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZC5zdGVwKCk7XG5cbiAgICAgIGlmIChkLmRlYWQpIHtcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgICAgdGhpcy5kb3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzIC09IDE7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckxpbmUoKSB7XG4gICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0uZC54LCB0aGlzLmxpbmVEb3RzW2ldLmQueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0uZC54LCB0aGlzLmxpbmVEb3RzW2krMV0uZC55KTtcbiAgICB9XG4gICAgdGhpcy5saW5lR3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICB9XG5cbiAgcmVuZGVyRHJhZ0xpbmUoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmRyYWdMaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLm1vdmVUbyh0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueCwgdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLnkpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lVG8odGhpcy5wb3MueCwgdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NvcmVNdWx0aXBsaWVyKCkge1xuICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgZnJhYyA9IHRoaXMubGluZURvdHMubGVuZ3RoL3BhdGhCb251c0xlbmd0aDtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMSArIGZyYWMqMjtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCBmcmFjKjEwMC4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBzdGFydC5jb2xvcjtcbiAgICAgIH1cbiAgfVxuXG4gIG9uRHJhZ0VuZCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IHRvQWRkID0gMDtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgdG9BZGQgKz0gZC5raWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSB0b0FkZCArPSBwb2x5Z29uU2NvcmU7XG4gICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgIGJ5ZVNvdW5kLnBsYXkoKTtcblxuICAgICAgICB0aGlzLnNjb3JlICs9IHRvQWRkKnRoaXMuc2NvcmVNdWx0aXBsaWVyO1xuICAgICAgICB0aGlzLmdhbWVCYXIuc2V0U2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICB9XG5cbiAgb25EcmFnTW92ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgICAgICBsZXQgZHJhZ0Rpc3QgPSAodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKih0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtIE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZHJhZ0Rpc3QpKTtcbiAgICAgICAgICBsZXQgbWlkID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgICAgICBpZiAobWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gQ29ubmVjdCBkb3RzIG9mIHRoZSBzYW1lIGNvbG9yXG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBnb2luZyBiYWNrd2FyZCwgcmVtb3ZlIGxpbmVcbiAgICAgICAgICAgICAgICAgIGlmIChtaWQgPT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAyXSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5zcGxpY2UodGhpcy5saW5lRG90cy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgKz0gdGhpcy5kaXN0c1t0aGlzLmRpc3RzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzdHMuc3BsaWNlKHRoaXMuZGlzdHMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHBvbHlnb24sIGNhbid0IGNvbm5lY3RcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1BvbHlnb24pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBDb25uZWN0IHRvIG5ldyBkb3Qgb3IgdG8gZmlyc3QgZG90IChjcmVhdGluZyBwb2x5Z29uKVxuICAgICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSB0aGlzLmZpbmRMaW5lRG90KG1pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gMCB8fCBpZHggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDApIHRoaXMuaXNQb2x5Z29uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKihtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIChtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXN0cy5wdXNoKE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZGlzdCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC09IHRoaXMuZGlzdHNbdGhpcy5kaXN0cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKG1pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgZmluZERvdChwb3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICBsZXQgc25hcFBvcyA9IHsgeDp0aGlzLmRvdHNbaV0uZC54LCB5OnRoaXMuZG90c1tpXS5kLnkgfTtcbiAgICAgICAgICBsZXQgcmFkID0gdGhpcy5kb3RzW2ldLnJhZDtcbiAgICAgICAgICBsZXQgZGlzdCA9IChwb3MueC1zbmFwUG9zLngpKihwb3MueC1zbmFwUG9zLngpICtcbiAgICAgICAgICAgICAgICAgICAgIChwb3MueS1zbmFwUG9zLnkpKihwb3MueS1zbmFwUG9zLnkpO1xuICAgICAgICAgIGlmIChkaXN0IDw9IHJhZCpyYWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZG90c1tpXSAhPT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG90c1tpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmaW5kTGluZURvdChkb3QpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmxpbmVEb3RzW2ldID09PSBkb3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBHYW1lQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjYmFyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTEyNSwgYm90dG9tOiAtODB9KTtcblxuICAgIHRoaXMucGF0aExlbmd0aCA9IDU1NDtcbiAgICB0aGlzLnJlc3RhcnQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnI2JhcicpLmFuaW1hdGUoe1xuICAgICAgYm90dG9tOiAzMFxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgfVxuXG4gIGZpbGxCYXIoY29sb3IsIGZpbGxQZXJjZW50YWdlKSB7XG4gICAgY29sb3IgPSBcIiNcIiArIGNvbG9yLnRvU3RyaW5nKDE2KTtcbiAgICBmaWxsUGVyY2VudGFnZSA9IE1hdGgubWluKE1hdGgubWF4KGZpbGxQZXJjZW50YWdlLCAwLjApLCAxMDAuMCk7XG4gICAgbGV0IG0gPSB0aGlzLnBhdGhMZW5ndGgvKC0xMDAuMCk7XG4gICAgbGV0IHkgPSBtKmZpbGxQZXJjZW50YWdlK3RoaXMucGF0aExlbmd0aDtcbiAgICAkKCcjYmFyJykuY3NzKHtzdHJva2U6IGNvbG9yLCBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IHl9KTtcbiAgfVxuXG4gIHNldFNjb3JlKG5ld1Njb3JlKSB7XG4gICAgdGhpcy5zY29yZSA9IHBhcnNlRmxvYXQobmV3U2NvcmUpLnRvRml4ZWQoMCk7XG4gICAgJCh7Y291bnROdW06IHRoaXMucHJldlNjb3JlfSkuYW5pbWF0ZSh7Y291bnROdW06IHRoaXMuc2NvcmV9LCB7XG4gICAgICBkdXJhdGlvbjogMjUwLFxuICAgICAgZWFzaW5nOidsaW5lYXInLFxuICAgICAgc3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdoYXQgdG9kbyBvbiBldmVyeSBjb3VudFxuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHBhcnNlRmxvYXQodGhpcy5jb3VudE51bSkudG9GaXhlZCgwKSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5wcmV2U2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0UGVyY2VudFJlbWFpbmluZyhyZW1haW4sIGNvbG9yRmxhZykge1xuICAgIGxldCBjZiA9IGNvbG9yRmxhZyA/IGNvbG9yRmxhZyA6IGZhbHNlO1xuICAgIHJlbWFpbiA9IE1hdGgubWluKE1hdGgubWF4KHJlbWFpbiwgMCksIDEwMCk7XG5cbiAgICAkKCcjcmVtYWluaW5nJykudGV4dChyZW1haW4gKyAnJScpO1xuXG4gICAgaWYgKGNmKSByZXR1cm47XG4gICAgaWYgKHJlbWFpbiA8PSAyMCkge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICdyZWQnfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAnd2hpdGUnfSk7XG4gICAgfVxuICB9XG5cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnByZXZTY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dCgnMTAwJScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCYXJcbiIsImV4cG9ydCBjb25zdCBzdGFydERvdHMgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDUwKSAvIDEyMCkgKiBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MCkgLyAxMjApO1xuXG4vLyBTQ09SSU5HXG5leHBvcnQgY29uc3QgZGlzdE11bHQgPSAoc3RhcnREb3RzICogMC4wMjUpIC8gMTA0OyAvLyA1NDsgLy8gU2NhbGVzIGJhc2VkIG9uIG51bWJlciBvZiBkb3RzXG5leHBvcnQgY29uc3Qgc2NvcmVNdWx0ID0gMjtcbmV4cG9ydCBjb25zdCBwYXRoQm9udXNMZW5ndGggPSA3O1xuZXhwb3J0IGNvbnN0IHBvbHlnb25TY29yZSA9IDEwMDtcblxuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcblxuZXhwb3J0IGNvbnN0IGJ1dHRvblNvdW5kID0gbmV3IEhvd2woe1xuICBzcmM6IFsnYXVkaW8vYnV0dG9uLm1wMyddLFxuICB2b2x1bWU6IDEsXG4gIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGJ5ZVNvdW5kID0gbmV3IEhvd2woe1xuICBzcmM6IFsnYXVkaW8vYnllLm1wMyddLFxuICB2b2x1bWU6IDEsXG4gIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICB9XG59KTtcblxuZnVuY3Rpb24gb3ZlcmxhcCh4MSwgeTEsIHIxLCB4MiwgeTIsIHIyKSB7XG4gICAgbGV0IGR4ID0geDEgLSB4MjtcbiAgICBsZXQgZHkgPSB5MSAtIHkyO1xuICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCpkeCArIGR5KmR5KTtcbiAgICBpZiAoZGlzdGFuY2UgPD0gcjEgKyByMikgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjb2xsaWRlQ2lyY3MoZG90MSwgZG90Mikge1xuICAgIGlmIChvdmVybGFwKGRvdDEuZC54LCBkb3QxLmQueSwgZG90MS5yYWQsIGRvdDIuZC54LCBkb3QyLmQueSwgZG90Mi5yYWQpKSB7XG4gICAgICAgIC8vIFRha2VuIGZyb20gaHR0cHM6Ly9nYW1lZGV2ZWxvcG1lbnQudHV0c3BsdXMuY29tL3R1dG9yaWFscy93aGVuLXdvcmxkcy1jb2xsaWRlLXNpbXVsYXRpbmctY2lyY2xlLWNpcmNsZS1jb2xsaXNpb25zLS1nYW1lZGV2LTc2OVxuICAgICAgICBsZXQgdmYxeCA9IGRvdDIuZC52eDtcbiAgICAgICAgbGV0IHZmMXkgPSBkb3QyLmQudnk7XG4gICAgICAgIGxldCB2ZjJ4ID0gZG90MS5kLnZ4O1xuICAgICAgICBsZXQgdmYyeSA9IGRvdDEuZC52eTtcblxuICAgICAgICBkb3QxLmQudnggPSB2ZjF4O1xuICAgICAgICBkb3QxLmQudnkgPSB2ZjF5O1xuICAgICAgICBkb3QyLmQudnggPSB2ZjJ4O1xuICAgICAgICBkb3QyLmQudnkgPSB2ZjJ5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29sbGlkZVdhbGxzKGRvdCwgd2FsbHMpIHtcbiAgICBsZXQgcmFkaXVzID0gZG90LnJhZDtcbiAgICBsZXQgZCA9IGRvdC5kO1xuICAgIGxldCBsZWZ0ID0gZC54IC0gcmFkaXVzO1xuICAgIGxldCByaWdodCA9IGQueCArIHJhZGl1cztcbiAgICBsZXQgdG9wID0gZC55IC0gcmFkaXVzO1xuICAgIGxldCBib3R0b20gPSBkLnkgKyByYWRpdXM7XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCBsZWZ0IHdhbGxcbiAgICBpZiAobGVmdCA8IDEgKSB7XG4gICAgICAgIGQudnggPSAtZC52eDtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkZXMgd2l0aCByaWdodCB3YWxsXG4gICAgZWxzZSBpZiAocmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aC0xKSB7XG4gICAgICAgIGQudnggPSAtZC52eDtcbiAgICB9XG5cbiAgICAvLyBkb3QgY29sbGlkcyB3aXRoIHRvcCB3YWxsXG4gICAgZWxzZSBpZiAodG9wIDwgMSApIHtcbiAgICAgICAgZC52eSA9IC1kLnZ5O1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIGJvdHRvbSB3YWxsXG4gICAgZWxzZSBpZiAoIGJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodC0xKSB7XG4gICAgICAgIGQudnkgPSAtZC52eTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IG92ZXJsYXAsIGNvbGxpZGVDaXJjcywgY29sbGlkZVdhbGxzIH07XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIFN0YXJ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGNiKSB7XG4gICAgLy8gdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgYnV0dG9uU291bmQucGxheSgpO1xuICAgICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTUzMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gICAgICAkKCcjc2hhZGUnKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IC01MzB9KTtcblxuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgdG9wOiBoZWlnaHQvMi0yNjVcbiAgICB9LCA0MDAwLCAnZWFzZU91dEVsYXN0aWMnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydE1lc3NhZ2U7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTdGFydE1lc3NhZ2UgZnJvbSAnLi9TdGFydE1lc3NhZ2UnO1xuaW1wb3J0IEVuZE1lc3NhZ2UgZnJvbSAnLi9FbmRNZXNzYWdlJztcbmltcG9ydCBHYW1lQmFyIGZyb20gJy4vR2FtZUJhcic7XG5pbXBvcnQge2JnQ29sb3J9IGZyb20gJy4vSGVscGVycyc7XG5cbigoKSA9PiB7XG4gIC8vIEJlZ2luIHN0YXRzXG4gIGxldCBzdGF0cyA9IG5ldyBTdGF0cygpO1xuICBzdGF0cy5zaG93UGFuZWwoIDApOyAvLyAwOiBmcHMsIDE6IG1zLCAyOiBtYiwgMys6IGN1c3RvbVxuICAvLyBjb25zb2xlLmxvZyhzdGF0cyk7XG4gIGxldCBkb20gPSBzdGF0cy5kb21FbGVtZW50O1xuICBkb20uc2V0QXR0cmlidXRlKCdpZCcsICdzdGF0c0RpdicpO1xuICAkKGRvbSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggZG9tICk7XG5cbiAgLy8gQmVnaW4gYXVkaW9cbiAgbGV0IGJhY2tncm91bmQgPSBuZXcgSG93bCh7XG4gICAgc3JjOiBbJ2F1ZGlvL3JpbGV5Lm1wMyddLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgdm9sdW1lOiAxLFxuICAgIG9uZW5kOiBmdW5jdGlvbigpIHtcblxuICAgIH1cbiAgfSk7XG5cbiAgLy8gQmVnaW4gcmVuZGVyXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgZ2FtZUJhciA9IG5ldyBHYW1lQmFyKCk7XG4gIGxldCBnID0gbmV3IEdhbWUoc3RhZ2UsIGdhbWVCYXIpO1xuXG4gIGxldCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZUJhci5pbml0KCk7XG4gICAgZ2FtZUJhci5maWxsQmFyKCd3aGl0ZScsIDApO1xuICAgIGdhbWVCYXIuc2V0U2NvcmUoMCk7XG4gICAgZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKDEwMCk7XG4gIH1cblxuICBsZXQgcmVzdGFydCA9IGZhbHNlO1xuICBsZXQgZW5kID0gbnVsbDtcbiAgbGV0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGcua2lsbEFsbCgpO1xuICAgIHJlc3RhcnQgPSB0cnVlO1xuICB9XG5cbiAgbGV0IHN0YXJ0ID0gbmV3IFN0YXJ0TWVzc2FnZShzdGFydEdhbWUuYmluZCh0aGlzKSk7XG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgc3RhdHMuYmVnaW4oKTtcbiAgICAgIGcuc3RlcCgpO1xuICAgICAgaWYoZy5jaGVja0VuZEdhbWUoKSkge1xuICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgIGVuZCA9IG5ldyBFbmRNZXNzYWdlKGcuZ2V0U2NvcmUoKSwgcmVzdGFydEdhbWUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3RhcnQpIHtcbiAgICAgICAgaWYgKGcubnVtRG90cyA9PSAwKSB7XG4gICAgICAgICAgZ2FtZUJhci5yZXN0YXJ0KCk7XG4gICAgICAgICAgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgICBnID0gbmV3IEdhbWUoc3RhZ2UsIGdhbWVCYXIpO1xuICAgICAgICAgIGVuZCA9IG51bGw7XG4gICAgICAgICAgcmVzdGFydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gICAgICBzdGF0cy5lbmQoKTtcbiAgfVxuXG4gIHJlbmRlcigpO1xuXG4gICQoJ2JvZHknKS5rZXlwcmVzcyhmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgaWYgKCBldmVudC5rZXkgPT09ICd0JyApIHtcbiAgICAgIC8vIFRcbiAgICAgICQoJyNzdGF0c0RpdicpLnRvZ2dsZSgpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAncicpIHtcbiAgICAgIC8vIFJcbiAgICAgIHJlc3RhcnRHYW1lKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdtJykge1xuICAgICAgLy8gTVxuICAgICAgaWYgKGJhY2tncm91bmQudm9sdW1lKCkgPT09IDAuMClcbiAgICAgICAgYmFja2dyb3VuZC52b2x1bWUoMS4wKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYmFja2dyb3VuZC52b2x1bWUoMC4wKTtcbiAgICB9XG4gIH0pO1xufSkoKTtcbiJdfQ==
