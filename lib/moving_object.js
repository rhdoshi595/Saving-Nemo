const Util = require('./util');
const Sprite = require('./sprite');
class MovingObject{

  constructor(options){
    this.loader = options.loader;
    this.position = options.position;
    this.velocity = options.velocity;
    this.radius = options.radius;
    this.xDim = options.xDim;
    this.yDim = options.yDim;
    this.path = options.path;
    this.game = options.game;
    this.imageOffsetY = options.imageOffsetY;
  }

  draw (ctx) {
    const image = this.loader.getResult(`${this.path}`);
    const imageOffsetX = this.position[0] - (this.xDim / 2);
    const imageOffsetY = this.imageOffsetY || (this.position[1] - this.yDim / 2);
    ctx.drawImage(image, imageOffsetX, imageOffsetY, this.xDim, this.yDim);
  }

  move(){
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

  remove(){
    this.game.remove(this);
  }

}

module.exports = MovingObject;
