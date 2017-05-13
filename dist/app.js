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

},{}],3:[function(require,module,exports){
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
    this.b = b;

    this.dots = [];
    this.walls = [];

    this.lineDots = [];
    this.lineColor = 0xffffff;
    this.lineGraphics = new PIXI.Graphics();
    this.isPolygon = false;

    this.numDots = _Helpers.numDots;
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

      for (var i = 0; i < this.numDots; i++) {
        var d = new _Dot2.default(this.dotColors[Math.floor(Math.random() * this.dotColors.length)]);
        this.dots.push(d);
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

      this.walls = [wallTop, wallLeft, wallBottom, wallRight];
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
        var dot = d.getGraphics()[0];

        for (var j = 0; j < _this2.walls.length; j++) {
          _this2.b.hit(dot, _this2.walls[j].getGraphics(), true, true);
        }

        for (var _j = 0; _j < _this2.numDots; _j++) {
          if (i === _j) continue;
          _this2.b.hit(dot, _this2.dots[_j].getGraphics()[0], true, true);
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numDots = exports.numDots = 50;
var distMult = exports.distMult = .01;
var scoreMult = exports.scoreMult = 2;
var pathBonusLength = exports.pathBonusLength = 7;
var dotColors = exports.dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
var bgColor = exports.bgColor = 0xfffdf3;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

},{}],7:[function(require,module,exports){
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
  };

  render();
})();

},{"./EndMessage":2,"./Game":3,"./GameBar":4,"./Helpers":5,"./StartMessage":6}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvRW5kTWVzc2FnZS5qcyIsImpzL0dhbWUuanMiLCJqcy9HYW1lQmFyLmpzIiwianMvSGVscGVycy5qcyIsImpzL1N0YXJ0TWVzc2FnZS5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0lBRU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxLQUFMLEdBQWEsQ0FBYjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxLQUFLLEdBQUwscUJBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUws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QUFDbEIsZ0JBQVEsT0FBUjtBQUNBLGdCQUFRLElBQUksS0FBSyxTQUFULEVBQVI7QUFDQSxZQUFJLG1CQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUIsT0FBbkIsQ0FBSjtBQUNBLGNBQU0sSUFBTjtBQUNBLGtCQUFVLEtBQVY7QUFDRDtBQUNGOztBQUVELGFBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNILEdBcEJEOztBQXNCQTtBQUNELENBN0REIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7c2NvcmVNdWx0fSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5yYWQqc2NvcmVNdWx0O1xuXG4gICAgdGhpcy5kID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmQuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuZC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLmQuZW5kRmlsbCgpO1xuICAgIHRoaXMuZC54ID0gcFswXTtcbiAgICB0aGlzLmQueSA9IHBbMV07XG4gICAgdGhpcy5kLnZ4ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnZ5ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMjtcbiAgICB0aGlzLm8ueSA9IHBbMV0gLSB0aGlzLmQudnkqMjtcbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLmtpbGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3Jvd2luZyA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmdyb3dpbmcpIHtcbiAgICAgIHRoaXMuc2NhbGUgKz0gLjA1O1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcblxuICAgICAgaWYgKHRoaXMuc2NhbGUgPiAxKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLmdyb3dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmQueCArPSB0aGlzLmQudng7XG4gICAgdGhpcy5kLnkgKz0gdGhpcy5kLnZ5O1xuXG4gICAgdGhpcy5vLnggPSB0aGlzLmQueCAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMjtcblxuICAgIGlmICh0aGlzLmtpbGxlZCkge1xuICAgICAgdGhpcy5zY2FsZSAtPSAuMjtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IC0uMDA1KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjYWxlcygpIHtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuXG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgfVxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gW3RoaXMuZCwgdGhpcy5vXTtcbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgdGhpcy5raWxsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG90O1xuIiwiY2xhc3MgRW5kTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlLCByZXN0YXJ0Q0IpIHtcbiAgICAkKCcjcmVzdGFydEJ1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNyZXN0YXJ0QnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI3Jlc3RhcnRCdXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJyNlbmRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTUwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gICAgICBjb25zb2xlLmxvZygnaGlpJyk7XG4gICAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAkKCcjc2hhZGUyJykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlc3RhcnRDQigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjZW5kQ29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiBoZWlnaHQvMi0yNzV9KTtcbiAgICAkKCcjZW5kU2NvcmUnKS50ZXh0KHBhcnNlRmxvYXQoc2NvcmUpLnRvRml4ZWQoMCkpO1xuXG4gICAgJCgnI3NoYWRlMicpLnNob3coKTtcbiAgICAkKCcjc2hhZGUyJykuYW5pbWF0ZSh7XG4gICAgICBvcGFjaXR5OiAxXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW5kTWVzc2FnZTtcbiIsImltcG9ydCBEb3QgZnJvbSAnLi9Eb3QnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQge2JnQ29sb3IsIGRvdENvbG9ycywgbnVtRG90cywgZGlzdE11bHQsIHBhdGhCb251c0xlbmd0aH0gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlLGIsIGcpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5nYW1lQmFyID0gZztcbiAgICB0aGlzLnN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2Uub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCB0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5iID0gYjtcblxuICAgIHRoaXMuZG90cyA9IFtdO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcblxuICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICB0aGlzLmxpbmVDb2xvciA9IDB4ZmZmZmZmO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmlzUG9seWdvbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5udW1Eb3RzID0gbnVtRG90cztcbiAgICB0aGlzLmRvdENvbG9ycyA9IGRvdENvbG9ycztcblxuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmVNdWx0aXBsaWVyID0gMTtcblxuICAgIHRoaXMuZHJhZ0xlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG4gICAgdGhpcy5wcmV2RGlzdCA9IDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGdldFNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLnNjb3JlO1xuICB9XG5cbiAga2lsbEFsbCgpIHtcbiAgICAgIHRoaXMuZG90cy5mb3JFYWNoKGQgPT4gZC5raWxsKCkpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldKTtcbiAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLmFkZENoaWxkKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbml0V2FsbHMoKSB7XG4gICAgbGV0IHdhbGxDb2xvciA9IGJnQ29sb3I7XG5cbiAgICBsZXQgd2FsbFRvcCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxUb3AuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbExlZnQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbExlZnQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbEJvdHRvbSA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIHdpbmRvdy5pbm5lckhlaWdodC0xXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsQm90dG9tLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxSaWdodCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFt3aW5kb3cuaW5uZXJXaWR0aC0xLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsUmlnaHQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICB0aGlzLndhbGxzID0gW3dhbGxUb3AsIHdhbGxMZWZ0LCB3YWxsQm90dG9tLCB3YWxsUmlnaHRdO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgdGhpcy5yZW5kZXJEb3RzKCk7XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMucmVuZGVyTGluZSgpO1xuICAgIHRoaXMudXBkYXRlU2NvcmVNdWx0aXBsaWVyKCk7XG5cbiAgICB0aGlzLnJlbmRlckRyYWdMaW5lKCk7XG4gIH1cblxuICBjaGVja0VuZEdhbWUoKSB7XG4gICAgLy8gQ2hlY2sgaWYgIyBvZiBkb3RzIG9mIGVhY2ggY29sb3IgYXJlIGFsbCAxIG9yIDBcbiAgICBsZXQgY29sb3JDb3VudCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb2xvckNvdW50LnB1c2goMCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQpID0+IHtcbiAgICAgIGxldCBjSWR4ID0gZG90Q29sb3JzLmluZGV4T2YoZC5jb2xvcik7XG4gICAgICBjb2xvckNvdW50W2NJZHhdKys7XG4gICAgfSk7XG5cbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgY29sb3JDb3VudC5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBpZiAoZSA8PSAxKSBjb3VudGVyKys7XG4gICAgfSk7XG5cbiAgICBpZiAoY291bnRlciA9PT0gZG90Q29sb3JzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBubyBsaW5lIGxlZnRcbiAgICBpZiAodGhpcy5sZW5ndGhSZW1haW5pbmcgPD0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBPUiBhbGwgZG90cyBraWxsZWRcbiAgICBpZiAodGhpcy5udW1Eb3RzID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldENvbG9ySWR4KGNvbG9yKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZG90Q29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNvbG9yID09PSB0aGlzLmRvdENvbG9yc1tpXSkgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gIH1cblxuICByZW5kZXJEb3RzKCkge1xuICAgIHRoaXMuZG90cy5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICBsZXQgZG90ID0gZC5nZXRHcmFwaGljcygpWzBdO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2FsbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5iLmhpdChkb3QsIHRoaXMud2FsbHNbal0uZ2V0R3JhcGhpY3MoKSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmIuaGl0KGRvdCwgdGhpcy5kb3RzW2pdLmdldEdyYXBoaWNzKClbMF0sIHRydWUsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBkLnN0ZXAoKTtcblxuICAgICAgaWYgKGQuZGVhZCkge1xuICAgICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQoZSkpO1xuICAgICAgICB0aGlzLmRvdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLm51bURvdHMgLT0gMTtcbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyTGluZSgpIHtcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5tb3ZlVG8odGhpcy5saW5lRG90c1tpXS5kLngsIHRoaXMubGluZURvdHNbaV0uZC55KTtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVRvKHRoaXMubGluZURvdHNbaSsxXS5kLngsIHRoaXMubGluZURvdHNbaSsxXS5kLnkpO1xuICAgIH1cbiAgICB0aGlzLmxpbmVHcmFwaGljcy5lbmRGaWxsKCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gIH1cblxuICByZW5kZXJEcmFnTGluZSgpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubW92ZVRvKHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC54LCB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueSk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVUbyh0aGlzLnBvcy54LCB0aGlzLnBvcy55KTtcbiAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmRyYWdMZW5ndGhSZW1haW5pbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5nYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcodGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY29yZU11bHRpcGxpZXIoKSB7XG4gICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID49IDEpIHtcbiAgICAgIGxldCBmcmFjID0gdGhpcy5saW5lRG90cy5sZW5ndGgvcGF0aEJvbnVzTGVuZ3RoO1xuICAgICAgdGhpcy5zY29yZU11bHRpcGxpZXIgPSAxICsgZnJhYyoyO1xuICAgICAgdGhpcy5nYW1lQmFyLmZpbGxCYXIodGhpcy5saW5lQ29sb3IsIGZyYWMqMTAwLjApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNjb3JlTXVsdGlwbGllciA9IDE7XG4gICAgICB0aGlzLmdhbWVCYXIuZmlsbEJhcih0aGlzLmxpbmVDb2xvciwgMCk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgIGlmIChzdGFydCkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2goc3RhcnQpO1xuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IHN0YXJ0LmNvbG9yO1xuICAgICAgfVxuICB9XG5cbiAgb25EcmFnRW5kKCkge1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IHRvQWRkID0gMDtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgdG9BZGQgKz0gZC5raWxsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gdG9BZGQqdGhpcy5zY29yZU11bHRpcGxpZXI7XG4gICAgICAgIHRoaXMuZ2FtZUJhci5zZXRTY29yZSh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmc7XG4gICAgICB9XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgICAgIGxldCBkcmFnRGlzdCA9ICh0aGlzLnBvcy54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAodGhpcy5wb3MueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKih0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgdGhpcy5kcmFnTGVuZ3RoUmVtYWluaW5nID0gdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC0gTWF0aC5mbG9vcihkaXN0TXVsdCAqIE1hdGguc3FydChkcmFnRGlzdCkpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBDb25uZWN0IGRvdHMgb2YgdGhlIHNhbWUgY29sb3JcbiAgICAgICAgICAgICAgaWYgKG1pZC5jb2xvciA9PT0gdGhpcy5saW5lQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGdvaW5nIGJhY2t3YXJkLCByZW1vdmUgbGluZVxuICAgICAgICAgICAgICAgICAgaWYgKG1pZCA9PT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BvbHlnb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnNwbGljZSh0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyArPSB0aGlzLnByZXZEaXN0O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwb2x5Z29uLCBjYW4ndCBjb25uZWN0XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQb2x5Z29uKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ29ubmVjdCB0byBuZXcgZG90IG9yIHRvIGZpcnN0IGRvdCAoY3JlYXRpbmcgcG9seWdvbilcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaWR4ID0gdGhpcy5maW5kTGluZURvdChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IDAgfHwgaWR4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAwKSB0aGlzLmlzUG9seWdvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkRpc3QgPSBNYXRoLmZsb29yKGRpc3RNdWx0ICogTWF0aC5zcXJ0KGRpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nIC09IHRoaXMucHJldkRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMucHVzaChtaWQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgbGV0IGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZmluZExpbmVEb3QoZG90KSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5saW5lRG90c1tpXSA9PT0gZG90KSB7XG4gICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgR2FtZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2JhcicpLmNzcyh7bGVmdDogd2lkdGgvMi0xMjUsIGJvdHRvbTogLTgwfSk7XG5cbiAgICB0aGlzLnBhdGhMZW5ndGggPSA1NTQ7XG4gICAgdGhpcy5yZXN0YXJ0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGNvbG9yID0gXCIjXCIgKyBjb2xvci50b1N0cmluZygxNik7XG4gICAgZmlsbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihNYXRoLm1heChmaWxsUGVyY2VudGFnZSwgMC4wKSwgMTAwLjApO1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBzZXRTY29yZShuZXdTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSBwYXJzZUZsb2F0KG5ld1Njb3JlKS50b0ZpeGVkKDApO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDI1MCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dChwYXJzZUZsb2F0KHRoaXMuY291bnROdW0pLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluKSB7XG4gICAgcmVtYWluID0gTWF0aC5taW4oTWF0aC5tYXgocmVtYWluLCAwKSwgMTAwKTtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dChyZW1haW4gKyAnJScpO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxuXG4gIHJlc3RhcnQoKSB7XG4gICAgdGhpcy5wcmV2U2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQoJzEwMCUnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3QgbnVtRG90cyA9IDUwO1xuZXhwb3J0IGNvbnN0IGRpc3RNdWx0ID0gLjAxO1xuZXhwb3J0IGNvbnN0IHNjb3JlTXVsdCA9IDI7XG5leHBvcnQgY29uc3QgcGF0aEJvbnVzTGVuZ3RoID0gNztcbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG4iLCJjbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBFbmRNZXNzYWdlIGZyb20gJy4vRW5kTWVzc2FnZSc7XG5pbXBvcnQgR2FtZUJhciBmcm9tICcuL0dhbWVCYXInO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgYiA9IG5ldyBCdW1wKFBJWEkpO1xuXG4gIGxldCBnYW1lQmFyID0gbmV3IEdhbWVCYXIoKTtcbiAgbGV0IGcgPSBuZXcgR2FtZShzdGFnZSwgYiwgZ2FtZUJhcik7XG5cbiAgbGV0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lQmFyLmluaXQoKTtcbiAgICBnYW1lQmFyLmZpbGxCYXIoJ3doaXRlJywgMCk7XG4gICAgZ2FtZUJhci5zZXRTY29yZSgwKTtcbiAgICBnYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcoMTAwKTtcbiAgfVxuXG4gIGxldCByZXN0YXJ0ID0gZmFsc2U7XG4gIGxldCBlbmQgPSBudWxsO1xuICBsZXQgcmVzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZy5raWxsQWxsKCk7XG4gICAgcmVzdGFydCA9IHRydWU7XG4gIH1cblxuICBsZXQgc3RhcnQgPSBuZXcgU3RhcnRNZXNzYWdlKHN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIGlmKGcuY2hlY2tFbmRHYW1lKCkpIHtcbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICBlbmQgPSBuZXcgRW5kTWVzc2FnZShnLmdldFNjb3JlKCksIHJlc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN0YXJ0KSB7XG4gICAgICAgIGlmIChnLm51bURvdHMgPT0gMCkge1xuICAgICAgICAgIGdhbWVCYXIucmVzdGFydCgpO1xuICAgICAgICAgIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgICAgZyA9IG5ldyBHYW1lKHN0YWdlLCBiLCBnYW1lQmFyKTtcbiAgICAgICAgICBlbmQgPSBudWxsO1xuICAgICAgICAgIHJlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59KSgpO1xuIl19
