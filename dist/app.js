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

},{"./Dot":1,"./Helpers":3,"./Wall":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var numDots = exports.numDots = 50;
var dotColors = exports.dotColors = [0xF9F751, 0x35CA37, 0xAE34C9, 0x2E5EC9, 0xCA3663];
var bgColor = exports.bgColor = 0xfffdf3;

},{}],4:[function(require,module,exports){
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
    }, 2000, 'linear', function () {
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

var _StartMessage = require('./StartMessage');

var _StartMessage2 = _interopRequireDefault(_StartMessage);

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

    var displayStart = true;

    var startGame = function startGame() {
        console.log('begin game!');
    };
    var start = new _StartMessage2.default(startGame.bind(undefined));

    // let i = new Interface()

    var render = function render() {
        requestAnimationFrame(render);
        g.step();
        renderer.render(stage);
        if (!displayStart) {}
    };

    render();
})();

},{"./Game":2,"./Helpers":3,"./StartMessage":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92NS4wLjAvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvRG90LmpzIiwianMvR2FtZS5qcyIsImpzL0hlbHBlcnMuanMiLCJqcy9TdGFydE1lc3NhZ2UuanMiLCJqcy9XYWxsLmpzIiwianMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLEc7QUFDSixlQUFZLEtBQVosRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkI7QUFBQTs7QUFDM0IsU0FBSyxLQUFMLEdBQWEsUUFBUSxLQUFSLEdBQWdCLFFBQTdCO0FBQ0EsU0FBSyxHQUFMLEdBQVcsTUFBTSxHQUFOLEdBQVksS0FBSyxNQUFMLEtBQWMsRUFBZCxHQUFpQixFQUF4QztBQUNBLFFBQUksSUFBSSxNQUFNLEdBQU4sR0FBWSxDQUFDLEtBQUssTUFBTCxLQUFnQixPQUFPLFVBQXhCLEVBQW9DLEtBQUssTUFBTCxLQUFnQixPQUFPLFdBQTNELENBQXBCOztBQUVBLFNBQUssQ0FBTCxHQUFTLElBQUksS0FBSyxRQUFULEVBQVQ7QUFDQSxTQUFLLENBQUwsQ0FBTyxTQUFQLENBQWlCLEtBQUssS0FBdEI7QUFDQSxTQUFLLENBQUwsQ0FBTyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLEtBQUssR0FBN0I7QUFDQSxTQUFLLENBQUwsQ0FBTyxPQUFQO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sQ0FBUCxHQUFXLEVBQUUsQ0FBRixDQUFYO0FBQ0EsU0FBSyxDQUFMLENBQU8sRUFBUCxHQUFhLEtBQUssTUFBTCxLQUFnQixDQUFqQixHQUFzQixDQUFsQztBQUNBLFNBQUssQ0FBTCxDQUFPLEVBQVAsR0FBYSxLQUFLLE1BQUwsS0FBZ0IsQ0FBakIsR0FB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LFlBQVksQ0FBbEQsRUFBL0QsQ0FBZjtBQUNBLGFBQVMsSUFBVCxDQUFjLEtBQWQsQ0FBb0IsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQSxhQUFTLElBQVQsQ0FBYyxLQUFkLENBQW9CLE9BQXBCLEdBQThCLE9BQTlCO0FBQ0EsYUFBUyxVQUFULEdBQXNCLElBQXRCO0FBQ0EsYUFBUyxlQUFUO0FBQ0EsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUFTLElBQW5DOztBQUVBLFFBQUksSUFBSSxJQUFJLElBQUosQ0FBUyxJQUFULENBQVI7QUFDQSxRQUFJLElBQUksbUJBQVMsS0FBVCxFQUFnQixDQUFoQixDQUFSOztBQUVBLFFBQUksZUFBZSxJQUFuQjs7QUFFQSxRQUFJLFlBQVksU0FBWixTQUFZLEdBQU07QUFDcEIsZ0JBQVEsR0FBUixDQUFZLGFBQVo7QUFDRCxLQUZEO0FBR0EsUUFBSSxRQUFRLDJCQUFpQixVQUFVLElBQVYsV0FBakIsQ0FBWjs7QUFFQTs7QUFFQSxRQUFJLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDZiw4QkFBc0IsTUFBdEI7QUFDQSxVQUFFLElBQUY7QUFDQSxpQkFBUyxNQUFULENBQWdCLEtBQWhCO0FBQ0EsWUFBSSxDQUFDLFlBQUwsRUFBbUIsQ0FDbEI7QUFDSixLQU5EOztBQVFBO0FBQ0QsQ0F0Q0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgRG90IHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHBvcywgcmFkKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiAweEZGMDAwMDtcbiAgICB0aGlzLnJhZCA9IHJhZCA/IHJhZCA6IE1hdGgucmFuZG9tKCkqMjArMTU7XG4gICAgbGV0IHAgPSBwb3MgPyBwb3MgOiBbTWF0aC5yYW5kb20oKSAqIHdpbmRvdy5pbm5lcldpZHRoLCBNYXRoLnJhbmRvbSgpICogd2luZG93LmlubmVySGVpZ2h0XTtcblxuICAgIHRoaXMuZCA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgdGhpcy5kLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcbiAgICB0aGlzLmQuZHJhd0NpcmNsZSgwLCAwLCB0aGlzLnJhZCk7XG4gICAgdGhpcy5kLmVuZEZpbGwoKTtcbiAgICB0aGlzLmQueCA9IHBbMF07XG4gICAgdGhpcy5kLnkgPSBwWzFdO1xuICAgIHRoaXMuZC52eCA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC52eSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxO1xuICAgIHRoaXMuZC5jaXJjdWxhciA9IHRydWU7XG5cbiAgICB0aGlzLm8gPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMuby5saW5lU3R5bGUoLjUsIDB4MDAwMDAwKTsgIC8vICh0aGlja25lc3MsIGNvbG9yKVxuICAgIHRoaXMuby5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMucmFkKTtcbiAgICB0aGlzLm8uZW5kRmlsbCgpO1xuICAgIHRoaXMuby54ID0gcFswXSAtIHRoaXMuZC52eCoyO1xuICAgIHRoaXMuby55ID0gcFsxXSAtIHRoaXMuZC52eSoyO1xuICAgIHRoaXMuby5jaXJjdWxhciA9IHRydWU7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHRoaXMuZC54ICs9IHRoaXMuZC52eDtcbiAgICB0aGlzLmQueSArPSB0aGlzLmQudnk7XG5cbiAgICB0aGlzLm8ueCA9IHRoaXMuZC54IC0gdGhpcy5kLnZ4KjI7XG4gICAgdGhpcy5vLnkgPSB0aGlzLmQueSAtIHRoaXMuZC52eSoyO1xuICB9XG5cbiAgZ2V0R3JhcGhpY3MoKSB7XG4gICAgcmV0dXJuIFt0aGlzLmQsIHRoaXMub107XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3Q7XG4iLCJpbXBvcnQgRG90IGZyb20gJy4vRG90J1xuaW1wb3J0IFdhbGwgZnJvbSAnLi9XYWxsJ1xuaW1wb3J0IHtiZ0NvbG9yLCBkb3RDb2xvcnMsIG51bURvdHN9IGZyb20gJy4vSGVscGVycyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihzdGFnZSxiKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuYiA9IGI7XG5cbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLndhbGxzID0gW107XG5cbiAgICB0aGlzLm51bURvdHMgPSBudW1Eb3RzO1xuICAgIHRoaXMuZG90Q29sb3JzID0gZG90Q29sb3JzO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZW5ndGhSZW1haW5pbmcgPSAxMDA7XG5cbiAgICB0aGlzLmluaXRXYWxscygpO1xuICAgIHRoaXMuaW5pdERvdHMoKTtcbiAgfVxuXG4gIGluaXREb3RzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Eb3RzOyBpKyspIHtcbiAgICAgIGxldCBkID0gbmV3IERvdCh0aGlzLmRvdENvbG9yc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRvdENvbG9ycy5sZW5ndGgpXSk7XG4gICAgICB0aGlzLmRvdHMucHVzaChkKTtcbiAgICAgIGQuZ2V0R3JhcGhpY3MoKS5mb3JFYWNoKGUgPT4gdGhpcy5zdGFnZS5hZGRDaGlsZChlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFdhbGxzKCkge1xuICAgIGxldCB3YWxsQ29sb3IgPSBiZ0NvbG9yO1xuXG4gICAgbGV0IHdhbGxUb3AgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCAwXSk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh3YWxsVG9wLmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxMZWZ0ID0gbmV3IFdhbGwod2FsbENvbG9yLCBbMCwgMCwgMSwgd2luZG93LmlubmVySGVpZ2h0XSwgWzAsIDBdKTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHdhbGxMZWZ0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgbGV0IHdhbGxCb3R0b20gPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCB3aW5kb3cuaW5uZXJXaWR0aCwgMV0sIFswLCB3aW5kb3cuaW5uZXJIZWlnaHQtMV0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbEJvdHRvbS5nZXRHcmFwaGljcygpKTtcblxuICAgIGxldCB3YWxsUmlnaHQgPSBuZXcgV2FsbCh3YWxsQ29sb3IsIFswLCAwLCAxLCB3aW5kb3cuaW5uZXJIZWlnaHRdLCBbd2luZG93LmlubmVyV2lkdGgtMSwgMF0pO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQod2FsbFJpZ2h0LmdldEdyYXBoaWNzKCkpO1xuXG4gICAgdGhpcy53YWxscyA9IFt3YWxsVG9wLCB3YWxsTGVmdCwgd2FsbEJvdHRvbSwgd2FsbFJpZ2h0XTtcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bURvdHM7IGkrKykge1xuICAgICAgbGV0IGQgPSB0aGlzLmRvdHNbaV0uZ2V0R3JhcGhpY3MoKVswXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLndhbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRoaXMuYi5oaXQoZCwgdGhpcy53YWxsc1tqXS5nZXRHcmFwaGljcygpLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1Eb3RzOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IGopIGNvbnRpbnVlO1xuICAgICAgICB0aGlzLmIuaGl0KGQsIHRoaXMuZG90c1tqXS5nZXRHcmFwaGljcygpWzBdLCB0cnVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZG90c1tpXS5zdGVwKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJleHBvcnQgY29uc3QgbnVtRG90cyA9IDUwO1xuZXhwb3J0IGNvbnN0IGRvdENvbG9ycyA9IFsweEY5Rjc1MSwgMHgzNUNBMzcsIDB4QUUzNEM5LCAweDJFNUVDOSwgMHhDQTM2NjNdO1xuZXhwb3J0IGNvbnN0IGJnQ29sb3IgPSAweGZmZmRmMztcbiIsImNsYXNzIFN0YXJ0TWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKGNiKSB7XG4gICAgLy8gdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICQoJyNidXR0b25EaXYnKS5tb3VzZWVudGVyKGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnIzViNWI1YicpO1xuICAgIH0pXG5cbiAgICAkKCcjYnV0dG9uRGl2JykubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyM0RDRENEQnKTtcbiAgICB9KVxuXG4gICAgJCgnI2J1dHRvbkRpdicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI3N0YXJ0Q29udGFpbmVyJykuYW5pbWF0ZSh7XG4gICAgICAgIHRvcDogLTUzMFxuICAgICAgfSwgMTAwMCwgJ2xpbmVhcicpO1xuXG4gICAgICAkKCcjc2hhZGUnKS5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMFxuICAgICAgfSwgMjAwMCwgJ2xpbmVhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAkKCcjc3RhcnRDb250YWluZXInKS5jc3Moe2xlZnQ6IHdpZHRoLzItMzAwLCB0b3A6IC01MzB9KTtcblxuICAgICQoJyNzdGFydENvbnRhaW5lcicpLmFuaW1hdGUoe1xuICAgICAgdG9wOiBoZWlnaHQvMi0yNjVcbiAgICB9LCA0MDAwLCAnZWFzZU91dEVsYXN0aWMnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFydE1lc3NhZ2U7XG4iLCJjbGFzcyBXYWxsIHtcbiAgY29uc3RydWN0b3IoY29sb3IsIHJlY3QsIHBvcykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvciA/IGNvbG9yIDogMHhGRkZGRkY7XG5cbiAgICB0aGlzLndhbGwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuICAgIHRoaXMud2FsbC5saW5lU3R5bGUoNCwgdGhpcy5jb2xvciwgMSk7XG4gICAgdGhpcy53YWxsLmRyYXdSZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgIHRoaXMud2FsbC5lbmRGaWxsKCk7XG4gICAgdGhpcy53YWxsLnggPXBvc1swXTtcbiAgICB0aGlzLndhbGwueSA9IHBvc1sxXTtcblxuICB9XG5cbiAgc3RlcCgpIHtcbiAgfVxuXG4gIGdldEdyYXBoaWNzKCkge1xuICAgIHJldHVybiB0aGlzLndhbGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcbmltcG9ydCBTdGFydE1lc3NhZ2UgZnJvbSAnLi9TdGFydE1lc3NhZ2UnO1xuaW1wb3J0IHtiZ0NvbG9yfSBmcm9tICcuL0hlbHBlcnMnO1xuXG4oKCkgPT4ge1xuXG4gIGxldCB0eXBlID0gXCJXZWJHTFwiO1xuXG4gIGlmKCFQSVhJLnV0aWxzLmlzV2ViR0xTdXBwb3J0ZWQoKSkge1xuICAgICAgdHlwZSA9IFwiY2FudmFzXCI7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBzdGFnZSBhbmQgcmVuZGVyZXIgYW5kIGFkZCB0byB0aGUgRE9NXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBsZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDF9KTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICBsZXQgYiA9IG5ldyBCdW1wKFBJWEkpO1xuICBsZXQgZyA9IG5ldyBHYW1lKHN0YWdlLCBiKTtcblxuICBsZXQgZGlzcGxheVN0YXJ0ID0gdHJ1ZTtcblxuICBsZXQgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdiZWdpbiBnYW1lIScpO1xuICB9XG4gIGxldCBzdGFydCA9IG5ldyBTdGFydE1lc3NhZ2Uoc3RhcnRHYW1lLmJpbmQodGhpcykpO1xuXG4gIC8vIGxldCBpID0gbmV3IEludGVyZmFjZSgpXG5cbiAgbGV0IHJlbmRlciA9ICgpID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgZy5zdGVwKCk7XG4gICAgICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xuICAgICAgaWYgKCFkaXNwbGF5U3RhcnQpIHtcbiAgICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpO1xufSkoKTtcbiJdfQ==
