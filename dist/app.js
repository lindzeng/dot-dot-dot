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
    this.tempLengthRemaining = 100;
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
        this.gameBar.setPercentRemaining(this.tempLengthRemaining);
      } else {
        this.stage.removeChild(this.dragLine);
        this.gameBar.setPercentRemaining(this.lengthRemaining);
      }
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
        var tempDist = (this.pos.x - this.lineDots[this.lineDots.length - 1].d.x) * (this.pos.x - this.lineDots[this.lineDots.length - 1].d.x) + (this.pos.y - this.lineDots[this.lineDots.length - 1].d.y) * (this.pos.y - this.lineDots[this.lineDots.length - 1].d.y);
        this.tempLengthRemaining = this.lengthRemaining - Math.ceil(0.05 * Math.sqrt(tempDist));
        var mid = this.findDot(this.pos);
        if (mid !== undefined) {
          if (mid.color === this.lineColor) {
            var dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) * (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y) * (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
            this.lengthRemaining -= Math.ceil(0.05 * Math.sqrt(dist));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9HYW1lLmpzIiwianMvR2FtZUJhci5qcyIsImpzL0hlbHBlcnMuanMiLCJqcy9TdGFydE1lc3NhZ2UuanMiLCJqcy9XYWxsLmpzIiwianMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEc7QUFDSixlQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFBQTs7QUFDM0IsU0FBSyxLQUFMLEdBQWEsUUFBUSxLQUFSLEdBQWdCLFFBQTdCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsTUFBTSxHQUFOLEdBQVksS0FBSyxNQUFMLEtBQWMsRUFBZCxHQUFpQixFQUF4QztBQUNBLFFBQUksSUFBSSxNQUFNLEdBQU4sR0FBWSxDQUFDLEtBQUssTUFBTCxLQUFnQixPQUFPLFVBQXhCLEVBQW9DLEtBQUssTUFBTCxLQUFnQixPQUFPLFdBQTNELENBQXBCOztBQUVBLFNBQUssS0FBTCxHQUFhLENBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxFQUFQLEdBQWEsS0FBSyxNQUFMLEtBQWdCLENBQWpCLEdBQXNCLENBQWxDO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixD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QUFDLFdBQVcsSUFBWixFQUFrQixhQUFhLEtBQS9CLEVBQXNDLFlBQVksQ0FBbEQsRUFBL0QsQ0FBZjtBQUNBLFdBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQSxXQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLE9BQTlCO0FBQ0EsV0FBUyxVQUFULEdBQXNCLElBQXRCO0FBQ0EsV0FBUyxlQUFUO0FBQ0EsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUFTLElBQW5DOztBQUVBLE1BQUksSUFBSSxJQUFJLElBQUosQ0FBUyxJQUFULENBQVI7O0FBRUEsTUFBSSxVQUFVLHVCQUFkO0FBQ0EsTUFBSSxJQUFJLG1CQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUIsT0FBbkIsQ0FBUjs7QUFFQSxNQUFJLFlBQVksU0FBWixTQUFZLEdBQU07QUFDcEIsWUFBUSxJQUFSO0FBQ0EsWUFBUSxPQUFSLENBQWdCLE9BQWhCLEVBQXlCLENBQXpCO0FBQ0EsWUFBUSxRQUFSLENBQWlCLENBQWpCO0FBQ0EsWUFBUSxtQkFBUixDQUE0QixHQUE1QjtBQUNELEdBTEQ7QUFNQSxNQUFJLFFBQVEsMkJBQWlCLFVBQVUsSUFBVixXQUFqQixDQUFaOztBQUVBOztBQUVBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLDBCQUFzQixNQUF0QjtBQUNBLE1BQUUsSUFBRjtBQUNBLGFBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNILEdBSkQ7O0FBTUE7QUFDRCxDQXZDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHtiZ0NvbG9yLCBkb3RDb2xvcnMsIG51bURvdHN9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSxiLCBnKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuZ2FtZUJhciA9IGc7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy50ZW1wTGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nID0gMTAwO1xuXG4gICAgdGhpcy5pbml0V2FsbHMoKTtcbiAgICB0aGlzLmluaXREb3RzKCk7XG4gIH1cblxuICBpbml0RG90cygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICBsZXQgZCA9IG5ldyBEb3QodGhpcy5kb3RDb2xvcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kb3RDb2xvcnMubGVuZ3RoKV0pO1xuICAgICAgdGhpcy5kb3RzLnB1c2goZCk7XG4gICAgICBkLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UuYWRkQ2hpbGQoZSkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRXYWxscygpIHtcbiAgICBsZXQgd2FsbENvbG9yID0gYmdDb2xvcjtcblxuICAgIGxldCB3YWxsVG9wID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFRvcC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsTGVmdCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsTGVmdC5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsQm90dG9tID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIDFdLCBbMCwgd2luZG93LmlubmVySGVpZ2h0LTFdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxCb3R0b20uZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbFJpZ2h0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgW3dpbmRvdy5pbm5lcldpZHRoLTEsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxSaWdodC5nZXRHcmFwaGljcygpKTtcblxuICAgIHRoaXMud2FsbHMgPSBbd2FsbFRvcCwgd2FsbExlZnQsIHdhbGxCb3R0b20sIHdhbGxSaWdodF07XG4gIH1cblxuICBzdGVwKCkge1xuICAgIC8vIFJlbmRlciBkb3QgZ3JhcGhpY3NcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICBsZXQgZCA9IHRoaXMuZG90c1tpXS5nZXRHcmFwaGljcygpWzBdO1xuXG4gICAgICAvLyBEZXRlY3QgY29sbGlzaW9uc1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLndhbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy53YWxsc1tqXS5nZXRHcmFwaGljcygpLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmIuaGl0KGQsIHRoaXMuZG90c1tqXS5nZXRHcmFwaGljcygpWzBdLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZG90c1tpXS5zdGVwKCk7XG5cbiAgICAgIGlmICh0aGlzLmRvdHNbaV0uZGVhZCkge1xuICAgICAgICB0aGlzLmRvdHNbaV0uZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5yZW1vdmVDaGlsZChlKSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLmQueCwgdGhpcy5saW5lRG90c1tpXS5kLnkpO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lVG8odGhpcy5saW5lRG90c1tpKzFdLmQueCwgdGhpcy5saW5lRG90c1tpKzFdLmQueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5kcmFnTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgICAgdGhpcy5kcmFnTGluZS5tb3ZlVG8odGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLngsIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC55KTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVRvKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmxlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIHRoaXMubGluZURvdHMucHVzaChzdGFydCk7XG4gICAgICAgIHRoaXMubGluZUNvbG9yID0gc3RhcnQuY29sb3I7XG4gICAgICB9XG4gIH1cblxuICBvbkRyYWdFbmQoKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMubGluZURvdHMuZm9yRWFjaChkID0+IGQua2lsbCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgfVxuXG4gIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICAgICAgbGV0IHRlbXBEaXN0ID0gKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICArICh0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgPSB0aGlzLmxlbmd0aFJlbWFpbmluZyAtIE1hdGguY2VpbCgwLjA1ICogTWF0aC5zcXJ0KHRlbXBEaXN0KSk7XG4gICAgICAgICAgbGV0IG1pZCA9IHRoaXMuZmluZERvdCh0aGlzLnBvcyk7XG4gICAgICAgICAgaWYgKG1pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgZGlzdCA9IChtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueCkqKG1pZC5kLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIChtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKG1pZC5kLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoUmVtYWluaW5nIC09IE1hdGguY2VpbCgwLjA1ICogTWF0aC5zcXJ0KGRpc3QpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubGluZURvdHMucHVzaChtaWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgZmluZERvdChwb3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICBsZXQgc25hcFBvcyA9IHsgeDp0aGlzLmRvdHNbaV0uZC54LCB5OnRoaXMuZG90c1tpXS5kLnkgfTtcbiAgICAgICAgICBsZXQgcmFkID0gdGhpcy5kb3RzW2ldLnJhZDtcbiAgICAgICAgICBsZXQgZGlzdCA9IChwb3MueC1zbmFwUG9zLngpKihwb3MueC1zbmFwUG9zLngpICtcbiAgICAgICAgICAgICAgICAgICAgIChwb3MueS1zbmFwUG9zLnkpKihwb3MueS1zbmFwUG9zLnkpO1xuICAgICAgICAgIGlmIChkaXN0IDw9IHJhZCpyYWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZG90c1tpXSAhPT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG90c1tpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNsYXNzIEdhbWVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNiYXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMTI1LCBib3R0b206IC04MH0pO1xuXG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gNTU0O1xuICAgIHRoaXMucHJldlNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnI2JhcicpLmFuaW1hdGUoe1xuICAgICAgYm90dG9tOiAzMFxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgfVxuXG4gIGZpbGxCYXIoY29sb3IsIGZpbGxQZXJjZW50YWdlKSB7XG4gICAgbGV0IG0gPSB0aGlzLnBhdGhMZW5ndGgvKC0xMDAuMCk7XG4gICAgbGV0IHkgPSBtKmZpbGxQZXJjZW50YWdlK3RoaXMucGF0aExlbmd0aDtcbiAgICAkKCcjYmFyJykuY3NzKHtzdHJva2U6IGNvbG9yLCBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IHl9KTtcbiAgfVxuXG4gIGFkZFNjb3JlKGluY3JlbWVudFNjb3JlKSB7XG4gICAgdGhpcy5zY29yZSA9IHRoaXMucHJldlNjb3JlICsgaW5jcmVtZW50U2NvcmU7XG4gICAgJCh7Y291bnROdW06IHRoaXMucHJldlNjb3JlfSkuYW5pbWF0ZSh7Y291bnROdW06IHRoaXMuc2NvcmV9LCB7XG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgZWFzaW5nOidsaW5lYXInLFxuICAgICAgc3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdoYXQgdG9kbyBvbiBldmVyeSBjb3VudFxuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuY291bnROdW0udG9GaXhlZCgwKSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5wcmV2U2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0UGVyY2VudFJlbWFpbmluZyhyZW1haW4pIHtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dChyZW1haW4gKyAnJScpO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3QgbnVtRG90cyA9IDUwO1xuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcbiIsImNsYXNzIFN0YXJ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGNiKSB7XG4gICAgLy8gdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTUzMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gICAgICAkKCcjc2hhZGUnKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IC01MzB9KTtcblxuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgdG9wOiBoZWlnaHQvMi0yNjVcbiAgICB9LCA0MDAwLCAnZWFzZU91dEVsYXN0aWMnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydE1lc3NhZ2U7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTdGFydE1lc3NhZ2UgZnJvbSAnLi9TdGFydE1lc3NhZ2UnO1xuaW1wb3J0IEdhbWVCYXIgZnJvbSAnLi9HYW1lQmFyJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcblxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGIgPSBuZXcgQnVtcChQSVhJKTtcblxuICBsZXQgZ2FtZUJhciA9IG5ldyBHYW1lQmFyKCk7XG4gIGxldCBnID0gbmV3IEdhbWUoc3RhZ2UsIGIsIGdhbWVCYXIpO1xuXG4gIGxldCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZUJhci5pbml0KCk7XG4gICAgZ2FtZUJhci5maWxsQmFyKCd3aGl0ZScsIDApO1xuICAgIGdhbWVCYXIuYWRkU2NvcmUoMCk7XG4gICAgZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKDEwMCk7XG4gIH1cbiAgbGV0IHN0YXJ0ID0gbmV3IFN0YXJ0TWVzc2FnZShzdGFydEdhbWUuYmluZCh0aGlzKSk7XG5cbiAgLy8gbGV0IGkgPSBuZXcgSW50ZXJmYWNlKClcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0pKCk7XG4iXX0=
