const Util = require("./util");
const MovingObject = require("./moving_object");
const Submarine = require("./submarine");

const DEFAULTS = {
  DIM: 100,
  VELOCITY: [0, 0],
  RADIUS: 45,
  MAX_SPEED: 6,
  MIN_SPEED: 1
};

class Mine extends MovingObject {
  constructor(options = {}){
    const randVillain = Math.floor(Math.random() * 4);
    const randXVector = (-(Math.random() + DEFAULTS.MIN_SPEED) * DEFAULTS.MAX_SPEED);
    options.position = options.position || options.game.mineStartPosition();
    options.radius = DEFAULTS.RADIUS;
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.path = `villain${randVillain}`;
    options.velocity = options.velocity || [randXVector, 0];
    super(options);
  }

  static resetVelocity(){
    console.log('reset');
    DEFAULTS.MIN_SPEED = 1;
  }

  static increaseVelocity(points){
    if(DEFAULTS.MIN_SPEED < 3 && points % 1000 === 0){
      DEFAULTS.MIN_SPEED += 0.5;
    }
  }

}

module.exports = Mine;
