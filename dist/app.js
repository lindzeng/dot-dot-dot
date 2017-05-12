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
    this.b = b;

    this.dots = [];
    this.walls = [];

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
      for (var i = 0; i < this.numDots; i++) {
        var d = this.dots[i].getGraphics()[0];

        for (var j = 0; j < this.walls.length; j++) {
          this.b.hit(d, this.walls[j].getGraphics(), true, true);
        }
        for (var _j = 0; _j < this.numDots; _j++) {
          if (i === _j) continue;
          this.b.hit(d, this.dots[_j].getGraphics()[0], true, true);
        }
        this.dots[i].step();
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9Eb3QuanMiLCJqcy9HYW1lLmpzIiwianMvSGVscGVycy5qcyIsImpzL1dhbGwuanMiLCJqcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQU0sRztBQUNKLGVBQVksS0FBWixFQUFtQixHQUFuQixFQUF3QixHQUF4QixFQUE2QjtBQUFBOztBQUMzQixTQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsR0FBZ0IsUUFBN0I7QUFDQSxTQUFLLEdBQUwsR0FBVyxNQUFNLEdBQU4sR0FBWSxLQUFLLE1BQUwsS0FBYyxFQUFkLEdBQWlCLEVBQXhDO0FBQ0EsUUFBSSxJQUFJLE1BQU0sR0FBTixHQUFZLENBQUMsS0FBSyxNQUFMLEtBQWdCLE9BQU8sVUFBeEIsRUFBb0MsS0FBSyxNQUFMLEtBQWdCLE9BQU8sV0FBM0QsQ0FBcEI7O0FBRUEsU0FBSyxDQUFMLEdBQVMsSUFBSSxLQUFLLFFBQVQsRUFBVDtBQUNBLFNBQUssQ0FBTCxDQUFPLFNBQVAsQ0FBaUIsS0FBSyxLQUF0QjtBQUNBLFNBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsS0FBSyxHQUE3QjtBQUNBLFNBQUssQ0FBTCxDQUFPLE9BQVA7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxDQUFQLEdBQVcsRUFBRSxDQUFGLENBQVg7QUFDQSxTQUFLLENBQUwsQ0FBTyxFQUFQLEdBQWEsS0FBSyxNQUFMLEtBQWdCLENBQWpCLEdBQXNCLENBQWxDO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixDQUFqQixHQUFzQixDQUFsQztBQUNBLFNBQUssQ0FBTCxDQUFPLFFBQVAsR0FBa0IsSUFBbEI7O0FBRUEsU0FB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LENBQXdCLE9BQU8sVUFBL0IsRUFBMkMsT0FBTyxXQUFsRCxFQUErRCxFQUFDLFdBQVcsSUFBWixFQUFrQixhQUFhLEtBQS9CLEVBQXNDLFlBQVksQ0FBbEQsRUFBL0QsQ0FBZjtBQUNBLGFBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQSxhQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLE9BQTlCO0FBQ0EsYUFBUyxVQUFULEdBQXNCLElBQXRCO0FBQ0EsYUFBUyxlQUFUO0FBQ0EsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUFTLElBQW5DOztBQUVBLFFBQUksSUFBSSxJQUFJLElBQUosQ0FBUyxJQUFULENBQVI7QUFDQSxRQUFJLElBQUksbUJBQVMsS0FBVCxFQUFnQixDQUFoQixDQUFSOztBQUVBLFFBQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLDhCQUFzQixNQUF0QjtBQUNBLFVBQUUsSUFBRjtBQUNBLGlCQUFTLE1BQVQsQ0FBZ0IsS0FBaEI7QUFDSCxLQUpEOztBQU1BO0FBQ0QsQ0EzQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgRG90IHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvcywgcmFkKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGMDAwMDtcbiAgICB0aGlzLnJhZCA9IHJhZCA/IHJhZCA6IE1hdGgucmFuZG9tKCkqMjArMTU7XG4gICAgbGV0IHAgPSBwb3MgPyBwb3MgOiBbTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoLCBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIHRoaXMuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5kLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLmQuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5kLmVuZEZpbGwoKTtcbiAgICB0aGlzLmQueCA9IHBbMF07XG4gICAgdGhpcy5kLnkgPSBwWzFdO1xuICAgIHRoaXMuZC52eCA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC52eSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmQsIHRoaXMub107XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHtiZ0NvbG9yLCBkb3RDb2xvcnMsIG51bURvdHN9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSxiKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSk7XG4gICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IFt3YWxsVG9wLCB3YWxsTGVmdCwgd2FsbEJvdHRvbSwgd2FsbFJpZ2h0XTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSB0aGlzLmRvdHNbaV0uZ2V0R3JhcGhpY3MoKVswXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLndhbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy53YWxsc1tqXS5nZXRHcmFwaGljcygpLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmIuaGl0KGQsIHRoaXMuZG90c1tqXS5nZXRHcmFwaGljcygpWzBdLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZG90c1tpXS5zdGVwKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJleHBvcnQgY29uc3QgbnVtRG90cyA9IDUwO1xuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcbiIsImNsYXNzIFdhbGwge1xuICBjb25zdHJ1Y3Rvcihjb2xvciwgcmVjdCwgcG9zKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGRkZGRjtcblxuICAgIHRoaXMud2FsbCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy53YWxsLmxpbmVTdHlsZSg0LCB0aGlzLmNvbG9yLCAxKTtcbiAgICB0aGlzLndhbGwuZHJhd1JlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgdGhpcy53YWxsLmVuZEZpbGwoKTtcbiAgICB0aGlzLndhbGwueCA9cG9zWzBdO1xuICAgIHRoaXMud2FsbC55ID0gcG9zWzFdO1xuXG4gIH1cblxuICBzdGVwKCkge1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGw7XG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgYiA9IG5ldyBCdW1wKFBJWEkpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBiKTtcblxuICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgICBnLnN0ZXAoKTtcbiAgICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG4gIH1cblxuICByZW5kZXIoKTtcbn0pKCk7XG4iXX0=
