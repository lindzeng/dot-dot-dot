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
      }

      // Render line graphics
      this.stage.removeChild(this.lineGraphics);
      this.lineGraphics = new PIXI.Graphics();
      // this.lineGraphics.lineStyle(5, this.lineColor, 1);
      this.lineGraphics.lineStyle(.5, 0x000000);
      for (var _i = 0; _i < this.lineDots.length - 1; _i++) {
        this.lineGraphics.moveTo(this.lineDots[_i].d.x, this.lineDots[_i].d.y);
        this.lineGraphics.lineTo(this.lineDots[_i + 1].d.x, this.lineDots[_i + 1].d.y);
      }
      this.lineGraphics.endFill();
      // this.stage.addChildAt(this.lineGraphics, this.stage.children.length -1);
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
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.lineDots = [];
      console.log("in drag start");
      this.dragging = true;
      var start = this.findDot(event.data.getLocalPosition(this.stage));
      if (start) {
        this.lineDots.push(start);
        this.lineColor = start.color;
      }
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      // console.log("in drag end");
      this.dragging = false;
      if (this.lineDots.length > 1) {
        this.lineDots.forEach(function (d) {
          return d.kill();
        });
      }
      this.lineDots = [];
      // console.log(this.lineDots);
    }
  }, {
    key: 'onDragMove',
    value: function onDragMove(event) {
      if (this.dragging) {
        console.log("in drag move");
        this.pos = event.data.getLocalPosition(this.stage);
        var mid = this.findDot({ x: this.pos.x, y: this.pos.y });
        if (mid !== undefined) {
          if (mid.color === this.lineColor) {
            this.lineDots.push(mid);
          }
        }

        // let lineTrail = new PIXI.Container();
        // lineTrail.addChild(graphics);
        // graphics.drawCircle(0, 0, 7);
        //
        // TweenMax.set(lineTrail.position, { x:pos.x, y:pos.y });
        // TweenMax.set(lineTrail, { alpha:0 });
        // TweenMax.set(lineTrail.scale, { x:0.5, y:0.5 });
        //
        // TweenMax.to(lineTrail, 1, {  alpha:Math.random() * 0.5 + 0.5, ease:Expo.easeOut } );
        // TweenMax.to(lineTrail.scale, 3, { x:0, y:0, ease:Expo.easeOut, delay:1.5, onComplete:this.remove.bind(this), onCompleteParams:[graphics, lineTrail]});

        // this.stage.addChild(lineTrail);
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

    // remove(graphics, lineTrail) {
    //     if (graphics !== null && lineTrail !== null) lineTrail.removeChild(graphics);
    //     graphics.clear();
    //     graphics = null;
    //     this.stage.removeChild(lineTrail);
    //     lineTrail = null;
    //   }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvR2FtZS5qcyIsImpzL0dhbWVCYXIuanMiLCJqcy9IZWxwZXJzLmpzIiwianMvU3RhcnRNZXNzYWdlLmpzIiwianMvV2FsbC5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTSxHO0FBQ0osZUFBWSxLQUFaLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUssS0FBTCxHQUFhLFFBQVEsS0FBUixHQUFnQixRQUE3QjtBQUNBLFNBQUssR0FBTCxHQUFXLE1BQU0sR0FBTixHQUFZLEtBQUssTUFBTCxLQUFjLEVBQWQsR0FBaUIsRUFBeEM7QUFDQSxRQUFJLElBQUksTUFBTSxHQUFOLEdBQVksQ0FBQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxVQUF4QixFQUFvQyxLQUFLLE1BQUwsS0FBZ0IsT0FBTyxXQUEzRCxDQUFwQjs7QUFFQSxTQUFLLEtBQUwsR0FBYSxDQUFiOztBQUVBLFNBQUssQ0FBTCxHQUFTLElBQUksS0FBSyxRQUFULEVBQVQ7QUFDQSxTQUFLLENBQUwsQ0FBTyxTQUFQLENBQWlCLEtBQUssS0FBdEI7QUFDQSxTQUFLLENBQUwsQ0FBTyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLEtBQUssR0FBN0I7QUFDQSxTQUFLLENBQUwsQ0FBTyxPQUFQO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixDQUFqQixHQUFzQixDQUFsQztBQUNBLFNBQUssQ0FB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QWY7QUFDQSxXQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLFFBQXBCLEdBQStCLFVBQS9CO0FBQ0EsV0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixPQUFwQixHQUE4QixPQUE5QjtBQUNBLFdBQVMsVUFBVCxHQUFzQixJQUF0QjtBQUNBLFdBQVMsZUFBVDtBQUNBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsU0FBUyxJQUFuQzs7QUFFQSxNQUFJLElBQUksSUFBSSxJQUFKLENBQVMsSUFBVCxDQUFSOztBQUVBLE1BQUksVUFBVSx1QkFBZDtBQUNBLE1BQUksSUFBSSxtQkFBUyxLQUFULEVBQWdCLENBQWhCLENBQVI7O0FBRUEsTUFBSSxZQUFZLFNBQVosU0FBWSxHQUFNO0FBQ3BCLFlBQVEsSUFBUjtBQUNBLFlBQVEsT0FBUixDQUFnQixPQUFoQixFQUF5QixDQUF6QjtBQUNBLFlBQVEsUUFBUixDQUFpQixDQUFqQjtBQUNBLFlBQVEsbUJBQVIsQ0FBNEIsR0FBNUI7QUFDRCxHQUxEO0FBTUEsTUFBSSxRQUFRLDJCQUFpQixVQUFVLElBQVYsV0FBakIsQ0FBWjs7QUFFQTs7QUFFQSxNQUFJLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDZiwwQkFBc0IsTUFBdEI7QUFDQSxNQUFFLElBQUY7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEI7QUFDSCxHQUpEOztBQU1BO0FBQ0QsQ0F2Q0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgRG90IHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvcywgcmFkKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGMDAwMDtcbiAgICB0aGlzLnJhZCA9IHJhZCA/IHJhZCA6IE1hdGgucmFuZG9tKCkqMjArMTU7XG4gICAgbGV0IHAgPSBwb3MgPyBwb3MgOiBbTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoLCBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIHRoaXMuc2NhbGUgPSAwO1xuXG4gICAgdGhpcy5kID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLmQuYmVnaW5GaWxsKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuZC5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLmQuZW5kRmlsbCgpO1xuICAgIHRoaXMuZC54ID0gcFswXTtcbiAgICB0aGlzLmQueSA9IHBbMV07XG4gICAgdGhpcy5kLnZ4ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnZ5ID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDE7XG4gICAgdGhpcy5kLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuZC5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMjtcbiAgICB0aGlzLm8ueSA9IHBbMV0gLSB0aGlzLmQudnkqMjtcbiAgICB0aGlzLm8uc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5vLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLmtpbGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMuZ3Jvd2luZyA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmdyb3dpbmcpIHtcbiAgICAgIHRoaXMuc2NhbGUgKz0gLjA1O1xuICAgICAgdGhpcy51cGRhdGVTY2FsZXMoKTtcblxuICAgICAgaWYgKHRoaXMuc2NhbGUgPiAxKSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLmdyb3dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmQueCArPSB0aGlzLmQudng7XG4gICAgdGhpcy5kLnkgKz0gdGhpcy5kLnZ5O1xuXG4gICAgdGhpcy5vLnggPSB0aGlzLmQueCAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMjtcblxuICAgIGlmICh0aGlzLmtpbGxlZCkge1xuICAgICAgdGhpcy5zY2FsZSAtPSAuMjtcbiAgICAgIHRoaXMudXBkYXRlU2NhbGVzKCk7XG4gICAgICBpZiAodGhpcy5zY2FsZSA8IC0uMDA1KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNjYWxlcygpIHtcbiAgICB0aGlzLmQuc2NhbGUueCA9IHRoaXMuc2NhbGU7XG4gICAgdGhpcy5kLnNjYWxlLnkgPSB0aGlzLnNjYWxlO1xuXG4gICAgdGhpcy5vLnNjYWxlLnggPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMuby5zY2FsZS55ID0gdGhpcy5zY2FsZTtcbiAgfVxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gW3RoaXMuZCwgdGhpcy5vXTtcbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgdGhpcy5raWxsZWQgPSB0cnVlO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG90O1xuIiwiaW1wb3J0IERvdCBmcm9tICcuL0RvdCdcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbCdcbmltcG9ydCB7YmdDb2xvciwgZG90Q29sb3JzLCBudW1Eb3RzfSBmcm9tICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Ioc3RhZ2UsYikge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLnN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2Uub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKVxuICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCB0aGlzLm9uRHJhZ01vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5iID0gYjtcblxuICAgIHRoaXMuZG90cyA9IFtdO1xuICAgIHRoaXMud2FsbHMgPSBbXTtcblxuICAgIHRoaXMubGluZURvdHMgPSBbXTtcbiAgICB0aGlzLmxpbmVDb2xvciA9IDB4ZmZmZmZmO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgIHRoaXMubnVtRG90cyA9IG51bURvdHM7XG4gICAgdGhpcy5kb3RDb2xvcnMgPSBkb3RDb2xvcnM7XG5cbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxlbmd0aFJlbWFpbmluZyA9IDEwMDtcblxuICAgIHRoaXMuaW5pdFdhbGxzKCk7XG4gICAgdGhpcy5pbml0RG90cygpO1xuICB9XG5cbiAgaW5pdERvdHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSBuZXcgRG90KHRoaXMuZG90Q29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZG90Q29sb3JzLmxlbmd0aCldKTtcbiAgICAgIHRoaXMuZG90cy5wdXNoKGQpO1xuICAgICAgZC5nZXRHcmFwaGljcygpLmZvckVhY2goZSA9PiB0aGlzLnN0YWdlLmFkZENoaWxkKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbml0V2FsbHMoKSB7XG4gICAgbGV0IHdhbGxDb2xvciA9IGJnQ29sb3I7XG5cbiAgICBsZXQgd2FsbFRvcCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxUb3AuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbExlZnQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbMCwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbExlZnQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICBsZXQgd2FsbEJvdHRvbSA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCAxXSwgWzAsIHdpbmRvdy5pbm5lckhlaWdodC0xXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsQm90dG9tLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxSaWdodCA9IG5ldyBXYWxsKHdhbGxDb2xvciwgWzAsIDAsIDEsIHdpbmRvdy5pbm5lckhlaWdodF0sIFt3aW5kb3cuaW5uZXJXaWR0aC0xLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsUmlnaHQuZ2V0R3JhcGhpY3MoKSk7XG5cbiAgICB0aGlzLndhbGxzID0gW3dhbGxUb3AsIHdhbGxMZWZ0LCB3YWxsQm90dG9tLCB3YWxsUmlnaHRdO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICAvLyBSZW5kZXIgZG90IGdyYXBoaWNzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSB0aGlzLmRvdHNbaV0uZ2V0R3JhcGhpY3MoKVswXTtcblxuICAgICAgLy8gRGV0ZWN0IGNvbGxpc2lvbnNcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy53YWxscy5sZW5ndGg7IGorKykge1xuICAgICAgICB0aGlzLmIuaGl0KGQsIHRoaXMud2FsbHNbal0uZ2V0R3JhcGhpY3MoKSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubnVtRG90czsgaisrKSB7XG4gICAgICAgIGlmIChpID09PSBqKSBjb250aW51ZTtcbiAgICAgICAgdGhpcy5iLmhpdChkLCB0aGlzLmRvdHNbal0uZ2V0R3JhcGhpY3MoKVswXSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmRvdHNbaV0uc3RlcCgpO1xuXG4gICAgICBpZiAodGhpcy5kb3RzW2ldLmRlYWQpIHtcbiAgICAgICAgdGhpcy5kb3RzW2ldLmdldEdyYXBoaWNzKCkuZm9yRWFjaChlID0+IHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQoZSkpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGxpbmUgZ3JhcGhpY3NcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgLy8gdGhpcy5saW5lR3JhcGhpY3MubGluZVN0eWxlKDUsIHRoaXMubGluZUNvbG9yLCAxKTtcbiAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGluZURvdHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHRoaXMubGluZUdyYXBoaWNzLm1vdmVUbyh0aGlzLmxpbmVEb3RzW2ldLmQueCwgdGhpcy5saW5lRG90c1tpXS5kLnkpO1xuICAgICAgICB0aGlzLmxpbmVHcmFwaGljcy5saW5lVG8odGhpcy5saW5lRG90c1tpKzFdLmQueCwgdGhpcy5saW5lRG90c1tpKzFdLmQueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAvLyB0aGlzLnN0YWdlLmFkZENoaWxkQXQodGhpcy5saW5lR3JhcGhpY3MsIHRoaXMuc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoIC0xKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcblxuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuZHJhZ0xpbmUpO1xuICAgICAgdGhpcy5kcmFnTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICB0aGlzLmRyYWdMaW5lLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgICAgdGhpcy5kcmFnTGluZS5tb3ZlVG8odGhpcy5saW5lRG90c1t0aGlzLmxpbmVEb3RzLmxlbmd0aC0xXS5kLngsIHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGgtMV0uZC55KTtcbiAgICAgIHRoaXMuZHJhZ0xpbmUubGluZVRvKHRoaXMucG9zLngsIHRoaXMucG9zLnkpO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmRyYWdMaW5lKTtcbiAgICB9XG4gIH1cblxuICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgICAgY29uc29sZS5sb2coXCJpbiBkcmFnIHN0YXJ0XCIpO1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICBsZXQgc3RhcnQgPSB0aGlzLmZpbmREb3QoZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpKTtcbiAgICAgIGlmIChzdGFydCkge1xuICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2goc3RhcnQpO1xuICAgICAgICB0aGlzLmxpbmVDb2xvciA9IHN0YXJ0LmNvbG9yO1xuICAgICAgfVxuICB9XG5cbiAgb25EcmFnRW5kKCkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJpbiBkcmFnIGVuZFwiKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmxpbmVEb3RzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5saW5lRG90cy5mb3JFYWNoKGQgPT4gZC5raWxsKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lRG90cyA9IFtdO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5saW5lRG90cyk7XG4gIH1cblxuICBvbkRyYWdNb3ZlKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW4gZHJhZyBtb3ZlXCIpO1xuICAgICAgICAgIHRoaXMucG9zID0gZXZlbnQuZGF0YS5nZXRMb2NhbFBvc2l0aW9uKHRoaXMuc3RhZ2UpO1xuICAgICAgICAgIGxldCBtaWQgPSB0aGlzLmZpbmREb3QoeyB4OiB0aGlzLnBvcy54LCB5OnRoaXMucG9zLnkgfSk7XG4gICAgICAgICAgaWYgKG1pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgLy8gbGV0IGxpbmVUcmFpbCA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgICAgIC8vIGxpbmVUcmFpbC5hZGRDaGlsZChncmFwaGljcyk7XG4gICAgICAgICAgLy8gZ3JhcGhpY3MuZHJhd0NpcmNsZSgwLCAwLCA3KTtcbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIFR3ZWVuTWF4LnNldChsaW5lVHJhaWwucG9zaXRpb24sIHsgeDpwb3MueCwgeTpwb3MueSB9KTtcbiAgICAgICAgICAvLyBUd2Vlbk1heC5zZXQobGluZVRyYWlsLCB7IGFscGhhOjAgfSk7XG4gICAgICAgICAgLy8gVHdlZW5NYXguc2V0KGxpbmVUcmFpbC5zY2FsZSwgeyB4OjAuNSwgeTowLjUgfSk7XG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBUd2Vlbk1heC50byhsaW5lVHJhaWwsIDEsIHsgIGFscGhhOk1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjUsIGVhc2U6RXhwby5lYXNlT3V0IH0gKTtcbiAgICAgICAgICAvLyBUd2Vlbk1heC50byhsaW5lVHJhaWwuc2NhbGUsIDMsIHsgeDowLCB5OjAsIGVhc2U6RXhwby5lYXNlT3V0LCBkZWxheToxLjUsIG9uQ29tcGxldGU6dGhpcy5yZW1vdmUuYmluZCh0aGlzKSwgb25Db21wbGV0ZVBhcmFtczpbZ3JhcGhpY3MsIGxpbmVUcmFpbF19KTtcblxuICAgICAgICAgIC8vIHRoaXMuc3RhZ2UuYWRkQ2hpbGQobGluZVRyYWlsKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZpbmREb3QocG9zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtRG90czsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNuYXBQb3MgPSB7IHg6dGhpcy5kb3RzW2ldLmQueCwgeTp0aGlzLmRvdHNbaV0uZC55IH07XG4gICAgICAgICAgbGV0IHJhZCA9IHRoaXMuZG90c1tpXS5yYWQ7XG4gICAgICAgICAgdmFyIGRpc3QgPSAocG9zLngtc25hcFBvcy54KSoocG9zLngtc25hcFBvcy54KSArXG4gICAgICAgICAgICAgICAgICAgICAocG9zLnktc25hcFBvcy55KSoocG9zLnktc25hcFBvcy55KTtcbiAgICAgICAgICBpZiAoZGlzdCA8PSByYWQqcmFkKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmRvdHNbaV0gIT09IHRoaXMubGluZURvdHNbdGhpcy5saW5lRG90cy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvdHNbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gcmVtb3ZlKGdyYXBoaWNzLCBsaW5lVHJhaWwpIHtcbiAgLy8gICAgIGlmIChncmFwaGljcyAhPT0gbnVsbCAmJiBsaW5lVHJhaWwgIT09IG51bGwpIGxpbmVUcmFpbC5yZW1vdmVDaGlsZChncmFwaGljcyk7XG4gIC8vICAgICBncmFwaGljcy5jbGVhcigpO1xuICAvLyAgICAgZ3JhcGhpY3MgPSBudWxsO1xuICAvLyAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZChsaW5lVHJhaWwpO1xuICAvLyAgICAgbGluZVRyYWlsID0gbnVsbDtcbiAgLy8gICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBHYW1lQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjYmFyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTEyNSwgYm90dG9tOiAtODB9KTtcblxuICAgIHRoaXMucGF0aExlbmd0aCA9IDU1NDtcbiAgICB0aGlzLnByZXZTY29yZSA9IDA7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJyNiYXInKS5hbmltYXRlKHtcbiAgICAgIGJvdHRvbTogMzBcbiAgICB9LCAxMDAwLCAnbGluZWFyJyk7XG4gIH1cblxuICBmaWxsQmFyKGNvbG9yLCBmaWxsUGVyY2VudGFnZSkge1xuICAgIGxldCBtID0gdGhpcy5wYXRoTGVuZ3RoLygtMTAwLjApO1xuICAgIGxldCB5ID0gbSpmaWxsUGVyY2VudGFnZSt0aGlzLnBhdGhMZW5ndGg7XG4gICAgJCgnI2JhcicpLmNzcyh7c3Ryb2tlOiBjb2xvciwgXCJzdHJva2UtZGFzaG9mZnNldFwiOiB5fSk7XG4gIH1cblxuICBhZGRTY29yZShpbmNyZW1lbnRTY29yZSkge1xuICAgIHRoaXMuc2NvcmUgPSB0aGlzLnByZXZTY29yZSArIGluY3JlbWVudFNjb3JlO1xuICAgICQoe2NvdW50TnVtOiB0aGlzLnByZXZTY29yZX0pLmFuaW1hdGUoe2NvdW50TnVtOiB0aGlzLnNjb3JlfSwge1xuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIGVhc2luZzonbGluZWFyJyxcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXaGF0IHRvZG8gb24gZXZlcnkgY291bnRcbiAgICAgICAgJCgnI3Njb3JlJykudGV4dCh0aGlzLmNvdW50TnVtLnRvRml4ZWQoMCkpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICQoJyNzY29yZScpLnRleHQodGhpcy5zY29yZSk7XG4gICAgICAgIHRoaXMucHJldlNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFBlcmNlbnRSZW1haW5pbmcocmVtYWluKSB7XG4gICAgJCgnI3JlbWFpbmluZycpLnRleHQocmVtYWluICsgJyUnKTtcbiAgICBpZiAocmVtYWluIDw9IDIwKSB7XG4gICAgICAkKCcjcmVtYWluaW5nJykuY3NzKHtjb2xvcjogJ3JlZCd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JlbWFpbmluZycpLmNzcyh7Y29sb3I6ICd3aGl0ZSd9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZUJhclxuIiwiZXhwb3J0IGNvbnN0IG51bURvdHMgPSA1MDtcbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG4iLCJjbGFzcyBTdGFydE1lc3NhZ2Uge1xuICBjb25zdHJ1Y3RvcihjYikge1xuICAgIC8vIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VlbnRlcihmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM1YjViNWInKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjNEQ0RDREJyk7XG4gICAgfSlcblxuICAgICQoJyNidXR0b25EaXYnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgICB0b3A6IC01MzBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInKTtcblxuICAgICAgJCgnI3NoYWRlJykuYW5pbWF0ZSh7XG4gICAgICAgIG9wYWNpdHk6IDBcbiAgICAgIH0sIDEwMDAsICdsaW5lYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuY3NzKHtsZWZ0OiB3aWR0aC8yLTMwMCwgdG9wOiAtNTMwfSk7XG5cbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5hbmltYXRlKHtcbiAgICAgIHRvcDogaGVpZ2h0LzItMjY1XG4gICAgfSwgNDAwMCwgJ2Vhc2VPdXRFbGFzdGljJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhcnRNZXNzYWdlO1xuIiwiY2xhc3MgV2FsbCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCByZWN0LCBwb3MpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IDB4RkZGRkZGO1xuXG4gICAgdGhpcy53YWxsID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLndhbGwubGluZVN0eWxlKDQsIHRoaXMuY29sb3IsIDEpO1xuICAgIHRoaXMud2FsbC5kcmF3UmVjdChyZWN0WzBdLCByZWN0WzFdLCByZWN0WzJdLCByZWN0WzNdKTtcbiAgICB0aGlzLndhbGwuZW5kRmlsbCgpO1xuICAgIHRoaXMud2FsbC54ID1wb3NbMF07XG4gICAgdGhpcy53YWxsLnkgPSBwb3NbMV07XG5cbiAgfVxuXG4gIHN0ZXAoKSB7XG4gIH1cblxuICBnZXRHcmFwaGljcygpIHtcbiAgICByZXR1cm4gdGhpcy53YWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbDtcbiIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5pbXBvcnQgU3RhcnRNZXNzYWdlIGZyb20gJy4vU3RhcnRNZXNzYWdlJztcbmltcG9ydCBHYW1lQmFyIGZyb20gJy4vR2FtZUJhcic7XG5pbXBvcnQge2JnQ29sb3J9IGZyb20gJy4vSGVscGVycyc7XG5cbigoKSA9PiB7XG5cbiAgbGV0IHR5cGUgPSBcIldlYkdMXCI7XG5cbiAgaWYoIVBJWEkudXRpbHMuaXNXZWJHTFN1cHBvcnRlZCgpKSB7XG4gICAgICB0eXBlID0gXCJjYW52YXNcIjtcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIHN0YWdlIGFuZCByZW5kZXJlciBhbmQgYWRkIHRvIHRoZSBET01cbiAgbGV0IHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIGxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQsIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMX0pO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIGxldCBiID0gbmV3IEJ1bXAoUElYSSk7XG5cbiAgbGV0IGdhbWVCYXIgPSBuZXcgR2FtZUJhcigpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBiKTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVCYXIuaW5pdCgpO1xuICAgIGdhbWVCYXIuZmlsbEJhcignd2hpdGUnLCAwKTtcbiAgICBnYW1lQmFyLmFkZFNjb3JlKDApO1xuICAgIGdhbWVCYXIuc2V0UGVyY2VudFJlbWFpbmluZygxMDApO1xuICB9XG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIC8vIGxldCBpID0gbmV3IEludGVyZmFjZSgpXG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59KSgpO1xuIl19
