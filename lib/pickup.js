const Util = require('./util');
const MovingObject = require('./moving_object');

const DEFAULTS = {
  DIM: 50,
  RADIUS: 20,
  SPEED: -10,
  PATH: 'assets/sprites/treasure'
};

class PickUp extends MovingObject {
  constructor(options={}){
    const randomPickUp = Math.floor(Math.random() * 2);
    options.position = options.position || options.game.mineStartPosition();
    options.radius = DEFAULTS.RADIUS;
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.path = DEFAULTS.PATH + `.png`;
    options.velocity = [DEFAULTS.SPEED, 0];
    super(options);
    this.pickUpNum = randomPickUp;
  }

  applyPickUp(game){
    if(this.pickUpNum === 0){
      game.submarine.guns += 1;
    } else {
      game.mines = [];
    }
  }
}

module.exports = PickUp;
