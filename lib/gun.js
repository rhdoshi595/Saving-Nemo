const MovingObject = require('./moving_object');

const GUN = {
  RADIUS: 5,
  X_DIM: 40,
  Y_DIM: 20,
  PATH: 'assets/sprites/shell.png'
};

class Gun extends MovingObject{
  constructor(options){

    options.radius = GUN.RADIUS;
    options.path = GUN.PATH;
    options.xDim = GUN.X_DIM;
    options.yDim = GUN.Y_DIM;
    super(options);
  }
}

module.exports = Gun;
