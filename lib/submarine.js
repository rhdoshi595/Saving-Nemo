const Util = require('./util');
const MovingObject = require('./moving_object');
const Gun = require('./gun');

const DEFAULTS = {
  DIM: 100,
  RADIUS: 40,
  VELOCITY: [0,0],
  TERMINAL_VELOCITY: 6,
  ACC_RATE: -0.5,
  GUN_VELOCITY: [10, 0],
  PATH: 'assets/sprites/nemo'
};

class Submarine extends MovingObject{
  constructor(options = {}){
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.radius = DEFAULTS.RADIUS;
    options.velocity = options.velocity || DEFAULTS.VELOCITY;
    const nemoNum = Util.calcNemoNum(options.velocity[1]);
    options.path = DEFAULTS.PATH + `${nemoNum}.png`;
    super(options);
    this.acc = false;
    this.rot = 0;
    this.guns = 1;
    this.gravityInterval = window.setInterval(this.gravity.bind(this), 50);
    this.accelerateInterval = window.setInterval(this.accelerate.bind(this));
  }

  accelerate(){
    if(this.acc && this.velocity[1] > -DEFAULTS.TERMINAL_VELOCITY){
      this.velocity[1] += DEFAULTS.ACC_RATE;
      const nemoNum = Util.calcNemoNum(this.velocity[1]);
      this.path = DEFAULTS.PATH + `${nemoNum}.png`;
    }
  }

  gravity(){
    if(this.velocity[1] < DEFAULTS.TERMINAL_VELOCITY){
      this.velocity[1] += 1.5;
      const nemoNum = Util.calcNemoNum(this.velocity[1]);
      this.path = DEFAULTS.PATH + `${nemoNum}.png`;
    }
  }

  isCollision(foreignObject){
    const distanceBetween = Util.distanceBetween(this, foreignObject);
    const minimumDistanceBetween = this.radius + foreignObject.radius;
    return (distanceBetween < minimumDistanceBetween);
  }

  shoot(){
    if(this.guns > 0){
      this.guns -= 1;
      const gun = new Gun({
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

}

module.exports = Submarine;
