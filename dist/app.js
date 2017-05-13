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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvRW5kTWVzc2FnZS5qcyIsImpzL0dhbWUuanMiLCJqcy9HYW1lQmFyLmpzIiwianMvSGVscGVycy5qcyIsImpzL1N0YXJ0TWVzc2FnZS5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0lBRU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwscUJBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUws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RUFBRSxRQUFGLEVBQWYsRUFBNkIsWUFBWSxJQUFaLFdBQTdCLENBQU47QUFDRDtBQUNGOztBQUVELFFBQUksT0FBSixFQUFhO0FBQ1gsVUFBSSxFQUFFLE9BQUYsSUFBYSxDQUFqQixFQUFvQjtBQUNsQixnQkFBUSxPQUFSO0FBQ0EsZ0JBQVEsSUFBSSxLQUFLLFNBQVQsRUFBUjtBQUNBLFlBQUksbUJBQVMsS0FBVCxFQUFnQixPQUFoQixDQUFKO0FBQ0EsY0FBTSxJQUFOO0FBQ0Esa0JBQVUsS0FBVjtBQUNEO0FBQ0Y7O0FBRUQsYUFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0EsVUFBTSxHQUFOO0FBQ0gsR0F0QkQ7O0FBd0JBOztBQUVBLElBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsVUFBVSxLQUFWLEVBQWtCO0FBQ25DLFFBQUssTUFBTSxHQUFOLEtBQWMsR0FBbkIsRUFBeUI7QUFDdkI7QUFDQSxRQUFFLFdBQUYsRUFBZSxNQUFmO0FBQ0QsS0FIRCxNQUdPLElBQUksTUFBTSxHQUFOLEtBQWMsR0FBbEIsRUFBdUI7QUFDNUI7QUFDQTtBQUNELEtBSE0sTUFHQSxJQUFJLE1BQU0sR0FBTixLQUFjLEdBQWxCLEVBQXVCO0FBQzVCO0FBQ0EsVUFBSSxXQUFXLE1BQVgsT0FBd0IsR0FBNUIsRUFDRSxXQUFXLE1BQVgsQ0FBa0IsR0FBbEIsRUFERixLQUdFLFdBQVcsTUFBWCxDQUFrQixHQUFsQjtBQUNIO0FBQ0YsR0FkRDtBQWVELENBakdEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7c2NvcmVNdWx0fSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yYWQqc2NvcmVNdWx0O1xuXG4gICAgdGhpcy5kID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmQuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuZC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLmQuZW5kRmlsbCgpO1xuICAgIHRoaXMuZC54ID0gcFswXTtcbiAgICB0aGlzLmQueSA9IHBbMV07XG4gICAgdGhpcy5kLnZ4ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnZ5ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyLjU7XG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLmdyb3dpbmcgPSB0cnVlO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5ncm93aW5nKSB7XG4gICAgICB0aGlzLnNjYWxlICs9IC4wNTtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ncm93aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kLnggKz0gdGhpcy5kLnZ4O1xuICAgIHRoaXMuZC55ICs9IHRoaXMuZC52eTtcblxuICAgIHRoaXMuby54ID0gdGhpcy5kLnggLSB0aGlzLmQudngqMi41O1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMi41O1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgeyBidXR0b25Tb3VuZCB9IGZyb20gJy4vSGVscGVycy5qcyc7XG5cbmNsYXNzIEVuZE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihzY29yZSwgcmVzdGFydENCKSB7XG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjZW5kQ29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTU1MFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICAgICAgY29uc29sZS5sb2coJ2hpaScpO1xuICAgICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCgnI3NoYWRlMicpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXN0YXJ0Q0IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2VuZENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogaGVpZ2h0LzItMjc1fSk7XG4gICAgJCgnI2VuZFNjb3JlJykudGV4dChwYXJzZUZsb2F0KHNjb3JlKS50b0ZpeGVkKDApKTtcblxuICAgICQoJyNzaGFkZTInKS5zaG93KCk7XG4gICAgJCgnI3NoYWRlMicpLmFuaW1hdGUoe1xuICAgICAgb3BhY2l0eTogMVxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZE1lc3NhZ2U7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHsgYmdDb2xvciwgZG90Q29sb3JzLCBzdGFydERvdHMsIGRpc3RNdWx0LCBwb2x5Z29uU2NvcmUsIHBhdGhCb251c0xlbmd0aCwgb3ZlcmxhcCwgY29sbGlkZUNpcmNzLCBjb2xsaWRlV2FsbHMsIGJ5ZVNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlLCBnKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuZ2FtZUJhciA9IGc7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5kb3RzID0gW107XG4gICAgdGhpcy53YWxscyA9IHt9O1xuXG4gICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgIHRoaXMubGluZUNvbG9yID0gMHhmZmZmZmY7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG5cbiAgICB0aGlzLnN0YXJ0RG90cyA9IHN0YXJ0RG90cztcbiAgICB0aGlzLm51bURvdHMgPSAwO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuXG4gICAgdGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLnByZXZEaXN0ID0gMDtcblxuICAgIHRoaXMuaW5pdFdhbGxzKCk7XG4gICAgdGhpcy5pbml0RG90cygpO1xuICB9XG5cbiAgZ2V0U2NvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcmU7XG4gIH1cblxuICBraWxsQWxsKCkge1xuICAgICAgdGhpcy5kb3RzLmZvckVhY2goZCA9PiBkLmtpbGwoKSk7XG4gIH1cblxuICBpbml0RG90cygpIHtcbiAgICBsZXQgcmVzZWxlY3QgPSBmYWxzZTtcbiAgICB3aGlsZSAodGhpcy5udW1Eb3RzIDwgdGhpcy5zdGFydERvdHMpIHtcbiAgICAgICAgbGV0IHBvcyA9IHsgeDogMzUgKyBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoIC0gNzApLCB5OiAzNSArIE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVySGVpZ2h0IC0gNzApIH07XG4gICAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSwgW3Bvcy54LCBwb3MueV0sIE1hdGgucmFuZG9tKCkqMjArMTUpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgICBpZiAob3ZlcmxhcChkLmQueCwgZC5kLnksIGQucmFkLCB0aGlzLmRvdHNbaV0uZC54LCB0aGlzLmRvdHNbaV0uZC55LCB0aGlzLmRvdHNbaV0ucmFkKSkge1xuICAgICAgICAgICAgICAgIHJlc2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzZWxlY3QpIHtcbiAgICAgICAgICAgIHJlc2VsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzKys7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IHt0b3A6IHdhbGxUb3AsIGxlZnQ6IHdhbGxMZWZ0LCBib3R0b206IHdhbGxCb3R0b20sIHJpZ2h0OiB3YWxsUmlnaHR9O1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJEb3RzKCk7XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyTGluZSgpO1xuICAgIHRoaXMudXBkYXRlU2NvcmVNdWx0aXBsaWVyKCk7XG5cbiAgICB0aGlzLnJlbmRlckRyYWdMaW5lKCk7XG4gIH1cblxuICBjaGVja0VuZEdhbWUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgIyBvZiBkb3RzIG9mIGVhY2ggY29sb3IgYXJlIGFsbCAxIG9yIDBcbiAgICBsZXQgY29sb3JDb3VudCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb2xvckNvdW50LnB1c2goMCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgIGxldCBjSWR4ID0gZG90Q29sb3JzLmluZGV4T2YoZC5jb2xvcik7XG4gICAgICBjb2xvckNvdW50W2NJZHhdKys7XG4gICAgfSk7XG5cbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgY29sb3JDb3VudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZSA8PSAxKSBjb3VudGVyKys7XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnRlciA9PT0gZG90Q29sb3JzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBubyBsaW5lIGxlZnRcbiAgICBpZiAodGhpcy5sZW5ndGhSZW1haW5pbmcgPD0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBhbGwgZG90cyBraWxsZWRcbiAgICBpZiAodGhpcy5udW1Eb3RzID09PSAwKSB7XG4gICAgICB0aGlzLnNjb3JlICs9IHRoaXMubGVuZ3RoUmVtYWluaW5nKjEwO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFNjb3JlKHRoaXMuc2NvcmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5sZW5ndGhSZW1haW5pbmcsIHRydWUpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRDb2xvcklkeChjb2xvcikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRvdENvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjb2xvciA9PT0gdGhpcy5kb3RDb2xvcnNbaV0pIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmVuZGVyRG90cygpIHtcbiAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZCwgaSkgPT4ge1xuXG4gICAgY29sbGlkZVdhbGxzKGQsIHRoaXMud2FsbHMpO1xuXG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICBjb2xsaWRlQ2lyY3MoZCwgdGhpcy5kb3RzW2pdKTtcbiAgICAgIH1cblxuICAgICAgZC5zdGVwKCk7XG5cbiAgICAgIGlmIChkLmRlYWQpIHtcbiAgICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgICAgdGhpcy5kb3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy5udW1Eb3RzIC09IDE7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlckxpbmUoKSB7XG4gICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0uZC54LCB0aGlzLmxpbmVEb3RzW2ldLmQueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0uZC54LCB0aGlzLmxpbmVEb3RzW2krMV0uZC55KTtcbiAgICB9XG4gICAgdGhpcy5saW5lR3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICB9XG5cbiAgcmVuZGVyRHJhZ0xpbmUoKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmRyYWdMaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLm1vdmVUbyh0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueCwgdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLnkpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lVG8odGhpcy5wb3MueCwgdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NvcmVNdWx0aXBsaWVyKCkge1xuICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+PSAxKSB7XG4gICAgICBsZXQgZnJhYyA9IHRoaXMubGluZURvdHMubGVuZ3RoL3BhdGhCb251c0xlbmd0aDtcbiAgICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMSArIGZyYWMqMjtcbiAgICAgIHRoaXMuZ2FtZUJhci5maWxsQmFyKHRoaXMubGluZUNvbG9yLCBmcmFjKjEwMC4wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBzdGFydC5jb2xvcjtcbiAgICAgIH1cbiAgfVxuXG4gIG9uRHJhZ0VuZCgpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IHRvQWRkID0gMDtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgdG9BZGQgKz0gZC5raWxsKCk7XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSB0b0FkZCArPSBwb2x5Z29uU2NvcmU7XG4gICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgIGJ5ZVNvdW5kLnBsYXkoKTtcblxuICAgICAgICB0aGlzLnNjb3JlICs9IHRvQWRkKnRoaXMuc2NvcmVNdWx0aXBsaWVyO1xuICAgICAgICB0aGlzLmdhbWVCYXIuc2V0U2NvcmUodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICB9XG5cbiAgb25EcmFnTW92ZShldmVudCkge1xuICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICB0aGlzLnBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgICAgICBsZXQgZHJhZ0Rpc3QgPSAodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKih0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtIE1hdGguZmxvb3IoZGlzdE11bHQgKiBNYXRoLnNxcnQoZHJhZ0Rpc3QpKTtcbiAgICAgICAgICBsZXQgbWlkID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgICAgICBpZiAobWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gQ29ubmVjdCBkb3RzIG9mIHRoZSBzYW1lIGNvbG9yXG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBnb2luZyBiYWNrd2FyZCwgcmVtb3ZlIGxpbmVcbiAgICAgICAgICAgICAgICAgIGlmIChtaWQgPT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAyXSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQb2x5Z29uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5zcGxpY2UodGhpcy5saW5lRG90cy5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgKz0gdGhpcy5wcmV2RGlzdDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgcG9seWdvbiwgY2FuJ3QgY29ubmVjdFxuICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUG9seWdvbikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENvbm5lY3QgdG8gbmV3IGRvdCBvciB0byBmaXJzdCBkb3QgKGNyZWF0aW5nIHBvbHlnb24pXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmluZExpbmVEb3QobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwIHx8IGlkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gMCkgdGhpcy5pc1BvbHlnb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IChtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KSoobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZEaXN0ID0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkaXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyAtPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmaW5kRG90KHBvcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgIGxldCBzbmFwUG9zID0geyB4OnRoaXMuZG90c1tpXS5kLngsIHk6dGhpcy5kb3RzW2ldLmQueSB9O1xuICAgICAgICAgIGxldCByYWQgPSB0aGlzLmRvdHNbaV0ucmFkO1xuICAgICAgICAgIGxldCBkaXN0ID0gKHBvcy54LXNuYXBQb3MueCkqKHBvcy54LXNuYXBQb3MueCkgK1xuICAgICAgICAgICAgICAgICAgICAgKHBvcy55LXNuYXBQb3MueSkqKHBvcy55LXNuYXBQb3MueSk7XG4gICAgICAgICAgaWYgKGRpc3QgPD0gcmFkKnJhZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5kb3RzW2ldICE9PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb3RzW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZpbmRMaW5lRG90KGRvdCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGluZURvdHNbaV0gPT09IGRvdCkge1xuICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNsYXNzIEdhbWVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNiYXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMTI1LCBib3R0b206IC04MH0pO1xuXG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gNTU0O1xuICAgIHRoaXMucmVzdGFydCgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcjYmFyJykuYW5pbWF0ZSh7XG4gICAgICBib3R0b206IDMwXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICB9XG5cbiAgZmlsbEJhcihjb2xvciwgZmlsbFBlcmNlbnRhZ2UpIHtcbiAgICBjb2xvciA9IFwiI1wiICsgY29sb3IudG9TdHJpbmcoMTYpO1xuICAgIGZpbGxQZXJjZW50YWdlID0gTWF0aC5taW4oTWF0aC5tYXgoZmlsbFBlcmNlbnRhZ2UsIDAuMCksIDEwMC4wKTtcbiAgICBsZXQgbSA9IHRoaXMucGF0aExlbmd0aC8oLTEwMC4wKTtcbiAgICBsZXQgeSA9IG0qZmlsbFBlcmNlbnRhZ2UrdGhpcy5wYXRoTGVuZ3RoO1xuICAgICQoJyNiYXInKS5jc3Moe3N0cm9rZTogY29sb3IsIFwic3Ryb2tlLWRhc2hvZmZzZXRcIjogeX0pO1xuICB9XG5cbiAgc2V0U2NvcmUobmV3U2NvcmUpIHtcbiAgICB0aGlzLnNjb3JlID0gcGFyc2VGbG9hdChuZXdTY29yZSkudG9GaXhlZCgwKTtcbiAgICAkKHtjb3VudE51bTogdGhpcy5wcmV2U2NvcmV9KS5hbmltYXRlKHtjb3VudE51bTogdGhpcy5zY29yZX0sIHtcbiAgICAgIGR1cmF0aW9uOiAyNTAsXG4gICAgICBlYXNpbmc6J2xpbmVhcicsXG4gICAgICBzdGVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2hhdCB0b2RvIG9uIGV2ZXJ5IGNvdW50XG4gICAgICAgICQoJyNzY29yZScpLnRleHQocGFyc2VGbG9hdCh0aGlzLmNvdW50TnVtKS50b0ZpeGVkKDApKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLnByZXZTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRQZXJjZW50UmVtYWluaW5nKHJlbWFpbiwgY29sb3JGbGFnKSB7XG4gICAgbGV0IGNmID0gY29sb3JGbGFnID8gY29sb3JGbGFnIDogZmFsc2U7XG4gICAgcmVtYWluID0gTWF0aC5taW4oTWF0aC5tYXgocmVtYWluLCAwKSwgMTAwKTtcblxuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KHJlbWFpbiArICclJyk7XG5cbiAgICBpZiAoY2YpIHJldHVybjtcbiAgICBpZiAocmVtYWluIDw9IDIwKSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3JlZCd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICd3aGl0ZSd9KTtcbiAgICB9XG4gIH1cblxuICByZXN0YXJ0KCkge1xuICAgIHRoaXMucHJldlNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KCcxMDAlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJhclxuIiwiZXhwb3J0IGNvbnN0IHN0YXJ0RG90cyA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lcldpZHRoIC0gNTApIC8gMTIwKSAqIE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIDUwKSAvIDEyMCk7XG5cbi8vIFNDT1JJTkdcbmV4cG9ydCBjb25zdCBkaXN0TXVsdCA9IChzdGFydERvdHMgKiAwLjAyNSkgLyAxMDQ7IC8vIDU0OyAvLyBTY2FsZXMgYmFzZWQgb24gbnVtYmVyIG9mIGRvdHNcbmV4cG9ydCBjb25zdCBzY29yZU11bHQgPSAyO1xuZXhwb3J0IGNvbnN0IHBhdGhCb251c0xlbmd0aCA9IDc7XG5leHBvcnQgY29uc3QgcG9seWdvblNjb3JlID0gMTAwO1xuXG5leHBvcnQgY29uc3QgZG90Q29sb3JzID0gWzB4RjlGNzUxLCAweDM1Q0EzNywgMHhBRTM0QzksIDB4MkU1RUM5LCAweENBMzY2M107XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IDB4ZmZmZGYzO1xuXG5leHBvcnQgY29uc3QgYnV0dG9uU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9idXR0b24ubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgYnllU291bmQgPSBuZXcgSG93bCh7XG4gIHNyYzogWydhdWRpby9ieWUubXAzJ10sXG4gIHZvbHVtZTogMSxcbiAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBvdmVybGFwKHgxLCB5MSwgcjEsIHgyLCB5MiwgcjIpIHtcbiAgICBsZXQgZHggPSB4MSAtIHgyO1xuICAgIGxldCBkeSA9IHkxIC0geTI7XG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4KmR4ICsgZHkqZHkpO1xuICAgIGlmIChkaXN0YW5jZSA8PSByMSArIHIyKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbGxpZGVDaXJjcyhkb3QxLCBkb3QyKSB7XG4gICAgaWYgKG92ZXJsYXAoZG90MS5kLngsIGRvdDEuZC55LCBkb3QxLnJhZCwgZG90Mi5kLngsIGRvdDIuZC55LCBkb3QyLnJhZCkpIHtcbiAgICAgICAgLy8gVGFrZW4gZnJvbSBodHRwczovL2dhbWVkZXZlbG9wbWVudC50dXRzcGx1cy5jb20vdHV0b3JpYWxzL3doZW4td29ybGRzLWNvbGxpZGUtc2ltdWxhdGluZy1jaXJjbGUtY2lyY2xlLWNvbGxpc2lvbnMtLWdhbWVkZXYtNzY5XG4gICAgICAgIGxldCB2ZjF4ID0gZG90Mi5kLnZ4O1xuICAgICAgICBsZXQgdmYxeSA9IGRvdDIuZC52eTtcbiAgICAgICAgbGV0IHZmMnggPSBkb3QxLmQudng7XG4gICAgICAgIGxldCB2ZjJ5ID0gZG90MS5kLnZ5O1xuXG4gICAgICAgIGRvdDEuZC52eCA9IHZmMXg7XG4gICAgICAgIGRvdDEuZC52eSA9IHZmMXk7XG4gICAgICAgIGRvdDIuZC52eCA9IHZmMng7XG4gICAgICAgIGRvdDIuZC52eSA9IHZmMnk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb2xsaWRlV2FsbHMoZG90LCB3YWxscykge1xuICAgIGxldCByYWRpdXMgPSBkb3QucmFkO1xuICAgIGxldCBkID0gZG90LmQ7XG4gICAgbGV0IGxlZnQgPSBkLnggLSByYWRpdXM7XG4gICAgbGV0IHJpZ2h0ID0gZC54ICsgcmFkaXVzO1xuICAgIGxldCB0b3AgPSBkLnkgLSByYWRpdXM7XG4gICAgbGV0IGJvdHRvbSA9IGQueSArIHJhZGl1cztcblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIGxlZnQgd2FsbFxuICAgIGlmIChsZWZ0IDwgMSApIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRlcyB3aXRoIHJpZ2h0IHdhbGxcbiAgICBlbHNlIGlmIChyaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoLTEpIHtcbiAgICAgICAgZC52eCA9IC1kLnZ4O1xuICAgIH1cblxuICAgIC8vIGRvdCBjb2xsaWRzIHdpdGggdG9wIHdhbGxcbiAgICBlbHNlIGlmICh0b3AgPCAxICkge1xuICAgICAgICBkLnZ5ID0gLWQudnk7XG4gICAgfVxuXG4gICAgLy8gZG90IGNvbGxpZGVzIHdpdGggYm90dG9tIHdhbGxcbiAgICBlbHNlIGlmICggYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0LTEpIHtcbiAgICAgICAgZC52eSA9IC1kLnZ5O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgb3ZlcmxhcCwgY29sbGlkZUNpcmNzLCBjb2xsaWRlV2FsbHMgfTtcbiIsImltcG9ydCB7IGJ1dHRvblNvdW5kIH0gZnJvbSAnLi9IZWxwZXJzLmpzJztcblxuY2xhc3MgU3RhcnRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoY2IpIHtcbiAgICAvLyB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBidXR0b25Tb3VuZC5wbGF5KCk7XG4gICAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTMwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgICAgICQoJyNzaGFkZScpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogLTUzMH0pO1xuXG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICB0b3A6IGhlaWdodC8yLTI2NVxuICAgIH0sIDQwMDAsICdlYXNlT3V0RWxhc3RpYycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXJ0TWVzc2FnZTtcbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcmVjdCwgcG9zKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGRkZGRjtcblxuICAgIHRoaXMud2FsbCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy53YWxsLmxpbmVTdHlsZSg0LCB0aGlzLmNvbG9yLCAxKTtcbiAgICB0aGlzLndhbGwuZHJhd1JlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgdGhpcy53YWxsLmVuZEZpbGwoKTtcbiAgICB0aGlzLndhbGwueCA9cG9zWzBdO1xuICAgIHRoaXMud2FsbC55ID0gcG9zWzFdO1xuXG4gIH1cblxuICBzdGVwKCkge1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IFN0YXJ0TWVzc2FnZSBmcm9tICcuL1N0YXJ0TWVzc2FnZSc7XG5pbXBvcnQgRW5kTWVzc2FnZSBmcm9tICcuL0VuZE1lc3NhZ2UnO1xuaW1wb3J0IEdhbWVCYXIgZnJvbSAnLi9HYW1lQmFyJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcbiAgLy8gQmVnaW4gc3RhdHNcbiAgbGV0IHN0YXRzID0gbmV3IFN0YXRzKCk7XG4gIHN0YXRzLnNob3dQYW5lbCggMCk7IC8vIDA6IGZwcywgMTogbXMsIDI6IG1iLCAzKzogY3VzdG9tXG4gIC8vIGNvbnNvbGUubG9nKHN0YXRzKTtcbiAgbGV0IGRvbSA9IHN0YXRzLmRvbUVsZW1lbnQ7XG4gIGRvbS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N0YXRzRGl2Jyk7XG4gICQoZG9tKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCBkb20gKTtcblxuICAvLyBCZWdpbiBhdWRpb1xuICBsZXQgYmFja2dyb3VuZCA9IG5ldyBIb3dsKHtcbiAgICBzcmM6IFsnYXVkaW8vcmlsZXkubXAzJ10sXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICB2b2x1bWU6IDEsXG4gICAgb25lbmQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgfVxuICB9KTtcblxuICAvLyBCZWdpbiByZW5kZXJcbiAgbGV0IHR5cGUgPSBcIldlYkdMXCI7XG5cbiAgaWYoIVBJWEkudXRpbHMuaXNXZWJHTFN1cHBvcnRlZCgpKSB7XG4gICAgICB0eXBlID0gXCJjYW52YXNcIjtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHN0YWdlIGFuZCByZW5kZXJlciBhbmQgYWRkIHRvIHRoZSBET01cbiAgbGV0IHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIGxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMX0pO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIGxldCBnYW1lQmFyID0gbmV3IEdhbWVCYXIoKTtcbiAgbGV0IGcgPSBuZXcgR2FtZShzdGFnZSwgZ2FtZUJhcik7XG5cbiAgbGV0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lQmFyLmluaXQoKTtcbiAgICBnYW1lQmFyLmZpbGxCYXIoJ3doaXRlJywgMCk7XG4gICAgZ2FtZUJhci5zZXRTY29yZSgwKTtcbiAgICBnYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcoMTAwKTtcbiAgfVxuXG4gIGxldCByZXN0YXJ0ID0gZmFsc2U7XG4gIGxldCBlbmQgPSBudWxsO1xuICBsZXQgcmVzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZy5raWxsQWxsKCk7XG4gICAgcmVzdGFydCA9IHRydWU7XG4gIH1cblxuICBsZXQgc3RhcnQgPSBuZXcgU3RhcnRNZXNzYWdlKHN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBzdGF0cy5iZWdpbigpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICBpZihnLmNoZWNrRW5kR2FtZSgpKSB7XG4gICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgZW5kID0gbmV3IEVuZE1lc3NhZ2UoZy5nZXRTY29yZSgpLCByZXN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzdGFydCkge1xuICAgICAgICBpZiAoZy5udW1Eb3RzID09IDApIHtcbiAgICAgICAgICBnYW1lQmFyLnJlc3RhcnQoKTtcbiAgICAgICAgICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgICAgIGcgPSBuZXcgR2FtZShzdGFnZSwgZ2FtZUJhcik7XG4gICAgICAgICAgZW5kID0gbnVsbDtcbiAgICAgICAgICByZXN0YXJ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbiAgICAgIHN0YXRzLmVuZCgpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG5cbiAgJCgnYm9keScpLmtleXByZXNzKGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICBpZiAoIGV2ZW50LmtleSA9PT0gJ3QnICkge1xuICAgICAgLy8gVFxuICAgICAgJCgnI3N0YXRzRGl2JykudG9nZ2xlKCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdyJykge1xuICAgICAgLy8gUlxuICAgICAgcmVzdGFydEdhbWUoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ20nKSB7XG4gICAgICAvLyBNXG4gICAgICBpZiAoYmFja2dyb3VuZC52b2x1bWUoKSA9PT0gMC4wKVxuICAgICAgICBiYWNrZ3JvdW5kLnZvbHVtZSgxLjApO1xuICAgICAgZWxzZVxuICAgICAgICBiYWNrZ3JvdW5kLnZvbHVtZSgwLjApO1xuICAgIH1cbiAgfSk7XG59KSgpO1xuIl19
