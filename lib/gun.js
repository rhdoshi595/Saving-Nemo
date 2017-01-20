const MovingObject = require('./moving_object');
const Sprite = require('./sprite');

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
    this.image = Sprite.createImage(options.path);
  }

  draw(ctx){
    const imageOffsetX = this.position[0] - (this.xDim / 2);
    const imageOffsetY = this.imageOffsetY || (this.position[1] - (this.yDim / 2));
    ctx.drawImage(this.image, imageOffsetX, imageOffsetY, this.xDim, this.yDim);
  }
}

module.exports = Gun;
