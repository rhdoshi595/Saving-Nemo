const Util = require('./util');
const MovingObject = require('./moving_object');

const DEFAULTS = {
  DIM: 50,
  RADIUS: 20,
  SPEED: -10,
};

class PickUp extends MovingObject {
  constructor(options={}){
    const randomPickUp = Math.floor(Math.random() * 2);
    options.position = options.position || options.game.mineStartPosition();
    options.radius = DEFAULTS.RADIUS;
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.path = `pickup${randomPickUp}`;
    options.velocity = [DEFAULTS.SPEED, 0];
    super(options);
    this.pickUpNum = randomPickUp;
  }

  applyPickUp(game){
    if(this.pickUpNum === 0){
      game.submarine.guns += 3;
    } else {
      window.setTimeout(() => {
        game.mines = [];
      }, 100);
    }
  }
}

module.exports = PickUp;
