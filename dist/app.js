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

    this.d = new PIXI.Graphics();
    this.d.beginFill(this.color);
    this.d.drawCircle(0, 0, this.rad);
    this.d.endFill();
    this.d.x = p[0];
    this.d.y = p[1];
    this.d.vx = Math.random() * 2 - 1;
    this.d.vy = Math.random() * 2 - 1;
    this.d.circular = true;

    this.o = new PIXI.Graphics();
    this.o.lineStyle(.5, 0x000000); // (thickness, color)
    this.o.drawCircle(0, 0, this.rad);
    this.o.endFill();
    this.o.x = p[0] - this.d.vx * 2;
    this.o.y = p[1] - this.d.vy * 2;
    this.o.circular = true;
  }

  _createClass(Dot, [{
    key: "step",
    value: function step() {
      this.d.x += this.d.vx;
      this.d.y += this.d.vy;

      this.o.x = this.d.x - this.d.vx * 2;
      this.o.y = this.d.y - this.d.vy * 2;
    }
  }, {
    key: "getGraphics",
    value: function getGraphics() {
      return [this.d, this.o];
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

},{"./Dot":1,"./Helpers":3,"./Wall":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numDots = exports.numDots = 50;
var dotColors = exports.dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
var bgColor = exports.bgColor = 0xfffdf3;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

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
    var g = new _Game2.default(stage, b);

    var render = function render() {
        requestAnimationFrame(render);
        g.step();
        renderer.render(stage);
    };

    render();
})();

},{"./Game":2,"./Helpers":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9HYW1lLmpzIiwianMvSGVscGVycy5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxFQUFQLEdBQWEsS0FBSyxNQUFMLEtBQWdCLENBQWpCLEdBQXNCLENBQWxDO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixDQUFqQixHQUFzQixDQUFsQztBQUNBLFNBQUssQ0FBTCxDQUFPLFFBQVAsR0FBa0IsSUFBbEI7O0FBRUEsU0FB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QVMsSUFBVCxDQUFSO0FBQ0EsUUFBSSxJQUFJLG1CQUFTLEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBUjs7QUFFQSxRQUFJLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDZiw4QkFBc0IsTUFBdEI7QUFDQSxVQUFFLElBQUY7QUFDQSxpQkFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0gsS0FKRDs7QUFNQTtBQUNELENBM0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIERvdCB7XG4gIGNvbnN0cnVjdG9yKGNvbG9yLCBwb3MsIHJhZCkge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRjAwMDA7XG4gICAgdGhpcy5yYWQgPSByYWQgPyByYWQgOiBNYXRoLnJhbmRvbSgpKjIwKzE1O1xuICAgIGxldCBwID0gcG9zID8gcG9zIDogW01hdGgucmFuZG9tKCkgKiB3aW5kb3cuaW5uZXJXaWR0aCwgTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lckhlaWdodF07XG5cbiAgICB0aGlzLmQgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuZC5iZWdpbkZpbGwodGhpcy5jb2xvcik7XG4gICAgdGhpcy5kLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5yYWQpO1xuICAgIHRoaXMuZC5lbmRGaWxsKCk7XG4gICAgdGhpcy5kLnggPSBwWzBdO1xuICAgIHRoaXMuZC55ID0gcFsxXTtcbiAgICB0aGlzLmQudnggPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQudnkgPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcbiAgICB0aGlzLmQuY2lyY3VsYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5vID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICB0aGlzLm8ubGluZVN0eWxlKC41LCAweDAwMDAwMCk7ICAvLyAodGhpY2tuZXNzLCBjb2xvcilcbiAgICB0aGlzLm8uZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5vLmVuZEZpbGwoKTtcbiAgICB0aGlzLm8ueCA9IHBbMF0gLSB0aGlzLmQudngqMjtcbiAgICB0aGlzLm8ueSA9IHBbMV0gLSB0aGlzLmQudnkqMjtcbiAgICB0aGlzLm8uY2lyY3VsYXIgPSB0cnVlO1xuICB9XG5cbiAgc3RlcCgpIHtcbiAgICB0aGlzLmQueCArPSB0aGlzLmQudng7XG4gICAgdGhpcy5kLnkgKz0gdGhpcy5kLnZ5O1xuXG4gICAgdGhpcy5vLnggPSB0aGlzLmQueCAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gdGhpcy5kLnkgLSB0aGlzLmQudnkqMjtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiBbdGhpcy5kLCB0aGlzLm9dO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvdDtcbiIsImltcG9ydCBEb3QgZnJvbSAnLi9Eb3QnXG5pbXBvcnQgV2FsbCBmcm9tICcuL1dhbGwnXG5pbXBvcnQge2JnQ29sb3IsIGRvdENvbG9ycywgbnVtRG90c30gZnJvbSAnLi9IZWxwZXJzJztcblxuY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlLGIpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5zdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkRyYWdFbmQuYmluZCh0aGlzKSlcbiAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpXG4gICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgdGhpcy5vbkRyYWdNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgdGhpcy5saW5lQ29sb3IgPSAweGZmZmZmZjtcbiAgICB0aGlzLmxpbmVHcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSk7XG4gICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IFt3YWxsVG9wLCB3YWxsTGVmdCwgd2FsbEJvdHRvbSwgd2FsbFJpZ2h0XTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgLy8gUmVuZGVyIGRvdCBncmFwaGljc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gdGhpcy5kb3RzW2ldLmdldEdyYXBoaWNzKClbMF07XG5cbiAgICAgIC8vIERldGVjdCBjb2xsaXNpb25zXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMud2FsbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5iLmhpdChkLCB0aGlzLndhbGxzW2pdLmdldEdyYXBoaWNzKCksIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm51bURvdHM7IGorKykge1xuICAgICAgICBpZiAoaSA9PT0gaikgY29udGludWU7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy5kb3RzW2pdLmdldEdyYXBoaWNzKClbMF0sIHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5kb3RzW2ldLnN0ZXAoKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgbGluZSBncmFwaGljc1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5saW5lR3JhcGhpY3MpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAvLyB0aGlzLmxpbmVHcmFwaGljcy5saW5lU3R5bGUoNSwgdGhpcy5saW5lQ29sb3IsIDEpO1xuICAgIHRoaXMubGluZUdyYXBoaWNzLmxpbmVTdHlsZSguNSwgMHgwMDAwMDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5saW5lRG90cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubW92ZVRvKHRoaXMubGluZURvdHNbaV0ueCwgdGhpcy5saW5lRG90c1tpXS55KTtcbiAgICAgICAgdGhpcy5saW5lR3JhcGhpY3MubGluZVRvKHRoaXMubGluZURvdHNbaSsxXS54LCB0aGlzLmxpbmVEb3RzW2krMV0ueSk7XG4gICAgfVxuICAgIHRoaXMubGluZUdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAvLyB0aGlzLnN0YWdlLmFkZENoaWxkQXQodGhpcy5saW5lR3JhcGhpY3MsIHRoaXMuc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoIC0xKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZUdyYXBoaWNzKTtcbiAgfVxuXG4gIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XG4gICAgICB0aGlzLmxpbmVEb3RzID0gW107XG4gICAgICBjb25zb2xlLmxvZyhcImluIGRyYWcgc3RhcnRcIik7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIGxldCBzdGFydCA9IHRoaXMuZmluZERvdChldmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcy5zdGFnZSkpO1xuICAgICAgdGhpcy5saW5lRG90cy5wdXNoKHN0YXJ0LmQpO1xuICAgICAgdGhpcy5saW5lQ29sb3IgPSBzdGFydC5jb2xvcjtcbiAgfVxuXG4gIG9uRHJhZ0VuZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaW4gZHJhZyBlbmRcIik7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmxpbmVEb3RzKTtcbiAgfVxuXG4gIG9uRHJhZ01vdmUoZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJpbiBkcmFnIG1vdmVcIik7XG4gICAgICAgICAgbGV0IHBvcyA9IGV2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzLnN0YWdlKTtcbiAgICAgICAgICBsZXQgbWlkID0gdGhpcy5maW5kRG90KHsgeDogcG9zLngsIHk6cG9zLnkgfSk7XG4gICAgICAgICAgaWYgKG1pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChtaWQuY29sb3IgPT09IHRoaXMubGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxpbmVEb3RzLnB1c2gobWlkLmQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKDEsIDB4MDAwMDAwKTtcbiAgICAgICAgICBsZXQgbGluZVRyYWlsID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgICAgbGluZVRyYWlsLmFkZENoaWxkKGdyYXBoaWNzKTtcbiAgICAgICAgICBncmFwaGljcy5kcmF3Q2lyY2xlKDAsIDAsIDcpO1xuXG4gICAgICAgICAgVHdlZW5NYXguc2V0KGxpbmVUcmFpbC5wb3NpdGlvbiwgeyB4OnBvcy54LCB5OnBvcy55IH0pO1xuICAgICAgICAgIFR3ZWVuTWF4LnNldChsaW5lVHJhaWwsIHsgYWxwaGE6MCB9KTtcbiAgICAgICAgICBUd2Vlbk1heC5zZXQobGluZVRyYWlsLnNjYWxlLCB7IHg6MC41LCB5OjAuNSB9KTtcblxuICAgICAgICAgIFR3ZWVuTWF4LnRvKGxpbmVUcmFpbCwgMSwgeyAgYWxwaGE6TWF0aC5yYW5kb20oKSAqIDAuNSArIDAuNSwgZWFzZTpFeHBvLmVhc2VPdXQgfSApO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGxpbmVUcmFpbC5zY2FsZSwgMywgeyB4OjAsIHk6MCwgZWFzZTpFeHBvLmVhc2VPdXQsIGRlbGF5OjEuNSwgb25Db21wbGV0ZTp0aGlzLnJlbW92ZS5iaW5kKHRoaXMpLCBvbkNvbXBsZXRlUGFyYW1zOltncmFwaGljcywgbGluZVRyYWlsXX0pO1xuXG4gICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChsaW5lVHJhaWwpO1xuICAgICAgfVxuICB9XG5cbiAgZmluZERvdChwb3MpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgICAgICBsZXQgc25hcFBvcyA9IHsgeDp0aGlzLmRvdHNbaV0uZC54LCB5OnRoaXMuZG90c1tpXS5kLnkgfTtcbiAgICAgICAgICBsZXQgcmFkID0gdGhpcy5kb3RzW2ldLnJhZDtcbiAgICAgICAgICB2YXIgZGlzdCA9IChwb3MueC1zbmFwUG9zLngpKihwb3MueC1zbmFwUG9zLngpICtcbiAgICAgICAgICAgICAgICAgICAgIChwb3MueS1zbmFwUG9zLnkpKihwb3MueS1zbmFwUG9zLnkpO1xuICAgICAgICAgIGlmIChkaXN0IDw9IHJhZCpyYWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZG90c1tpXS5kICE9PSB0aGlzLmxpbmVEb3RzW3RoaXMubGluZURvdHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb3RzW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlbW92ZShncmFwaGljcywgbGluZVRyYWlsKSB7XG4gICAgICBpZiAoZ3JhcGhpY3MgIT09IG51bGwgJiYgbGluZVRyYWlsICE9PSBudWxsKSBsaW5lVHJhaWwucmVtb3ZlQ2hpbGQoZ3JhcGhpY3MpO1xuICAgICAgZ3JhcGhpY3MuY2xlYXIoKTtcbiAgICAgIGdyYXBoaWNzID0gbnVsbDtcbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQobGluZVRyYWlsKTtcbiAgICAgIGxpbmVUcmFpbCA9IG51bGw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiZXhwb3J0IGNvbnN0IG51bURvdHMgPSA1MDtcbmV4cG9ydCBjb25zdCBkb3RDb2xvcnMgPSBbMHhGOUY3NTEsIDB4MzVDQTM3LCAweEFFMzRDOSwgMHgyRTVFQzksIDB4Q0EzNjYzXTtcbmV4cG9ydCBjb25zdCBiZ0NvbG9yID0gMHhmZmZkZjM7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCB7YmdDb2xvcn0gZnJvbSAnLi9IZWxwZXJzJztcblxuKCgpID0+IHtcblxuICBsZXQgdHlwZSA9IFwiV2ViR0xcIjtcblxuICBpZighUElYSS51dGlscy5pc1dlYkdMU3VwcG9ydGVkKCkpIHtcbiAgICAgIHR5cGUgPSBcImNhbnZhc1wiO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgc3RhZ2UgYW5kIHJlbmRlcmVyIGFuZCBhZGQgdG8gdGhlIERPTVxuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgbGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCwge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxfSk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGJnQ29sb3I7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgbGV0IGIgPSBuZXcgQnVtcChQSVhJKTtcbiAgbGV0IGcgPSBuZXcgR2FtZShzdGFnZSwgYik7XG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICB9XG5cbiAgcmVuZGVyKCk7XG59KSgpO1xuIl19
