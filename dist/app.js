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
var distMult = exports.distMult = startDots * 0.025 / 54; // Scales based on number of dots
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9FbmRNZXNzYWdlLmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7Ozs7SUFFTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssS0FBTCxHQUFhLEtBQUssR0FBTCxxQkFBYjs7QUFFQSxTQUFLLENBQUwsR0FBUyxJQUFJLEtBQUssUUFBVCxFQUFUO0FBQ0EsU0FBSyxDQUFMLENBQU8sU0FBUCxDQUFpQixLQUFLLEtBQXRCO0FBQ0EsU0FBSyxDQUFMLENBQU8sVUFBUCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUFLLEdBQTdCO0FBQ0EsU0FBSyxDQUFMLENBQU8sT0FBUDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLENBQVAsR0FBVyxFQUFFLENBQUYsQ0FBWDtBQUNBLFNBQUssQ0FBTCxDQUFPLEVBQVAsR0FBYSxLQUFLLE1BQUwsS0FBZ0IsQ0FB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SSxFQUFFLE9BQUYsSUFBYSxDQUFqQixFQUFvQjtBQUNsQixnQkFBUSxPQUFSO0FBQ0EsZ0JBQVEsSUFBSSxLQUFLLFNBQVQsRUFBUjtBQUNBLFlBQUksbUJBQVMsS0FBVCxFQUFnQixDQUFoQixFQUFtQixPQUFuQixDQUFKO0FBQ0EsY0FBTSxJQUFOO0FBQ0Esa0JBQVUsS0FBVjtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0EsVUFBTSxHQUFOO0FBQ0gsR0F0QkQ7O0FBd0JBO0FBQ0QsQ0FoRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtzY29yZU11bHR9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIERvdCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3MsIHJhZCkge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRjAwMDA7XG4gICAgdGhpcy5yYWQgPSByYWQgPyByYWQgOiBNYXRoLnJhbmRvbSgpKjIwKzE1O1xuICAgIGxldCBwID0gcG9zID8gcG9zIDogW01hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCwgTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICB0aGlzLnNjYWxlID0gMDtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLnJhZCpzY29yZU11bHQ7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyLjU7XG4gICAgdGhpcy5vLnkgPSBwWzFdIC0gdGhpcy5kLnZ5KjIuNTtcbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLmtpbGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3Jvd2luZyA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmdyb3dpbmcpIHtcbiAgICAgIHRoaXMuc2NhbGUgKz0gLjA1O1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcblxuICAgICAgaWYgKHRoaXMuc2NhbGUgPiAxKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLmdyb3dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmQueCArPSB0aGlzLmQudng7XG4gICAgdGhpcy5kLnkgKz0gdGhpcy5kLnZ5O1xuXG4gICAgdGhpcy5vLnggPSB0aGlzLmQueCAtIHRoaXMuZC52eCoyLjU7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyLjU7XG5cbiAgICBpZiAodGhpcy5raWxsZWQpIHtcbiAgICAgIHRoaXMuc2NhbGUgLT0gLjI7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuICAgICAgaWYgKHRoaXMuc2NhbGUgPCAtLjAwNSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMDtcbiAgICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY2FsZXMoKSB7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcblxuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gIH1cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmQsIHRoaXMub107XG4gIH1cblxuICBraWxsKCkge1xuICAgIHRoaXMua2lsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvdDtcbiIsImltcG9ydCB7IGJ1dHRvblNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzLmpzJztcblxuY2xhc3MgRW5kTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlLCByZXN0YXJ0Q0IpIHtcbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgIGJ1dHRvblNvdW5kLnBsYXkoKTtcbiAgICAgICQoJyNlbmRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTUwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gICAgICBjb25zb2xlLmxvZygnaGlpJyk7XG4gICAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAkKCcjc2hhZGUyJykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlc3RhcnRDQigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjZW5kQ29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiBoZWlnaHQvMi0yNzV9KTtcbiAgICAkKCcjZW5kU2NvcmUnKS50ZXh0KHBhcnNlRmxvYXQoc2NvcmUpLnRvRml4ZWQoMCkpO1xuXG4gICAgJCgnI3NoYWRlMicpLnNob3coKTtcbiAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICBvcGFjaXR5OiAxXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5kTWVzc2FnZTtcbiIsImltcG9ydCBEb3QgZnJvbSAnLi9Eb3QnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQgeyBiZ0NvbG9yLCBkb3RDb2xvcnMsIHN0YXJ0RG90cywgZGlzdE11bHQsIHBvbHlnb25TY29yZSwgcGF0aEJvbnVzTGVuZ3RoLCBvdmVybGFwLCBjb2xsaWRlQ2lyY3MsIGNvbGxpZGVXYWxscywgYnllU291bmQgfSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Ioc3RhZ2UsIGcpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5nYW1lQmFyID0gZztcbiAgICB0aGlzLnN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2Uub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCB0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0ge307XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcblxuICAgIHRoaXMuc3RhcnREb3RzID0gc3RhcnREb3RzO1xuICAgIHRoaXMubnVtRG90cyA9IDA7XG4gICAgdGhpcy5kb3RDb2xvcnMgPSBkb3RDb2xvcnM7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG5cbiAgICB0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMucHJldkRpc3QgPSAwO1xuXG4gICAgdGhpcy5pbml0V2FsbHMoKTtcbiAgICB0aGlzLmluaXREb3RzKCk7XG4gIH1cblxuICBnZXRTY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29yZTtcbiAgfVxuXG4gIGtpbGxBbGwoKSB7XG4gICAgICB0aGlzLmRvdHMuZm9yRWFjaChkID0+IGQua2lsbCgpKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGxldCByZXNlbGVjdCA9IGZhbHNlO1xuICAgIHdoaWxlICh0aGlzLm51bURvdHMgPCB0aGlzLnN0YXJ0RG90cykge1xuICAgICAgICBsZXQgcG9zID0geyB4OiAzNSArIE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggLSA3MCksIHk6IDM1ICsgTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCkgfTtcbiAgICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldLCBbcG9zLngsIHBvcy55XSwgTWF0aC5yYW5kb20oKSoyMCsxNSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChvdmVybGFwKGQuZC54LCBkLmQueSwgZC5yYWQsIHRoaXMuZG90c1tpXS5kLngsIHRoaXMuZG90c1tpXS5kLnksIHRoaXMuZG90c1tpXS5yYWQpKSB7XG4gICAgICAgICAgICAgICAgcmVzZWxlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNlbGVjdCkge1xuICAgICAgICAgICAgcmVzZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgICAgICB0aGlzLm51bURvdHMrKztcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLmFkZENoaWxkKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbml0V2FsbHMoKSB7XG4gICAgbGV0IHdhbGxDb2xvciA9IGJnQ29sb3I7XG5cbiAgICBsZXQgd2FsbFRvcCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxUb3AuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbExlZnQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbExlZnQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbEJvdHRvbSA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIHdpbmRvdy5pbm5lckhlaWdodC0xXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsQm90dG9tLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxSaWdodCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFt3aW5kb3cuaW5uZXJXaWR0aC0xLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsUmlnaHQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICB0aGlzLndhbGxzID0ge3RvcDogd2FsbFRvcCwgbGVmdDogd2FsbExlZnQsIGJvdHRvbTogd2FsbEJvdHRvbSwgcmlnaHQ6IHdhbGxSaWdodH07XG4gIH1cblxuICBzdGVwKCkge1xuICAgIC8vIFJlbmRlciBkb3QgZ3JhcGhpY3NcbiAgICB0aGlzLnJlbmRlckRvdHMoKTtcblxuICAgIC8vIFJlbmRlciBsaW5lIGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJMaW5lKCk7XG4gICAgdGhpcy51cGRhdGVTY29yZU11bHRpcGxpZXIoKTtcblxuICAgIHRoaXMucmVuZGVyRHJhZ0xpbmUoKTtcbiAgfVxuXG4gIGNoZWNrRW5kR2FtZSgpIHtcbiAgICAvLyBDaGVjayBpZiAjIG9mIGRvdHMgb2YgZWFjaCBjb2xvciBhcmUgYWxsIDEgb3IgMFxuICAgIGxldCBjb2xvckNvdW50ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb3RDb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbG9yQ291bnQucHVzaCgwKTtcbiAgICB9XG5cbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgbGV0IGNJZHggPSBkb3RDb2xvcnMuaW5kZXhPZihkLmNvbG9yKTtcbiAgICAgIGNvbG9yQ291bnRbY0lkeF0rKztcbiAgICB9KTtcblxuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBjb2xvckNvdW50LmZvckVhY2goKGUpID0+IHtcbiAgICAgIGlmIChlIDw9IDEpIGNvdW50ZXIrKztcbiAgICB9KTtcblxuICAgIGlmIChjb3VudGVyID09PSBkb3RDb2xvcnMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIE9SIG5vIGxpbmUgbGVmdFxuICAgIGlmICh0aGlzLmxlbmd0aFJlbWFpbmluZyA8PSAwKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIE9SIGFsbCBkb3RzIGtpbGxlZFxuICAgIGlmICh0aGlzLm51bURvdHMgPT09IDApIHtcbiAgICAgIHRoaXMuc2NvcmUgKz0gdGhpcy5sZW5ndGhSZW1haW5pbmcqMTA7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0U2NvcmUodGhpcy5zY29yZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmxlbmd0aFJlbWFpbmluZywgdHJ1ZSk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldENvbG9ySWR4KGNvbG9yKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNvbG9yID09PSB0aGlzLmRvdENvbG9yc1tpXSkgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cblxuICByZW5kZXJEb3RzKCkge1xuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkLCBpKSA9PiB7XG5cbiAgICBjb2xsaWRlV2FsbHMoZCwgdGhpcy53YWxscyk7XG5cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIGNvbGxpZGVDaXJjcyhkLCB0aGlzLmRvdHNbal0pO1xuICAgICAgfVxuXG4gICAgICBkLnN0ZXAoKTtcblxuICAgICAgaWYgKGQuZGVhZCkge1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQoZSkpO1xuICAgICAgICB0aGlzLmRvdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLm51bURvdHMgLT0gMTtcbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyTGluZSgpIHtcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5tb3ZlVG8odGhpcy5saW5lRG90c1tpXS5kLngsIHRoaXMubGluZURvdHNbaV0uZC55KTtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVRvKHRoaXMubGluZURvdHNbaSsxXS5kLngsIHRoaXMubGluZURvdHNbaSsxXS5kLnkpO1xuICAgIH1cbiAgICB0aGlzLmxpbmVHcmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gIH1cblxuICByZW5kZXJEcmFnTGluZSgpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubW92ZVRvKHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC54LCB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueSk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVUbyh0aGlzLnBvcy54LCB0aGlzLnBvcy55KTtcbiAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY29yZU11bHRpcGxpZXIoKSB7XG4gICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID49IDEpIHtcbiAgICAgIGxldCBmcmFjID0gdGhpcy5saW5lRG90cy5sZW5ndGgvcGF0aEJvbnVzTGVuZ3RoO1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxICsgZnJhYyoyO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIGZyYWMqMTAwLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG4gICAgICB0aGlzLmdhbWVCYXIuZmlsbEJhcih0aGlzLmxpbmVDb2xvciwgMCk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgIGlmIChzdGFydCkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2goc3RhcnQpO1xuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IHN0YXJ0LmNvbG9yO1xuICAgICAgfVxuICB9XG5cbiAgb25EcmFnRW5kKCkge1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID4gMSkge1xuICAgICAgICBsZXQgdG9BZGQgPSAwO1xuICAgICAgICB0aGlzLmxpbmVEb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICB0b0FkZCArPSBkLmtpbGwoKTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5pc1BvbHlnb24pIHRvQWRkICs9IHBvbHlnb25TY29yZTtcbiAgICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgICAgYnllU291bmQucGxheSgpO1xuXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdG9BZGQqdGhpcy5zY29yZU11bHRpcGxpZXI7XG4gICAgICAgIHRoaXMuZ2FtZUJhci5zZXRTY29yZSh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmc7XG4gICAgICB9XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgICAgIGxldCBkcmFnRGlzdCA9ICh0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKih0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgdGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkcmFnRGlzdCkpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBDb25uZWN0IGRvdHMgb2YgdGhlIHNhbWUgY29sb3JcbiAgICAgICAgICAgICAgaWYgKG1pZC5jb2xvciA9PT0gdGhpcy5saW5lQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGdvaW5nIGJhY2t3YXJkLCByZW1vdmUgbGluZVxuICAgICAgICAgICAgICAgICAgaWYgKG1pZCA9PT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnNwbGljZSh0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyArPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwb2x5Z29uLCBjYW4ndCBjb25uZWN0XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ29ubmVjdCB0byBuZXcgZG90IG9yIHRvIGZpcnN0IGRvdCAoY3JlYXRpbmcgcG9seWdvbilcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5maW5kTGluZURvdChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDAgfHwgaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwKSB0aGlzLmlzUG9seWdvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkRpc3QgPSBNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC09IHRoaXMucHJldkRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMucHVzaChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgbGV0IGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZmluZExpbmVEb3QoZG90KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lRG90c1tpXSA9PT0gZG90KSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgR2FtZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2JhcicpLmNzcyh7bGVmdDogd2lkdGgvMi0xMjUsIGJvdHRvbTogLTgwfSk7XG5cbiAgICB0aGlzLnBhdGhMZW5ndGggPSA1NTQ7XG4gICAgdGhpcy5yZXN0YXJ0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGNvbG9yID0gXCIjXCIgKyBjb2xvci50b1N0cmluZygxNik7XG4gICAgZmlsbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihNYXRoLm1heChmaWxsUGVyY2VudGFnZSwgMC4wKSwgMTAwLjApO1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBzZXRTY29yZShuZXdTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSBwYXJzZUZsb2F0KG5ld1Njb3JlKS50b0ZpeGVkKDApO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dChwYXJzZUZsb2F0KHRoaXMuY291bnROdW0pLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluLCBjb2xvckZsYWcpIHtcbiAgICBsZXQgY2YgPSBjb2xvckZsYWcgPyBjb2xvckZsYWcgOiBmYWxzZTtcbiAgICByZW1haW4gPSBNYXRoLm1pbihNYXRoLm1heChyZW1haW4sIDApLCAxMDApO1xuXG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcblxuICAgIGlmIChjZikgcmV0dXJuO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5wcmV2U2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQoJzEwMCUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3Qgc3RhcnREb3RzID0gTWF0aC5mbG9vcigod2luZG93LmlubmVyV2lkdGggLSA1MCkgLyAxMjApICogTWF0aC5mbG9vcigod2luZG93LmlubmVySGVpZ2h0IC0gNTApIC8gMTIwKTtcblxuLy8gU0NPUklOR1xuZXhwb3J0IGNvbnN0IGRpc3RNdWx0ID0gKHN0YXJ0RG90cyAqIDAuMDI1KSAvIDU0OyAvLyBTY2FsZXMgYmFzZWQgb24gbnVtYmVyIG9mIGRvdHNcbmV4cG9ydCBjb25zdCBzY29yZU11bHQgPSAyO1xuZXhwb3J0IGNvbnN0IHBhdGhCb251c0xlbmd0aCA9IDc7XG5leHBvcnQgY29uc3QgcG9seWdvblNjb3JlID0gMTAwO1xuXG5leHBvcnQgY29uc3QgZG90Q29sb3JzID0gWzB4RjlGNzUxLCAweDM1Q0EzNywgMHhBRTM0QzksIDB4MkU1RUM5LCAweENBMzY2M107XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IDB4ZmZmZGYzO1xuXG5leHBvcnQgY29uc3QgYnV0dG9uU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9idXR0b24ubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgYnllU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9ieWUubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBvdmVybGFwKHgxLCB5MSwgcjEsIHgyLCB5MiwgcjIpIHtcbiAgICBsZXQgZHggPSB4MSAtIHgyO1xuICAgIGxldCBkeSA9IHkxIC0geTI7XG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuICAgIGlmIChkaXN0YW5jZSA8PSByMSArIHIyKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVDaXJjcyhkb3QxLCBkb3QyKSB7XG4gICAgaWYgKG92ZXJsYXAoZG90MS5kLngsIGRvdDEuZC55LCBkb3QxLnJhZCwgZG90Mi5kLngsIGRvdDIuZC55LCBkb3QyLnJhZCkpIHtcbiAgICAgICAgLy8gVGFrZW4gZnJvbSBodHRwczovL2dhbWVkZXZlbG9wbWVudC50dXRzcGx1cy5jb20vdHV0b3JpYWxzL3doZW4td29ybGRzLWNvbGxpZGUtc2ltdWxhdGluZy1jaXJjbGUtY2lyY2xlLWNvbGxpc2lvbnMtLWdhbWVkZXYtNzY5XG4gICAgICAgIGxldCB2ZjF4ID0gZG90Mi5kLnZ4O1xuICAgICAgICBsZXQgdmYxeSA9IGRvdDIuZC52eTtcbiAgICAgICAgbGV0IHZmMnggPSBkb3QxLmQudng7XG4gICAgICAgIGxldCB2ZjJ5ID0gZG90MS5kLnZ5O1xuXG4gICAgICAgIGRvdDEuZC52eCA9IHZmMXg7XG4gICAgICAgIGRvdDEuZC52eSA9IHZmMXk7XG4gICAgICAgIGRvdDIuZC52eCA9IHZmMng7XG4gICAgICAgIGRvdDIuZC52eSA9IHZmMnk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb2xsaWRlV2FsbHMoZG90LCB3YWxscykge1xuICAgIGxldCByYWRpdXMgPSBkb3QucmFkO1xuICAgIGxldCBkID0gZG90LmQ7XG4gICAgbGV0IGxlZnQgPSBkLnggLSByYWRpdXM7XG4gICAgbGV0IHJpZ2h0ID0gZC54ICsgcmFkaXVzO1xuICAgIGxldCB0b3AgPSBkLnkgLSByYWRpdXM7XG4gICAgbGV0IGJvdHRvbSA9IGQueSArIHJhZGl1cztcblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIGxlZnQgd2FsbFxuICAgIGlmIChsZWZ0IDwgMSApIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIHJpZ2h0IHdhbGxcbiAgICBlbHNlIGlmIChyaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoLTEpIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRzIHdpdGggdG9wIHdhbGxcbiAgICBlbHNlIGlmICh0b3AgPCAxICkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggYm90dG9tIHdhbGxcbiAgICBlbHNlIGlmICggYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0LTEpIHtcbiAgICAgICAgZC52eSA9IC1kLnZ5O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgb3ZlcmxhcCwgY29sbGlkZUNpcmNzLCBjb2xsaWRlV2FsbHMgfTtcbiIsImltcG9ydCB7IGJ1dHRvblNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzLmpzJztcblxuY2xhc3MgU3RhcnRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoY2IpIHtcbiAgICAvLyB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTMwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgICAgICQoJyNzaGFkZScpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogLTUzMH0pO1xuXG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICB0b3A6IGhlaWdodC8yLTI2NVxuICAgIH0sIDQwMDAsICdlYXNlT3V0RWxhc3RpYycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXJ0TWVzc2FnZTtcbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcmVjdCwgcG9zKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGRkZGRjtcblxuICAgIHRoaXMud2FsbCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy53YWxsLmxpbmVTdHlsZSg0LCB0aGlzLmNvbG9yLCAxKTtcbiAgICB0aGlzLndhbGwuZHJhd1JlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgdGhpcy53YWxsLmVuZEZpbGwoKTtcbiAgICB0aGlzLndhbGwueCA9cG9zWzBdO1xuICAgIHRoaXMud2FsbC55ID0gcG9zWzFdO1xuXG4gIH1cblxuICBzdGVwKCkge1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IFN0YXJ0TWVzc2FnZSBmcm9tICcuL1N0YXJ0TWVzc2FnZSc7XG5pbXBvcnQgRW5kTWVzc2FnZSBmcm9tICcuL0VuZE1lc3NhZ2UnO1xuaW1wb3J0IEdhbWVCYXIgZnJvbSAnLi9HYW1lQmFyJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcbiAgLy8gQmVnaW4gc3RhdHNcbiAgbGV0IHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNob3dQYW5lbCggMCk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iLCAzKzogY3VzdG9tXG4gIC8vIGNvbnNvbGUubG9nKHN0YXRzKTtcbiAgbGV0IGRvbSA9IHN0YXRzLmRvbUVsZW1lbnQ7XG4gIGRvbS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0YXRzRGl2Jyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGRvbSApO1xuXG4gIC8vIEJlZ2luIGF1ZGlvXG4gIHZhciBiYWNrZ3JvdW5kID0gbmV3IEhvd2woe1xuICAgIHNyYzogWydhdWRpby9yaWxleS5tcDMnXSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIHZvbHVtZTogMSxcbiAgICBvbmVuZDogZnVuY3Rpb24oKSB7XG5cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEJlZ2luIHJlbmRlclxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGdhbWVCYXIgPSBuZXcgR2FtZUJhcigpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBnYW1lQmFyKTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVCYXIuaW5pdCgpO1xuICAgIGdhbWVCYXIuZmlsbEJhcignd2hpdGUnLCAwKTtcbiAgICBnYW1lQmFyLnNldFNjb3JlKDApO1xuICAgIGdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZygxMDApO1xuICB9XG5cbiAgbGV0IHJlc3RhcnQgPSBmYWxzZTtcbiAgbGV0IGVuZCA9IG51bGw7XG4gIGxldCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnLmtpbGxBbGwoKTtcbiAgICByZXN0YXJ0ID0gdHJ1ZTtcbiAgfVxuXG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIGxldCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIHN0YXRzLmJlZ2luKCk7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIGlmKGcuY2hlY2tFbmRHYW1lKCkpIHtcbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICBlbmQgPSBuZXcgRW5kTWVzc2FnZShnLmdldFNjb3JlKCksIHJlc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0YXJ0KSB7XG4gICAgICAgIGlmIChnLm51bURvdHMgPT0gMCkge1xuICAgICAgICAgIGdhbWVCYXIucmVzdGFydCgpO1xuICAgICAgICAgIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgICAgZyA9IG5ldyBHYW1lKHN0YWdlLCBiLCBnYW1lQmFyKTtcbiAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgIHJlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICAgICAgc3RhdHMuZW5kKCk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0pKCk7XG4iXX0=
