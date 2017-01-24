const Util = require('./util');
const MovingObject = require('./moving_object');
const Gun = require('./gun');

const DEFAULTS = {
  DIM: 75,
  RADIUS: 29,
  VELOCITY: [0,0],
  TERMINAL_VELOCITY: 6,
  ACC_RATE: -0.5,
  GUN_VELOCITY: [10, 0],
};

class Submarine extends MovingObject{
  constructor(options = {}){
    options.xDim = DEFAULTS.DIM;
    options.yDim = DEFAULTS.DIM;
    options.radius = DEFAULTS.RADIUS;
    options.velocity = options.velocity || DEFAULTS.VELOCITY;
    const nemoNum = Util.calcNemoNum(options.velocity[1]);
    options.path = `nemo${nemoNum}`;
    super(options);
    this.acc = false;
    this.rot = 0;
    this.guns = 1;
    this.gravityInterval = window.setInterval(this.gravity.bind(this), 50);
    this.accelerateInterval = window.setInterval(this.accelerate.bind(this));
  }

  static increaseVelocity(points){
    if(DEFAULTS.ACC_RATE > -1.5 && points % 10000 === 0){
      DEFAULTS.ACC_RATE -= 0.25;
    }
  }

  static resetVelocity(){
    DEFAULTS.ACC_RATE = -0.5;
  }

  accelerate(){
    if(this.acc && this.velocity[1] > -DEFAULTS.TERMINAL_VELOCITY){
      this.velocity[1] += DEFAULTS.ACC_RATE;
      const nemoNum = Util.calcNemoNum(this.velocity[1]);
      this.path = `nemo${nemoNum}`;
    }
  }

  gravity(){
    if(this.velocity[1] < DEFAULTS.TERMINAL_VELOCITY){
      this.velocity[1] += 2;
      const nemoNum = Util.calcNemoNum(this.velocity[1]);
      this.path = `nemo${nemoNum}`;
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
