const Util = require("./util");
const MovingObject = require("./moving_object");
const Submarine = require("./submarine");

const DEFAULTS = {
  DIM: 100,
  VELOCITY: [0, 0],
  PATH: 'assets/sprites/villain',
  RADIUS: 45,
  MAX_SPEED: 6
};

class Mine extends MovingObject {
  constructor(options = {}){
    const randVillain = Math.floor(Math.random() * 4);
    const randXVector = (-(Math.random() + 1) * DEFAULTS.MAX_SPEED);
    options.position = options.position || options.game.mineStartPosition();
    options.radius = DEFAULTS.RADIUS;
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.path = DEFAULTS.PATH + `${randVillain}.png`;
    options.velocity = options.velocity || [randXVector, 0];
    super(options);
  }

}

module.exports = Mine;
