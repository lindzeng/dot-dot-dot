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

      // Render line graphics
      this.stage.removeChild(this.lineGraphics);
      this.lineGraphics = new PIXI.Graphics();
      this.lineGraphics.lineStyle(.5, 0x000000);
      for (var i = 0; i < this.lineDots.length - 1; i++) {
        this.lineGraphics.moveTo(this.lineDots[i].d.x, this.lineDots[i].d.y);
        this.lineGraphics.lineTo(this.lineDots[i + 1].d.x, this.lineDots[i + 1].d.y);
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
        this.tempLengthRemaining = this.lengthRemaining - Math.ceil(_Helpers.distMult * Math.sqrt(tempDist));
        var mid = this.findDot(this.pos);
        if (mid !== undefined) {
          if (mid.color === this.lineColor) {
            var dist = (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) * (mid.d.x - this.lineDots[this.lineDots.length - 1].d.x) + (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y) * (mid.d.y - this.lineDots[this.lineDots.length - 1].d.y);
            this.lengthRemaining -= Math.ceil(_Helpers.distMult * Math.sqrt(dist));
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
var distMult = exports.distMult = .05;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssQ0FBTCxHQUFTLElBQUksS0FBSyxRQUFULEVBQVQ7QUFDQSxTQUFLLENBQUwsQ0FBTyxTQUFQLENBQWlCLEtBQUssS0FBdEI7QUFDQSxTQUFLLENBQUwsQ0FBTyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLEtBQUssR0FBN0I7QUFDQSxTQUFLLENBQUwsQ0FBTyxPQUFQO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixDQUFqQixHQUFzQixDQUFsQztBQUNBLFNBQUssQ0FB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VyxLQUFLLGtCQUFMLENBQXdCLE9BQU8sVUFBL0IsRUFBMkMsT0FBTyxXQUFsRCxFQUErRCxFQUFDLFdBQVcsSUFBWixFQUFrQixhQUFhLEtBQS9CLEVBQXNDLFlBQVksQ0FBbEQsRUFBL0QsQ0FBZjtBQUNBLFdBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQSxXQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLE9BQTlCO0FBQ0EsV0FBUyxVQUFULEdBQXNCLElBQXRCO0FBQ0EsV0FBUyxlQUFUO0FBQ0EsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUFTLElBQW5DOztBQUVBLE1BQUksSUFBSSxJQUFJLElBQUosQ0FBUyxJQUFULENBQVI7O0FBRUEsTUFBSSxVQUFVLHVCQUFkO0FBQ0EsTUFBSSxJQUFJLG1CQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsRUFBbUIsT0FBbkIsQ0FBUjs7QUFFQSxNQUFJLFlBQVksU0FBWixTQUFZLEdBQU07QUFDcEIsWUFBUSxJQUFSO0FBQ0EsWUFBUSxPQUFSLENBQWdCLE9BQWhCLEVBQXlCLENBQXpCO0FBQ0EsWUFBUSxRQUFSLENBQWlCLENBQWpCO0FBQ0EsWUFBUSxtQkFBUixDQUE0QixHQUE1QjtBQUNELEdBTEQ7QUFNQSxNQUFJLFFBQVEsMkJBQWlCLFVBQVUsSUFBVixXQUFqQixDQUFaOztBQUVBOztBQUVBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLDBCQUFzQixNQUF0QjtBQUNBLE1BQUUsSUFBRjtBQUNBLGFBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNILEdBSkQ7O0FBTUE7QUFDRCxDQXZDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBEb3Qge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcG9zLCByYWQpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkYwMDAwO1xuICAgIHRoaXMucmFkID0gcmFkID8gcmFkIDogTWF0aC5yYW5kb20oKSoyMCsxNTtcbiAgICBsZXQgcCA9IHBvcyA/IHBvcyA6IFtNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVyV2lkdGgsIE1hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuXG4gICAgdGhpcy5zY2FsZSA9IDA7XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMua2lsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy5ncm93aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3Jvd2luZykge1xuICAgICAgdGhpcy5zY2FsZSArPSAuMDU7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuXG4gICAgICBpZiAodGhpcy5zY2FsZSA+IDEpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuZ3Jvd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuXG4gICAgaWYgKHRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnNjYWxlIC09IC4yO1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcbiAgICAgIGlmICh0aGlzLnNjYWxlIDwgLS4wMDUpIHtcbiAgICAgICAgdGhpcy5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NhbGVzKCkge1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG5cbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICB9XG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmtpbGxlZCA9IHRydWU7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHtiZ0NvbG9yLCBkb3RDb2xvcnMsIG51bURvdHMsIGRpc3RNdWx0fSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Ioc3RhZ2UsYiwgZykge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmdhbWVCYXIgPSBnO1xuICAgIHRoaXMuc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UuYnV0dG9uTW9kZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpXG4gICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgLm9uKCdwb2ludGVybW92ZScsIHRoaXMub25EcmFnTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmIgPSBiO1xuXG4gICAgdGhpcy5kb3RzID0gW107XG4gICAgdGhpcy53YWxscyA9IFtdO1xuXG4gICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgIHRoaXMubGluZUNvbG9yID0gMHhmZmZmZmY7XG4gICAgdGhpcy5saW5lR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgdGhpcy5udW1Eb3RzID0gbnVtRG90cztcbiAgICB0aGlzLmRvdENvbG9ycyA9IGRvdENvbG9ycztcblxuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyA9IDEwMDtcbiAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IDEwMDtcblxuICAgIHRoaXMuaW5pdFdhbGxzKCk7XG4gICAgdGhpcy5pbml0RG90cygpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldKTtcbiAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLmFkZENoaWxkKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbml0V2FsbHMoKSB7XG4gICAgbGV0IHdhbGxDb2xvciA9IGJnQ29sb3I7XG5cbiAgICBsZXQgd2FsbFRvcCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxUb3AuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbExlZnQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbExlZnQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbEJvdHRvbSA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIHdpbmRvdy5pbm5lckhlaWdodC0xXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsQm90dG9tLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxSaWdodCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFt3aW5kb3cuaW5uZXJXaWR0aC0xLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsUmlnaHQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICB0aGlzLndhbGxzID0gW3dhbGxUb3AsIHdhbGxMZWZ0LCB3YWxsQm90dG9tLCB3YWxsUmlnaHRdO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgdGhpcy5kb3RzLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgIGxldCBkb3QgPSBkLmdldEdyYXBoaWNzKClbMF07XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy53YWxscy5sZW5ndGg7IGorKykge1xuICAgICAgICB0aGlzLmIuaGl0KGRvdCwgdGhpcy53YWxsc1tqXS5nZXRHcmFwaGljcygpLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIHRoaXMuYi5oaXQoZG90LCB0aGlzLmRvdHNbal0uZ2V0R3JhcGhpY3MoKVswXSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGQuc3RlcCgpO1xuXG4gICAgICBpZiAoZC5kZWFkKSB7XG4gICAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5yZW1vdmVDaGlsZChlKSk7XG4gICAgICAgIHRoaXMuZG90cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIHRoaXMubnVtRG90cyAtPSAxO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLmQueCwgdGhpcy5saW5lRG90c1tpXS5kLnkpO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lVG8odGhpcy5saW5lRG90c1tpKzFdLmQueCwgdGhpcy5saW5lRG90c1tpKzFdLmQueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5kcmFnTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgICAgdGhpcy5kcmFnTGluZS5tb3ZlVG8odGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLngsIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC55KTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVRvKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICAgIHRoaXMuZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKHRoaXMudGVtcExlbmd0aFJlbWFpbmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5kcmFnTGluZSk7XG4gICAgICB0aGlzLmdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZyh0aGlzLmxlbmd0aFJlbWFpbmluZyk7XG4gICAgfVxuICB9XG5cbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgIHRoaXMubGluZURvdHMucHVzaChzdGFydCk7XG4gICAgICAgIHRoaXMubGluZUNvbG9yID0gc3RhcnQuY29sb3I7XG4gICAgICB9XG4gIH1cblxuICBvbkRyYWdFbmQoKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5saW5lRG90cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMubGluZURvdHMuZm9yRWFjaChkID0+IGQua2lsbCgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgfVxuXG4gIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgdGhpcy5wb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICAgICAgbGV0IHRlbXBEaXN0ID0gKHRoaXMucG9zLnggLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC54KSoodGhpcy5wb3MueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpXG4gICAgICAgICAgICAgICAgICAgICAgICArICh0aGlzLnBvcy55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSkqKHRoaXMucG9zLnkgLSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0uZC55KTtcbiAgICAgICAgICB0aGlzLnRlbXBMZW5ndGhSZW1haW5pbmcgPSB0aGlzLmxlbmd0aFJlbWFpbmluZyAtIE1hdGguY2VpbChkaXN0TXVsdCAqIE1hdGguc3FydCh0ZW1wRGlzdCkpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QodGhpcy5wb3MpO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAobWlkLmNvbG9yID09PSB0aGlzLmxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgbGV0IGRpc3QgPSAobWlkLmQueCAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLngpKihtaWQuZC54IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAobWlkLmQueSAtIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXS5kLnkpKihtaWQuZC55IC0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdLmQueSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyAtPSBNYXRoLmNlaWwoZGlzdE11bHQgKiBNYXRoLnNxcnQoZGlzdCkpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKG1pZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmaW5kRG90KHBvcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgICAgIGxldCBzbmFwUG9zID0geyB4OnRoaXMuZG90c1tpXS5kLngsIHk6dGhpcy5kb3RzW2ldLmQueSB9O1xuICAgICAgICAgIGxldCByYWQgPSB0aGlzLmRvdHNbaV0ucmFkO1xuICAgICAgICAgIGxldCBkaXN0ID0gKHBvcy54LXNuYXBQb3MueCkqKHBvcy54LXNuYXBQb3MueCkgK1xuICAgICAgICAgICAgICAgICAgICAgKHBvcy55LXNuYXBQb3MueSkqKHBvcy55LXNuYXBQb3MueSk7XG4gICAgICAgICAgaWYgKGRpc3QgPD0gcmFkKnJhZCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5kb3RzW2ldICE9PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb3RzW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgR2FtZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI2JhcicpLmNzcyh7bGVmdDogd2lkdGgvMi0xMjUsIGJvdHRvbTogLTgwfSk7XG5cbiAgICB0aGlzLnBhdGhMZW5ndGggPSA1NTQ7XG4gICAgdGhpcy5wcmV2U2NvcmUgPSAwO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcjYmFyJykuYW5pbWF0ZSh7XG4gICAgICBib3R0b206IDMwXG4gICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuICB9XG5cbiAgZmlsbEJhcihjb2xvciwgZmlsbFBlcmNlbnRhZ2UpIHtcbiAgICBsZXQgbSA9IHRoaXMucGF0aExlbmd0aC8oLTEwMC4wKTtcbiAgICBsZXQgeSA9IG0qZmlsbFBlcmNlbnRhZ2UrdGhpcy5wYXRoTGVuZ3RoO1xuICAgICQoJyNiYXInKS5jc3Moe3N0cm9rZTogY29sb3IsIFwic3Ryb2tlLWRhc2hvZmZzZXRcIjogeX0pO1xuICB9XG5cbiAgYWRkU2NvcmUoaW5jcmVtZW50U2NvcmUpIHtcbiAgICB0aGlzLnNjb3JlID0gdGhpcy5wcmV2U2NvcmUgKyBpbmNyZW1lbnRTY29yZTtcbiAgICAkKHtjb3VudE51bTogdGhpcy5wcmV2U2NvcmV9KS5hbmltYXRlKHtjb3VudE51bTogdGhpcy5zY29yZX0sIHtcbiAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICBlYXNpbmc6J2xpbmVhcicsXG4gICAgICBzdGVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2hhdCB0b2RvIG9uIGV2ZXJ5IGNvdW50XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5jb3VudE51bS50b0ZpeGVkKDApKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuc2NvcmUpO1xuICAgICAgICB0aGlzLnByZXZTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRQZXJjZW50UmVtYWluaW5nKHJlbWFpbikge1xuICAgICQoJyNyZW1haW5pbmcnKS50ZXh0KHJlbWFpbiArICclJyk7XG4gICAgaWYgKHJlbWFpbiA8PSAyMCkge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICdyZWQnfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAnd2hpdGUnfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVCYXJcbiIsImV4cG9ydCBjb25zdCBudW1Eb3RzID0gNTA7XG5leHBvcnQgY29uc3QgZGlzdE11bHQgPSAuMDU7XG5leHBvcnQgY29uc3QgZG90Q29sb3JzID0gWzB4RjlGNzUxLCAweDM1Q0EzNywgMHhBRTM0QzksIDB4MkU1RUM5LCAweENBMzY2M107XG5leHBvcnQgY29uc3QgYmdDb2xvciA9IDB4ZmZmZGYzO1xuIiwiY2xhc3MgU3RhcnRNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoY2IpIHtcbiAgICAvLyB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlZW50ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNWI1YjViJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzRENEQ0RCcpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgICAgdG9wOiAtNTMwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG5cbiAgICAgICQoJyNzaGFkZScpLmFuaW1hdGUoe1xuICAgICAgICBvcGFjaXR5OiAwXG4gICAgICB9LCAxMDAwLCAnbGluZWFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmNzcyh7bGVmdDogd2lkdGgvMi0zMDAsIHRvcDogLTUzMH0pO1xuXG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICB0b3A6IGhlaWdodC8yLTI2NVxuICAgIH0sIDQwMDAsICdlYXNlT3V0RWxhc3RpYycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXJ0TWVzc2FnZTtcbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcmVjdCwgcG9zKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGRkZGRjtcblxuICAgIHRoaXMud2FsbCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy53YWxsLmxpbmVTdHlsZSg0LCB0aGlzLmNvbG9yLCAxKTtcbiAgICB0aGlzLndhbGwuZHJhd1JlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgdGhpcy53YWxsLmVuZEZpbGwoKTtcbiAgICB0aGlzLndhbGwueCA9cG9zWzBdO1xuICAgIHRoaXMud2FsbC55ID0gcG9zWzFdO1xuXG4gIH1cblxuICBzdGVwKCkge1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IFN0YXJ0TWVzc2FnZSBmcm9tICcuL1N0YXJ0TWVzc2FnZSc7XG5pbXBvcnQgR2FtZUJhciBmcm9tICcuL0dhbWVCYXInO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgYiA9IG5ldyBCdW1wKFBJWEkpO1xuXG4gIGxldCBnYW1lQmFyID0gbmV3IEdhbWVCYXIoKTtcbiAgbGV0IGcgPSBuZXcgR2FtZShzdGFnZSwgYiwgZ2FtZUJhcik7XG5cbiAgbGV0IHN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lQmFyLmluaXQoKTtcbiAgICBnYW1lQmFyLmZpbGxCYXIoJ3doaXRlJywgMCk7XG4gICAgZ2FtZUJhci5hZGRTY29yZSgwKTtcbiAgICBnYW1lQmFyLnNldFBlcmNlbnRSZW1haW5pbmcoMTAwKTtcbiAgfVxuICBsZXQgc3RhcnQgPSBuZXcgU3RhcnRNZXNzYWdlKHN0YXJ0R2FtZS5iaW5kKHRoaXMpKTtcblxuICAvLyBsZXQgaSA9IG5ldyBJbnRlcmZhY2UoKVxuXG4gIGxldCByZW5kZXIgPSAoKSA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIGcuc3RlcCgpO1xuICAgICAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbiAgfVxuXG4gIHJlbmRlcigpO1xufSkoKTtcbiJdfQ==
