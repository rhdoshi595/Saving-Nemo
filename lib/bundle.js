/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(10);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	
	  var gameView = new GameView(ctx);
	
	  var manifest = [{ src: "sprites/nemo0.png", id: "nemo0" }, { src: "sprites/nemo1.png", id: "nemo1" }, { src: "sprites/nemo3.png", id: "nemo3" }, { src: "sprites/nemo4.png", id: "nemo4" }, { src: "images/undersea.jpg", id: "background" }];
	
	  var loadGame = function loadGame() {
	    gameView.load();
	  };
	
	  var loader = new createjs.LoadQueue(false);
	  loader.addEventListener("complete", loadGame);
	  loader.loadManifest(manifest, true, "./assets/");
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mine = __webpack_require__(2);
	var Submarine = __webpack_require__(7);
	var Util = __webpack_require__(3);
	var Background = __webpack_require__(9);
	var Gun = __webpack_require__(8);
	var PickUp = __webpack_require__(4);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.mines = [];
	    this.guns = [];
	    this.pickups = [];
	    // this.addMines();
	    this.refreshObjects();
	    this.playing = false;
	    this.lost = false;
	    this.points = 0;
	  }
	
	  _createClass(Game, [{
	    key: 'displayPoints',
	    value: function displayPoints() {
	      $('.points').text(this.points);
	      $('.highscore').text('Highscore: 0');
	      this.points += 5;
	    }
	  }, {
	    key: 'add',
	    value: function add(object) {
	      if (object instanceof Mine) {
	        this.mines.push(object);
	      } else if (object instanceof Submarine) {
	        this.submarine = object;
	      } else if (object instanceof Background) {
	        this.background = object;
	      } else if (object instanceof Gun) {
	        this.guns.push(object);
	      } else if (object instanceof PickUp) {
	        this.pickups.push(object);
	      } else {
	        throw "SQUID!!";
	      }
	    }
	  }, {
	    key: 'addBackground',
	    value: function addBackground() {
	      var background = new Background();
	      this.add(background);
	    }
	  }, {
	    key: 'addMineInterval',
	    value: function addMineInterval() {
	      var _this = this;
	
	      return window.setInterval(function () {
	        if (_this.playing) {
	          _this.add(new Mine({ game: _this }));
	          var minesAndGuns = [].concat(_this.mines, _this.guns);
	          var oldies = Util.oldObjects(_this, minesAndGuns);
	          oldies.forEach(function (obj) {
	            _this.remove(obj);
	          });
	        }
	      }, 750);
	    }
	  }, {
	    key: 'addPickUpInterval',
	    value: function addPickUpInterval() {
	      var _this2 = this;
	
	      return window.setInterval(function () {
	        if (_this2.playing) {
	          _this2.add(new PickUp({ game: _this2 }));
	          var oldies = Util.oldObjects(_this2, _this2.pickups);
	          oldies.forEach(function (oldObj) {
	            game.remove(oldObj);
	          });
	        }
	      }, 10000);
	    }
	  }, {
	    key: 'refreshObjects',
	    value: function refreshObjects() {
	      this.add(new Mine({ game: this }));
	      this.mineInterval = this.addMineInterval();
	      this.pickUpInterval = this.addPickUpInterval();
	      console.log(this.mineInterval, this.pickUpInterval);
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      return [].concat([this.background], [this.submarine], this.pickups, this.mines, this.guns);
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      if (this.playing) {
	        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	        this.allObjects().forEach(function (object) {
	          object.draw(ctx);
	        });
	      }
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.allObjects().forEach(function (object) {
	        object.move();
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var mines = this.mines;
	      for (var i = 0; i < mines.length; i += 1) {
	        if (Util.isCrash(this.submarine, mines[i])) {
	          return true;
	        }
	      }
	      Util.checkGunHit(this);
	      Util.checkPickUp(this);
	      return false;
	    }
	  }, {
	    key: 'checkOutOfBounds',
	    value: function checkOutOfBounds(object) {
	      var xPos = object.position[0];
	      var yPos = object.position[1];
	      if (object instanceof Submarine) {
	        return yPos < 0 || yPos > 400;
	      } else if (object instanceof Mine || object instanceof PickUp) {
	        return xPos < 0;
	      } else if (object instanceof Gun) {
	        return xPos > 900;
	      }
	    }
	  }, {
	    key: 'checkCrash',
	    value: function checkCrash() {
	      if (this.checkCollisions() || this.checkOutOfBounds(this.submarine)) {
	        this.lost = true;
	        console.log(this.mineInterval, this.pickUpInterval);
	        window.clearInterval(this.mineInterval);
	        window.clearInterval(this.pickUpInterval);
	        window.clearInterval(this.submarine.gravityInterval);
	        window.clearInterval(this.submarine.accelerateInterval);
	        this.renderLost();
	      }
	    }
	  }, {
	    key: 'renderLost',
	    value: function renderLost() {
	      this.removeAll();
	      var $gameModal = $('.game-modal');
	      $gameModal.removeClass('hidden');
	      $gameModal.text('Better Luck Next Time. Press "Space" to play again?');
	      this.playing = false;
	    }
	  }, {
	    key: 'addSubmarine',
	    value: function addSubmarine() {
	      var submarine = new Submarine({
	        position: this.submarineStartPosition(),
	        game: this
	      });
	      this.add(submarine);
	      return submarine;
	    }
	  }, {
	    key: 'submarineStartPosition',
	    value: function submarineStartPosition() {
	      return [225, Game.DIM_Y / 2];
	    }
	  }, {
	    key: 'mineStartPosition',
	    value: function mineStartPosition() {
	      return [Game.DIM_X, Game.DIM_Y * Math.random()];
	    }
	  }, {
	    key: 'remove',
	    value: function remove(object) {
	      if (object instanceof Mine) {
	        this.mines.splice(this.mines.indexOf(object), 1);
	      } else if (object instanceof Submarine) {
	        this.submarine = undefined;
	      } else if (object instanceof Gun) {
	        this.guns.splice(this.guns.indexOf(object), 1);
	      } else if (object instanceof PickUp) {
	        this.pickups.splice(this.pickups.indexOf(object), 1);
	      } else {
	        throw "AHHH!";
	      }
	    }
	  }, {
	    key: 'removeAll',
	    value: function removeAll() {
	      this.mines = [];
	      this.guns = [];
	      this.pickups = [];
	      this.submarine = undefined;
	      this.background = undefined;
	    }
	  }, {
	    key: 'step',
	    value: function step(change) {
	      if (this.playing) {
	        this.moveObjects();
	        this.checkCrash();
	        this.displayPoints();
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.DIM_X = 900;
	Game.DIM_Y = 400;
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(5);
	var Submarine = __webpack_require__(7);
	
	var DEFAULTS = {
	  DIM: 100,
	  VELOCITY: [0, 0],
	  PATH: 'assets/sprites/villain',
	  RADIUS: 45,
	  MAX_SPEED: 6
	};
	
	var Mine = function (_MovingObject) {
	  _inherits(Mine, _MovingObject);
	
	  function Mine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Mine);
	
	    var randVillain = Math.floor(Math.random() * 4);
	    var randXVector = -(Math.random() + 1) * DEFAULTS.MAX_SPEED;
	    options.position = options.position || options.game.mineStartPosition();
	    options.radius = DEFAULTS.RADIUS;
	    options.xDim = DEFAULTS.DIM;
	    options.yDim = DEFAULTS.DIM;
	    options.path = DEFAULTS.PATH + (randVillain + ".png");
	    options.velocity = options.velocity || [randXVector, 0];
	    return _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).call(this, options));
	  }
	
	  return Mine;
	}(MovingObject);
	
	module.exports = Mine;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Mine = __webpack_require__(2);
	var PickUp = __webpack_require__(4);
	
	var Util = {
	  distanceBetween: function distanceBetween(obj1, obj2) {
	    var changeInX = Math.pow(obj1.position[0] - obj2.position[0], 2);
	    var changeInY = Math.pow(obj1.position[1] - obj2.position[1], 2);
	    return Math.sqrt(changeInX + changeInY);
	  },
	  randomVector: function randomVector(length) {
	    var xVector = -(Math.random() + 1) * length;
	    return [xVector, 0];
	  },
	  createImage: function createImage(imgPath) {
	    var image = new Image();
	    image.src = imgPath;
	    return image;
	  },
	  isCrash: function isCrash(obj1, obj2) {
	    var distanceBetween = this.distanceBetween(obj1, obj2);
	    var minDistanceBetween = obj1.radius + obj2.radius;
	    return distanceBetween < minDistanceBetween;
	  },
	  checkGunHit: function checkGunHit(game) {
	    for (var i = 0; i < game.guns.length; i++) {
	      for (var j = 0; j < game.mines.length; j++) {
	        if (this.isCrash(game.guns[i], game.mines[j])) {
	          game.remove(game.mines[j]);
	        }
	      }
	    }
	  },
	  checkPickUp: function checkPickUp(game) {
	    for (var i = 0; i < game.pickups.length; i++) {
	      if (this.isCrash(game.submarine, game.pickups[i])) {
	        game.pickups[i].applyPickUp(game);
	        game.remove(game.pickups[i]);
	      }
	    }
	  },
	  calcNemoNum: function calcNemoNum(velocity) {
	    if (velocity <= 0 && velocity > -2.5) {
	      return 3;
	    } else if (velocity <= -2.5) {
	      return 4;
	    } else if (velocity > 2.5) {
	      return 0;
	    } else {
	      return 1;
	    }
	  },
	  oldObjects: function oldObjects(game, objects) {
	    var oldies = [];
	    for (var i = 0; i < objects.length; i++) {
	      if (game.checkOutOfBounds(objects[i])) {
	        oldies.push(objects[i]);
	      }
	    }
	    return oldies;
	  },
	  addMineInterval: function addMineInterval(game) {
	    var _this = this;
	
	    return window.setInterval(function () {
	      if (game.playing) {
	        game.add(new Mine({ game: game }));
	        var minesAndGuns = [].concat(game.mines, game.guns);
	        var oldies = _this.oldObjects(game, minesAndGuns);
	        oldies.forEach(function (obj) {
	          game.remove(obj);
	        });
	      }
	    }, 750);
	  },
	  addPickUpInterval: function addPickUpInterval(game) {
	    var _this2 = this;
	
	    return window.setInterval(function () {
	      if (game.playing) {
	        game.add(new PickUp({ game: game }));
	        var oldies = _this2.oldObjects(game, game.pickups);
	        oldies.forEach(function (oldObj) {
	          game.remove(oldObj);
	        });
	      }
	    }, 10000);
	  }
	};
	
	module.exports = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(5);
	
	var DEFAULTS = {
	  DIM: 50,
	  RADIUS: 20,
	  SPEED: -10,
	  PATH: 'assets/sprites/treasure'
	};
	
	var PickUp = function (_MovingObject) {
	  _inherits(PickUp, _MovingObject);
	
	  function PickUp() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, PickUp);
	
	    var randomPickUp = Math.floor(Math.random() * 2);
	    options.position = options.position || options.game.mineStartPosition();
	    options.radius = DEFAULTS.RADIUS;
	    options.xDim = DEFAULTS.DIM;
	    options.yDim = DEFAULTS.DIM;
	    options.path = DEFAULTS.PATH + '.png';
	    options.velocity = [DEFAULTS.SPEED, 0];
	
	    var _this = _possibleConstructorReturn(this, (PickUp.__proto__ || Object.getPrototypeOf(PickUp)).call(this, options));
	
	    _this.pickUpNum = randomPickUp;
	    return _this;
	  }
	
	  _createClass(PickUp, [{
	    key: 'applyPickUp',
	    value: function applyPickUp(game) {
	      if (this.pickUpNum === 0) {
	        game.submarine.guns += 1;
	      } else {
	        window.setTimeout(function () {
	          game.mines = [];
	        }, 100);
	      }
	    }
	  }]);
	
	  return PickUp;
	}(MovingObject);
	
	module.exports = PickUp;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(3);
	var Sprite = __webpack_require__(6);
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.position = options.position;
	    this.velocity = options.velocity;
	    this.radius = options.radius;
	    this.xDim = options.xDim;
	    this.yDim = options.yDim;
	    this.path = options.path;
	    this.game = options.game;
	    this.imageOffsetY = options.imageOffsetY;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      var image = Sprite.createImage(this.path);
	      var imageOffsetX = this.position[0] - this.xDim / 2;
	      var imageOffsetY = this.imageOffsetY || this.position[1] - this.yDim / 2;
	      ctx.drawImage(image, imageOffsetX, imageOffsetY, this.xDim, this.yDim);
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.position[0] += this.velocity[0];
	      this.position[1] += this.velocity[1];
	
	      // const timePassed = time / (1000/60);
	      // const changeInX = this.velocity[0] * timePassed;
	      // const changeInY = this.velocity[1] * timePassed;
	      // this.position = [this.position[0] + changeInX, this.position[1] + changeInY];
	    }
	
	    // isCollision(foreignObject){
	    //   // const dX = Math.pow(this.position[0] - foreignObject.position[0], 2);
	    //   // const dY = Math.pow(this.position[1] - foreignObject.position[1], 2);
	    //   // const distance = Math.sqrt(dX + dY);
	    //   const distance = Util.distanceBetween(this, foreignObject);
	    //   const minDistance = (this.radius + foreignObject.radius);
	    //   return (distance < minDistance);
	    // }
	
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.game.remove(this);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	module.exports = MovingObject;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	var Sprite = {
	  createImage: function createImage(imgPath) {
	    var image = new Image();
	    image.src = imgPath;
	    return image;
	  }
	};
	
	module.exports = Sprite;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(5);
	var Gun = __webpack_require__(8);
	
	var DEFAULTS = {
	  DIM: 75,
	  RADIUS: 30,
	  VELOCITY: [0, 0],
	  TERMINAL_VELOCITY: 6,
	  ACC_RATE: -0.5,
	  GUN_VELOCITY: [10, 0],
	  PATH: 'assets/sprites/nemo'
	};
	
	var Submarine = function (_MovingObject) {
	  _inherits(Submarine, _MovingObject);
	
	  function Submarine() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Submarine);
	
	    options.xDim = DEFAULTS.DIM;
	    options.yDim = DEFAULTS.DIM;
	    options.radius = DEFAULTS.RADIUS;
	    options.velocity = options.velocity || DEFAULTS.VELOCITY;
	    var nemoNum = Util.calcNemoNum(options.velocity[1]);
	    options.path = DEFAULTS.PATH + (nemoNum + '.png');
	
	    var _this = _possibleConstructorReturn(this, (Submarine.__proto__ || Object.getPrototypeOf(Submarine)).call(this, options));
	
	    _this.acc = false;
	    _this.rot = 0;
	    _this.guns = 1;
	    _this.gravityInterval = window.setInterval(_this.gravity.bind(_this), 50);
	    _this.accelerateInterval = window.setInterval(_this.accelerate.bind(_this));
	    return _this;
	  }
	
	  _createClass(Submarine, [{
	    key: 'accelerate',
	    value: function accelerate() {
	      if (this.acc && this.velocity[1] > -DEFAULTS.TERMINAL_VELOCITY) {
	        this.velocity[1] += DEFAULTS.ACC_RATE;
	        var nemoNum = Util.calcNemoNum(this.velocity[1]);
	        this.path = DEFAULTS.PATH + (nemoNum + '.png');
	      }
	    }
	  }, {
	    key: 'gravity',
	    value: function gravity() {
	      if (this.velocity[1] < DEFAULTS.TERMINAL_VELOCITY) {
	        this.velocity[1] += 1.5;
	        var nemoNum = Util.calcNemoNum(this.velocity[1]);
	        this.path = DEFAULTS.PATH + (nemoNum + '.png');
	      }
	    }
	  }, {
	    key: 'isCollision',
	    value: function isCollision(foreignObject) {
	      var distanceBetween = Util.distanceBetween(this, foreignObject);
	      var minimumDistanceBetween = this.radius + foreignObject.radius;
	      return distanceBetween < minimumDistanceBetween;
	    }
	  }, {
	    key: 'shoot',
	    value: function shoot() {
	      if (this.guns > 0) {
	        this.guns -= 1;
	        var gun = new Gun({
	          position: this.position.slice(),
	          velocity: DEFAULTS.GUN_VELOCITY,
	          color: 'red',
	          game: this.game
	        });
	        this.game.add(gun);
	        return;
	      } else {
	        console.log('no ammo!');
	        return;
	      }
	    }
	  }]);
	
	  return Submarine;
	}(MovingObject);
	
	module.exports = Submarine;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MovingObject = __webpack_require__(5);
	
	var GUN = {
	  RADIUS: 5,
	  X_DIM: 40,
	  Y_DIM: 20,
	  PATH: 'assets/sprites/shell.png'
	};
	
	var Gun = function (_MovingObject) {
	  _inherits(Gun, _MovingObject);
	
	  function Gun(options) {
	    _classCallCheck(this, Gun);
	
	    options.radius = GUN.RADIUS;
	    options.path = GUN.PATH;
	    options.xDim = GUN.X_DIM;
	    options.yDim = GUN.Y_DIM;
	    return _possibleConstructorReturn(this, (Gun.__proto__ || Object.getPrototypeOf(Gun)).call(this, options));
	  }
	
	  return Gun;
	}(MovingObject);
	
	module.exports = Gun;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = __webpack_require__(3);
	
	var DEFAULTS = {
	  POS_X: 0,
	  POS_Y: 0,
	  WIDTH: 1900,
	  HEIGHT: 400,
	  PATH: 'assets/images/undersea.jpg',
	  SPEED: -1
	};
	
	var Background = function () {
	  function Background() {
	    _classCallCheck(this, Background);
	
	    this.posX = DEFAULTS.POS_X;
	    this.posY = DEFAULTS.POS_Y;
	    this.width = DEFAULTS.WIDTH;
	    this.height = DEFAULTS.HEIGHT;
	    this.speed = DEFAULTS.SPEED;
	    this.path = DEFAULTS.PATH;
	  }
	
	  _createClass(Background, [{
	    key: "draw",
	    value: function draw(ctx) {
	      if (this.posX < -1000) {
	        this.posX = 0;
	      }
	      var image = new Image();
	      image.src = this.path;
	      ctx.drawImage(image, this.posX, this.posY, this.width, this.height);
	      this.move();
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.posX = this.speed;
	    }
	  }]);
	
	  return Background;
	}();
	
	module.exports = Background;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = __webpack_require__(1);
	
	var GameView = function () {
	  function GameView(ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	  }
	
	  _createClass(GameView, [{
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      $(window).on('keydown', function (event) {
	        this.handleKeyEvent(event);
	      }.bind(this));
	
	      $(window).on('keyup', function (event) {
	        this.handleKeyRel(event);
	      }.bind(this));
	
	      $('.about').on('click', function (event) {
	        this.handleOpenModal(event);
	      }.bind(this));
	
	      $('.start').on('click', function (event) {
	        var _this = this;
	
	        this.handleCloseModal(event);
	        var count = 3;
	        this.counter = setInterval(function () {
	          _this.timer(count);
	          count--;
	        }, 1000);
	        window.setTimeout(function () {
	          _this.start();
	        }, 4000);
	      }.bind(this));
	    }
	  }, {
	    key: 'timer',
	    value: function timer(count) {
	      var timer = $('.timer');
	      if (count === 0) {
	        timer.addClass('hidden');
	        clearInterval(this.counter);
	        return;
	      }
	      timer.removeClass('hidden');
	      timer.text(count);
	    }
	  }, {
	    key: 'unbindKeyHandlers',
	    value: function unbindKeyHandlers() {
	      $(window).off('keydown', function (event) {
	        this.handleKeyEvent(event);
	      }.bind(this));
	
	      $(window).off('keyup', function (event) {
	        this.handleKeyRel(event);
	      }.bind(this));
	    }
	  }, {
	    key: 'handleCloseModal',
	    value: function handleCloseModal(event) {
	      $('.modal').addClass('hidden');
	    }
	  }, {
	    key: 'handleOpenModal',
	    value: function handleOpenModal(event) {
	      $('.modal').removeClass('hidden');
	    }
	  }, {
	    key: 'handleKeyEvent',
	    value: function handleKeyEvent(event) {
	      var _this2 = this;
	
	      if (event.keyCode === 32 && this.newGame) {
	        (function () {
	          _this2.newGame = false;
	          _this2.handleCloseModal(event);
	          var count = 3;
	          _this2.counter = setInterval(function () {
	            _this2.timer(count);
	            count -= 1;
	          }, 1000);
	          window.setTimeout(function () {
	            _this2.start();
	          }, 4000);
	        })();
	      } else if (event.keyCode === 32) {
	        this.submarine.acc = true;
	        this.submarine.rot = 150 * (Math.PI / 180);
	      } else if (event.keyCode === 13) {
	        this.submarine.shoot();
	      }
	    }
	  }, {
	    key: 'handleKeyRel',
	    value: function handleKeyRel(event) {
	      if (event.keyCode === 32) {
	        this.submarine.acc = false;
	        this.submarine.rot = 210 * (Math.PI / 180);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this3 = this;
	
	      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      this.game = null;
	      this.game = new Game();
	      this.submarine = this.game.addSubmarine();
	      this.background = this.game.addBackground();
	      this.prevTime = 0;
	      this.game.playing = true;
	      this.intervalId = window.setInterval(function () {
	        _this3.animate();
	      }, 20);
	    }
	  }, {
	    key: 'displayAmmoCount',
	    value: function displayAmmoCount() {
	      if (this.game.submarine) {
	        $('.guns').text('Shells: ' + this.game.submarine.guns);
	      }
	    }
	  }, {
	    key: 'displayPoints',
	    value: function displayPoints() {
	      $('.points').text(this.game.points);
	      $('.highscore').text('Highscore: ' + localStorage.getItem('highScore'));
	      this.game.points += 5;
	    }
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      if (this.game.playing) {
	        this.game.step();
	        this.displayPoints();
	        this.displayAmmoCount();
	        this.game.draw(this.ctx);
	      } else {
	        this.newGame = true;
	        var isNewHighScore = this.game.points > localStorage.getItem('highScore');
	        if (!localStorage.getItem('highScore') || isNewHighScore) {
	          localStorage.setItem('highScore', this.game.points);
	        }
	        $('.highscore').text('Highscore: ' + localStorage.getItem('highScore'));
	        window.clearInterval(this.intervalId);
	      }
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      this.ctx.beginPath();
	      this.ctx.rect(0, 0, Game.DIM_X, Game.DIM_Y);
	      this.ctx.fillStyle = 'black';
	      this.ctx.fill();
	      this.bindKeyHandlers();
	    }
	  }]);
	
	  return GameView;
	}();
	
	module.exports = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map