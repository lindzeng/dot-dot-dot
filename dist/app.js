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
  function Game(stage, b) {
    _classCallCheck(this, Game);

    this.stage = stage;
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

        if (Math.random() > .999) {
          this.dots[i].kill();
        }
      }

      // Render line graphics
      this.stage.removeChild(this.lineGraphics);
      this.lineGraphics = new PIXI.Graphics();
      // this.lineGraphics.lineStyle(5, this.lineColor, 1);
      this.lineGraphics.lineStyle(.5, 0x000000);
      for (var _i = 0; _i < this.lineDots.length - 1; _i++) {
        this.lineGraphics.moveTo(this.lineDots[_i].x, this.lineDots[_i].y);
        this.lineGraphics.lineTo(this.lineDots[_i + 1].x, this.lineDots[_i + 1].y);
      }
      this.lineGraphics.endFill();
      // this.stage.addChildAt(this.lineGraphics, this.stage.children.length -1);
      this.stage.addChild(this.lineGraphics);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.lineDots = [];
      console.log("in drag start");
      this.dragging = true;
      var start = this.findDot(event.data.getLocalPosition(this.stage));
      this.lineDots.push(start.d);
      this.lineColor = start.color;
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      console.log("in drag end");
      this.dragging = false;
      console.log(this.lineDots);
    }
  }, {
    key: 'onDragMove',
    value: function onDragMove(event) {
      if (this.dragging) {
        console.log("in drag move");
        var pos = event.data.getLocalPosition(this.stage);
        var mid = this.findDot({ x: pos.x, y: pos.y });
        if (mid !== undefined) {
          if (mid.color === this.lineColor) {
            this.lineDots.push(mid.d);
          }
        }
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x000000);
        var lineTrail = new PIXI.Container();
        lineTrail.addChild(graphics);
        graphics.drawCircle(0, 0, 7);

        TweenMax.set(lineTrail.position, { x: pos.x, y: pos.y });
        TweenMax.set(lineTrail, { alpha: 0 });
        TweenMax.set(lineTrail.scale, { x: 0.5, y: 0.5 });

        TweenMax.to(lineTrail, 1, { alpha: Math.random() * 0.5 + 0.5, ease: Expo.easeOut });
        TweenMax.to(lineTrail.scale, 3, { x: 0, y: 0, ease: Expo.easeOut, delay: 1.5, onComplete: this.remove.bind(this), onCompleteParams: [graphics, lineTrail] });

        this.stage.addChild(lineTrail);
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
          if (this.dots[i].d !== this.lineDots[this.lineDots.length - 1]) {
            return this.dots[i];
          }
        }
      }
      return undefined;
    }
  }, {
    key: 'remove',
    value: function remove(graphics, lineTrail) {
      if (graphics !== null && lineTrail !== null) lineTrail.removeChild(graphics);
      graphics.clear();
      graphics = null;
      this.stage.removeChild(lineTrail);
      lineTrail = null;
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
  var g = new _Game2.default(stage, b);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9HYW1lLmpzIiwianMvR2FtZUJhci5qcyIsImpzL0hlbHBlcnMuanMiLCJqcy9TdGFydE1lc3NhZ2UuanMiLCJqcy9XYWxsLmpzIiwianMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEc7QUFDSixlQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFBQTs7QUFDM0IsU0FBSyxLQUFMLEdBQWEsUUFBUSxLQUFSLEdBQWdCLFFBQTdCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsTUFBTSxHQUFOLEdBQVksS0FBSyxNQUFMLEtBQWMsRUFBZCxHQUFpQixFQUF4QztBQUNBLFFBQUksSUFBSSxNQUFNLEdBQU4sR0FBWSxDQUFDLEtBQUssTUFBTCxLQUFnQixPQUFPLFVBQXhCLEVBQW9DLEtBQUssTUFBTCxLQUFnQixPQUFPLFdBQTNELENBQXBCOztBQUVBLFNBQUssS0FBTCxHQUFhLENBQWI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxFQUFQLEdBQWEsS0FBSyxNQUFMLEtBQWdCLENBQWpCLEdBQXNCLENBQWxDO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixD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RUFBSixFQUFtQztBQUMvQixXQUFPLFFBQVA7QUFDSDs7QUFFRDtBQUNBLE1BQUksUUFBUSxJQUFJLEtBQUssU0FBVCxFQUFaO0FBQ0EsTUFBSSxXQUFXLEtBQUssa0JBQUwsQ0FBd0IsT0FBTyxVQUEvQixFQUEyQyxPQUFPLFdBQWxELEVBQStELEVBQUMsV0FBVyxJQUFaLEVBQWtCLGFBQWEsS0FBL0IsRUFBc0MsWUFBWSxDQUFsRCxFQUEvRCxDQUFmO0FBQ0EsV0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixRQUFwQixHQUErQixVQUEvQjtBQUNBLFdBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsT0FBcEIsR0FBOEIsT0FBOUI7QUFDQSxXQUFTLFVBQVQsR0FBc0IsSUFBdEI7QUFDQSxXQUFTLGVBQVQ7QUFDQSxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQVMsSUFBbkM7O0FBRUEsTUFBSSxJQUFJLElBQUksSUFBSixDQUFTLElBQVQsQ0FBUjs7QUFFQSxNQUFJLFVBQVUsdUJBQWQ7QUFDQSxNQUFJLElBQUksbUJBQVMsS0FBVCxFQUFnQixDQUFoQixDQUFSOztBQUVBLE1BQUksWUFBWSxTQUFaLFNBQVksR0FBTTtBQUNwQixZQUFRLElBQVI7QUFDQSxZQUFRLE9BQVIsQ0FBZ0IsT0FBaEIsRUFBeUIsQ0FBekI7QUFDQSxZQUFRLFFBQVIsQ0FBaUIsQ0FBakI7QUFDQSxZQUFRLG1CQUFSLENBQTRCLEdBQTVCO0FBQ0QsR0FMRDtBQU1BLE1BQUksUUFBUSwyQkFBaUIsVUFBVSxJQUFWLFdBQWpCLENBQVo7O0FBRUE7O0FBRUEsTUFBSSxTQUFTLFNBQVQsTUFBUyxHQUFNO0FBQ2YsMEJBQXNCLE1BQXRCO0FBQ0EsTUFBRSxJQUFGO0FBQ0EsYUFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0gsR0FKRDs7QUFNQTtBQUNELENBdkNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIERvdCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3MsIHJhZCkge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRjAwMDA7XG4gICAgdGhpcy5yYWQgPSByYWQgPyByYWQgOiBNYXRoLnJhbmRvbSgpKjIwKzE1O1xuICAgIGxldCBwID0gcG9zID8gcG9zIDogW01hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCwgTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICB0aGlzLnNjYWxlID0gMDtcblxuICAgIHRoaXMuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5kLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLmQuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5kLmVuZEZpbGwoKTtcbiAgICB0aGlzLmQueCA9IHBbMF07XG4gICAgdGhpcy5kLnkgPSBwWzFdO1xuICAgIHRoaXMuZC52eCA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC52eSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLmNpcmN1bGFyID0gdHJ1ZTtcblxuICAgIHRoaXMubyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5vLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApOyAgLy8gKHRoaWNrbmVzcywgY29sb3IpXG4gICAgdGhpcy5vLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuby5lbmRGaWxsKCk7XG4gICAgdGhpcy5vLnggPSBwWzBdIC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSBwWzFdIC0gdGhpcy5kLnZ5KjI7XG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLmdyb3dpbmcgPSB0cnVlO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5ncm93aW5nKSB7XG4gICAgICB0aGlzLnNjYWxlICs9IC4wNTtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ncm93aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kLnggKz0gdGhpcy5kLnZ4O1xuICAgIHRoaXMuZC55ICs9IHRoaXMuZC52eTtcblxuICAgIHRoaXMuby54ID0gdGhpcy5kLnggLSB0aGlzLmQudngqMjtcbiAgICB0aGlzLm8ueSA9IHRoaXMuZC55IC0gdGhpcy5kLnZ5KjI7XG5cbiAgICBpZiAodGhpcy5raWxsZWQpIHtcbiAgICAgIHRoaXMuc2NhbGUgLT0gLjI7XG4gICAgICB0aGlzLnVwZGF0ZVNjYWxlcygpO1xuICAgICAgaWYgKHRoaXMuc2NhbGUgPCAtLjAwNSkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMDtcbiAgICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTY2FsZXMoKSB7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcblxuICAgIHRoaXMuby5zY2FsZS54ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLm8uc2NhbGUueSA9IHRoaXMuc2NhbGU7XG4gIH1cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmQsIHRoaXMub107XG4gIH1cblxuICBraWxsKCkge1xuICAgIHRoaXMua2lsbGVkID0gdHJ1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvdDtcbiIsImltcG9ydCBEb3QgZnJvbSAnLi9Eb3QnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQge2JnQ29sb3IsIGRvdENvbG9ycywgbnVtRG90c30gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlLGIpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSk7XG4gICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IFt3YWxsVG9wLCB3YWxsTGVmdCwgd2FsbEJvdHRvbSwgd2FsbFJpZ2h0XTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gdGhpcy5kb3RzW2ldLmdldEdyYXBoaWNzKClbMF07XG5cbiAgICAgIC8vIERldGVjdCBjb2xsaXNpb25zXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2FsbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5iLmhpdChkLCB0aGlzLndhbGxzW2pdLmdldEdyYXBoaWNzKCksIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy5kb3RzW2pdLmdldEdyYXBoaWNzKClbMF0sIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5kb3RzW2ldLnN0ZXAoKTtcblxuICAgICAgaWYgKHRoaXMuZG90c1tpXS5kZWFkKSB7XG4gICAgICAgIHRoaXMuZG90c1tpXS5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAuOTk5KSB7XG4gICAgICAgIHRoaXMuZG90c1tpXS5raWxsKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGxpbmUgZ3JhcGhpY3NcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgLy8gdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDUsIHRoaXMubGluZUNvbG9yLCAxKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLngsIHRoaXMubGluZURvdHNbaV0ueSk7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVUbyh0aGlzLmxpbmVEb3RzW2krMV0ueCwgdGhpcy5saW5lRG90c1tpKzFdLnkpO1xuICAgIH1cbiAgICB0aGlzLmxpbmVHcmFwaGljcy5lbmRGaWxsKCk7XG4gICAgLy8gdGhpcy5zdGFnZS5hZGRDaGlsZEF0KHRoaXMubGluZUdyYXBoaWNzLCB0aGlzLnN0YWdlLmNoaWxkcmVuLmxlbmd0aCAtMSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmVHcmFwaGljcyk7XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgICAgY29uc29sZS5sb2coXCJpbiBkcmFnIHN0YXJ0XCIpO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QoZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpKTtcbiAgICAgIHRoaXMubGluZURvdHMucHVzaChzdGFydC5kKTtcbiAgICAgIHRoaXMubGluZUNvbG9yID0gc3RhcnQuY29sb3I7XG4gIH1cblxuICBvbkRyYWdFbmQoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImluIGRyYWcgZW5kXCIpO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgY29uc29sZS5sb2codGhpcy5saW5lRG90cyk7XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW4gZHJhZyBtb3ZlXCIpO1xuICAgICAgICAgIGxldCBwb3MgPSBldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSk7XG4gICAgICAgICAgbGV0IG1pZCA9IHRoaXMuZmluZERvdCh7IHg6IHBvcy54LCB5OnBvcy55IH0pO1xuICAgICAgICAgIGlmIChtaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAobWlkLmNvbG9yID09PSB0aGlzLmxpbmVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgdGhpcy5saW5lRG90cy5wdXNoKG1pZC5kKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgICAgICAgIGdyYXBoaWNzLmxpbmVTdHlsZSgxLCAweDAwMDAwMCk7XG4gICAgICAgICAgbGV0IGxpbmVUcmFpbCA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgICAgIGxpbmVUcmFpbC5hZGRDaGlsZChncmFwaGljcyk7XG4gICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCA3KTtcblxuICAgICAgICAgIFR3ZWVuTWF4LnNldChsaW5lVHJhaWwucG9zaXRpb24sIHsgeDpwb3MueCwgeTpwb3MueSB9KTtcbiAgICAgICAgICBUd2Vlbk1heC5zZXQobGluZVRyYWlsLCB7IGFscGhhOjAgfSk7XG4gICAgICAgICAgVHdlZW5NYXguc2V0KGxpbmVUcmFpbC5zY2FsZSwgeyB4OjAuNSwgeTowLjUgfSk7XG5cbiAgICAgICAgICBUd2Vlbk1heC50byhsaW5lVHJhaWwsIDEsIHsgIGFscGhhOk1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjUsIGVhc2U6RXhwby5lYXNlT3V0IH0gKTtcbiAgICAgICAgICBUd2Vlbk1heC50byhsaW5lVHJhaWwuc2NhbGUsIDMsIHsgeDowLCB5OjAsIGVhc2U6RXhwby5lYXNlT3V0LCBkZWxheToxLjUsIG9uQ29tcGxldGU6dGhpcy5yZW1vdmUuYmluZCh0aGlzKSwgb25Db21wbGV0ZVBhcmFtczpbZ3JhcGhpY3MsIGxpbmVUcmFpbF19KTtcblxuICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQobGluZVRyYWlsKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgdmFyIGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0uZCAhPT0gdGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG90c1tpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZW1vdmUoZ3JhcGhpY3MsIGxpbmVUcmFpbCkge1xuICAgICAgaWYgKGdyYXBoaWNzICE9PSBudWxsICYmIGxpbmVUcmFpbCAhPT0gbnVsbCkgbGluZVRyYWlsLnJlbW92ZUNoaWxkKGdyYXBoaWNzKTtcbiAgICAgIGdyYXBoaWNzLmNsZWFyKCk7XG4gICAgICBncmFwaGljcyA9IG51bGw7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKGxpbmVUcmFpbCk7XG4gICAgICBsaW5lVHJhaWwgPSBudWxsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImNsYXNzIEdhbWVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyNiYXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMTI1LCBib3R0b206IC04MH0pO1xuXG4gICAgdGhpcy5wYXRoTGVuZ3RoID0gNTU0O1xuICAgIHRoaXMucHJldlNjb3JlID0gMDtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnI2JhcicpLmFuaW1hdGUoe1xuICAgICAgYm90dG9tOiAzMFxuICAgIH0sIDEwMDAsICdsaW5lYXInKTtcbiAgfVxuXG4gIGZpbGxCYXIoY29sb3IsIGZpbGxQZXJjZW50YWdlKSB7XG4gICAgbGV0IG0gPSB0aGlzLnBhdGhMZW5ndGgvKC0xMDAuMCk7XG4gICAgbGV0IHkgPSBtKmZpbGxQZXJjZW50YWdlK3RoaXMucGF0aExlbmd0aDtcbiAgICAkKCcjYmFyJykuY3NzKHtzdHJva2U6IGNvbG9yLCBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IHl9KTtcbiAgfVxuXG4gIGFkZFNjb3JlKGluY3JlbWVudFNjb3JlKSB7XG4gICAgdGhpcy5zY29yZSA9IHRoaXMucHJldlNjb3JlICsgaW5jcmVtZW50U2NvcmU7XG4gICAgJCh7Y291bnROdW06IHRoaXMucHJldlNjb3JlfSkuYW5pbWF0ZSh7Y291bnROdW06IHRoaXMuc2NvcmV9LCB7XG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgZWFzaW5nOidsaW5lYXInLFxuICAgICAgc3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdoYXQgdG9kbyBvbiBldmVyeSBjb3VudFxuICAgICAgICAkKCcjc2NvcmUnKS50ZXh0KHRoaXMuY291bnROdW0udG9GaXhlZCgwKSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLnNjb3JlKTtcbiAgICAgICAgdGhpcy5wcmV2U2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0UGVyY2VudFJlbWFpbmluZyhyZW1haW4pIHtcbiAgICAkKCcjcmVtYWluaW5nJykudGV4dChyZW1haW4gKyAnJScpO1xuICAgIGlmIChyZW1haW4gPD0gMjApIHtcbiAgICAgICQoJyNyZW1haW5pbmcnKS5jc3Moe2NvbG9yOiAncmVkJ30pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3doaXRlJ30pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lQmFyXG4iLCJleHBvcnQgY29uc3QgbnVtRG90cyA9IDUwO1xuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcbiIsImNsYXNzIFN0YXJ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGNiKSB7XG4gICAgLy8gdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTUzMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gICAgICAkKCcjc2hhZGUnKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IC01MzB9KTtcblxuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgdG9wOiBoZWlnaHQvMi0yNjVcbiAgICB9LCA0MDAwLCAnZWFzZU91dEVsYXN0aWMnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydE1lc3NhZ2U7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTdGFydE1lc3NhZ2UgZnJvbSAnLi9TdGFydE1lc3NhZ2UnO1xuaW1wb3J0IEdhbWVCYXIgZnJvbSAnLi9HYW1lQmFyJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcblxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGIgPSBuZXcgQnVtcChQSVhJKTtcblxuICBsZXQgZ2FtZUJhciA9IG5ldyBHYW1lQmFyKCk7XG4gIGxldCBnID0gbmV3IEdhbWUoc3RhZ2UsIGIpO1xuXG4gIGxldCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZUJhci5pbml0KCk7XG4gICAgZ2FtZUJhci5maWxsQmFyKCd3aGl0ZScsIDApO1xuICAgIGdhbWVCYXIuYWRkU2NvcmUoMCk7XG4gICAgZ2FtZUJhci5zZXRQZXJjZW50UmVtYWluaW5nKDEwMCk7XG4gIH1cbiAgbGV0IHN0YXJ0ID0gbmV3IFN0YXJ0TWVzc2FnZShzdGFydEdhbWUuYmluZCh0aGlzKSk7XG5cbiAgLy8gbGV0IGkgPSBuZXcgSW50ZXJmYWNlKClcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0pKCk7XG4iXX0=
