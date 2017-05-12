(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dot = function () {
  function Dot(color, pos, rad) {
    _classCallCheck(this, Dot);

    this.color = color ? color : 0xFF0000;
    this.rad = rad ? rad : Math.random() * 20 + 15;
    var p = pos ? pos : [Math.random() * window.innerWidth, Math.random() * window.innerHeight];

    this.scale = 0;

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
    key: "step",
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
    key: "updateScales",
    value: function updateScales() {
      this.d.scale.x = this.scale;
      this.d.scale.y = this.scale;

      this.o.scale.x = this.scale;
      this.o.scale.y = this.scale;
    }
  }, {
    key: "getGraphics",
    value: function getGraphics() {
      return [this.d, this.o];
    }
  }, {
    key: "kill",
    value: function kill() {
      this.killed = true;
    }
  }]);

  return Dot;
}();

exports.default = Dot;

},{}],2:[function(require,module,exports){
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

    this.numDots = _Helpers.numDots;
    this.dotColors = _Helpers.dotColors;

    this.score = 0;
    this.lengthRemaining = 100;

    this.initWalls();
    this.initDots();
  }

  _createClass(Game, [{
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
      var _this2 = this;

      // Render dot graphics
      for (var i = 0; i < this.numDots; i++) {
        var d = this.dots[i].getGraphics()[0];

        // Detect collisions
        for (var j = 0; j < this.walls.length; j++) {
          this.b.hit(d, this.walls[j].getGraphics(), true, true);
        }
        for (var _j = 0; _j < this.numDots; _j++) {
          if (i === _j) continue;
          this.b.hit(d, this.dots[_j].getGraphics()[0], true, true);
        }
        this.dots[i].step();

        if (this.dots[i].dead) {
          this.dots[i].getGraphics().forEach(function (e) {
            return _this2.stage.removeChild(e);
          });
        }
      }

      // Render line graphics
      this.stage.removeChild(this.lineGraphics);
      this.lineGraphics = new PIXI.Graphics();
      this.lineGraphics.lineStyle(.5, 0x000000);
      for (var _i = 0; _i < this.lineDots.length - 1; _i++) {
        this.lineGraphics.moveTo(this.lineDots[_i].d.x, this.lineDots[_i].d.y);
        this.lineGraphics.lineTo(this.lineDots[_i + 1].d.x, this.lineDots[_i + 1].d.y);
      }
      this.lineGraphics.endFill();
      this.stage.addChild(this.lineGraphics);

      if (this.dragging) {
        this.stage.removeChild(this.dragLine);
        this.dragLine = new PIXI.Graphics();
        this.dragLine.lineStyle(.5, 0x000000);
        this.dragLine.moveTo(this.lineDots[this.lineDots.length - 1].d.x, this.lineDots[this.lineDots.length - 1].d.y);
        this.dragLine.lineTo(this.pos.x, this.pos.y);
        this.stage.addChild(this.dragLine);
      } else {
        this.stage.removeChild(this.dragLine);
      }

      this.gameBar.setPercentRemaining(this.lengthRemaining);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.lineDots = [];
      this.dragging = true;
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
        this.lineDots.forEach(function (d) {
          return d.kill();
        });
      }
      this.lineDots = [];
    }
  }, {
    key: 'onDragMove',
    value: function onDragMove(event) {
      if (this.dragging) {
        this.pos = event.data.getLocalPosition(this.stage);
        var mid = this.findDot(this.pos);
        if (mid !== undefined) {
          if (mid.color === this.lineColor) {
            var dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) * (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y) * (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
            this.lengthRemaining -= Math.ceil(0.05 * Math.sqrt(dist));
            console.log(this.lengthRemaining);
            this.lineDots.push(mid);
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
  }]);

  return Game;
}();

exports.default = Game;

},{"./Dot":1,"./Helpers":4,"./Wall":6}],3:[function(require,module,exports){
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
    this.prevScore = 0;
    this.score = 0;
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
      var m = this.pathLength / -100.0;
      var y = m * fillPercentage + this.pathLength;
      $('#bar').css({ stroke: color, "stroke-dashoffset": y });
    }
  }, {
    key: 'addScore',
    value: function addScore(incrementScore) {
      var _this = this;

      this.score = this.prevScore + incrementScore;
      $({ countNum: this.prevScore }).animate({ countNum: this.score }, {
        duration: 500,
        easing: 'linear',
        step: function step() {
          // What todo on every count
          $('#score').text(this.countNum.toFixed(0));
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
      $('#remaining').text(remain + '%');
      if (remain <= 20) {
        $('#remaining').css({ color: 'red' });
      } else {
        $('#remaining').css({ color: 'white' });
      }
    }
  }]);

  return GameBar;
}();

exports.default = GameBar;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numDots = exports.numDots = 50;
var dotColors = exports.dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
var bgColor = exports.bgColor = 0xfffdf3;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _StartMessage = require('./StartMessage');

var _StartMessage2 = _interopRequireDefault(_StartMessage);

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
    gameBar.addScore(0);
    gameBar.setPercentRemaining(100);
  };
  var start = new _StartMessage2.default(startGame.bind(undefined));

  // let i = new Interface()

  var render = function render() {
    requestAnimationFrame(render);
    g.step();
    renderer.render(stage);
  };

  render();
})();

},{"./Game":2,"./GameBar":3,"./Helpers":4,"./StartMessage":5}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9HYW1lLmpzIiwianMvR2FtZUJhci5qcyIsImpzL0hlbHBlcnMuanMiLCJqcy9TdGFydE1lc3NhZ2UuanMiLCJqcy9XYWxsLmpzIiwianMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEc7QUFDSixlQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFBQTs7QUFDM0IsU0FBSyxLQUFMLEdBQWEsUUFBUSxLQUFSLEdBQWdCLFFBQTdCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsTUFBTSxHQUFOLEdBQVksS0FBSyxNQUFMLEtBQWMsRUFBZCxHQUFpQixFQUF4QztBQUNBLFFBQUksSUFBSSxNQUFNLEdBQU4sR0FBWSxDQUFDLEtBQUssTUFBTCxLQUFnQixPQUFPLFVBQXhCLEVBQW9DLEtBQUssTUFBTCxLQUFnQixPQUFPLFdBQTNELENBQXBCOztBQUVBLFNBQUssS0FBTCxHQUFhLENBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxFQUFQLEdBQWEsS0FBSyxNQUFMLEtBQWdCLENBQWpCLEdBQXNCLENBQWxDO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixD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QUVBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLDBCQUFzQixNQUF0QjtBQUNBLE1BQUUsSUFBRjtBQUNBLGFBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNILEdBSkQ7O0FBTUE7QUFDRCxDQXZDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHtiZ0NvbG9yLCBkb3RDb2xvcnMsIG51bURvdHN9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSxiLCBnKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuZ2FtZUJhciA9IGc7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSk7XG4gICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IFt3YWxsVG9wLCB3YWxsTGVmdCwgd2FsbEJvdHRvbSwgd2FsbFJpZ2h0XTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gdGhpcy5kb3RzW2ldLmdldEdyYXBoaWNzKClbMF07XG5cbiAgICAgIC8vIERldGVjdCBjb2xsaXNpb25zXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2FsbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5iLmhpdChkLCB0aGlzLndhbGxzW2pdLmdldEdyYXBoaWNzKCksIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy5kb3RzW2pdLmdldEdyYXBoaWNzKClbMF0sIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5kb3RzW2ldLnN0ZXAoKTtcblxuICAgICAgaWYgKHRoaXMuZG90c1tpXS5kZWFkKSB7XG4gICAgICAgIHRoaXMuZG90c1tpXS5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIFJlbmRlciBsaW5lIGdyYXBoaWNzXG4gICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0uZC54LCB0aGlzLmxpbmVEb3RzW2ldLmQueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0uZC54LCB0aGlzLmxpbmVEb3RzW2krMV0uZC55KTtcbiAgICB9XG4gICAgdGhpcy5saW5lR3JhcGhpY3MuZW5kRmlsbCgpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuXG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmRyYWdMaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVN0eWxlKC41LCAweDAwMDAwMCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLm1vdmVUbyh0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoLTFdLmQueCwgdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLnkpO1xuICAgICAgdGhpcy5kcmFnTGluZS5saW5lVG8odGhpcy5wb3MueCwgdGhpcy5wb3MueSk7XG4gICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgIH1cblxuICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMubGVuZ3RoUmVtYWluaW5nKTtcbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5maW5kRG90KHRoaXMucG9zKTtcbiAgICAgIGlmIChzdGFydCkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2goc3RhcnQpO1xuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IHN0YXJ0LmNvbG9yO1xuICAgICAgfVxuICB9XG5cbiAgb25EcmFnRW5kKCkge1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubGluZURvdHMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLmZvckVhY2goZCA9PiBkLmtpbGwoKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAobWlkLmNvbG9yID09PSB0aGlzLmxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKihtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyAtPSBNYXRoLmNlaWwoMC4wNSAqIE1hdGguc3FydChkaXN0KSk7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxlbmd0aFJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgbGV0IGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBHYW1lQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjYmFyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTEyNSwgYm90dG9tOiAtODB9KTtcblxuICAgIHRoaXMucGF0aExlbmd0aCA9IDU1NDtcbiAgICB0aGlzLnByZXZTY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBhZGRTY29yZShpbmNyZW1lbnRTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSB0aGlzLnByZXZTY29yZSArIGluY3JlbWVudFNjb3JlO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLmNvdW50TnVtLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluKSB7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcbiAgICBpZiAocmVtYWluIDw9IDIwKSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3JlZCd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICd3aGl0ZSd9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJhclxuIiwiZXhwb3J0IGNvbnN0IG51bURvdHMgPSA1MDtcbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG4iLCJjbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBHYW1lQmFyIGZyb20gJy4vR2FtZUJhcic7XG5pbXBvcnQge2JnQ29sb3J9IGZyb20gJy4vSGVscGVycyc7XG5cbigoKSA9PiB7XG5cbiAgbGV0IHR5cGUgPSBcIldlYkdMXCI7XG5cbiAgaWYoIVBJWEkudXRpbHMuaXNXZWJHTFN1cHBvcnRlZCgpKSB7XG4gICAgICB0eXBlID0gXCJjYW52YXNcIjtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHN0YWdlIGFuZCByZW5kZXJlciBhbmQgYWRkIHRvIHRoZSBET01cbiAgbGV0IHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIGxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMX0pO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIGxldCBiID0gbmV3IEJ1bXAoUElYSSk7XG5cbiAgbGV0IGdhbWVCYXIgPSBuZXcgR2FtZUJhcigpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBiLCBnYW1lQmFyKTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVCYXIuaW5pdCgpO1xuICAgIGdhbWVCYXIuZmlsbEJhcignd2hpdGUnLCAwKTtcbiAgICBnYW1lQmFyLmFkZFNjb3JlKDApO1xuICAgIGdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZygxMDApO1xuICB9XG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIC8vIGxldCBpID0gbmV3IEludGVyZmFjZSgpXG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59KSgpO1xuIl19
