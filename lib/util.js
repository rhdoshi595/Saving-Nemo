const Mine = require('./mine');
const PickUp = require('./pickup');

const Util = {
  distanceBetween(obj1, obj2){
    const changeInX = Math.pow(obj1.position[0] - obj2.position[0], 2);
    const changeInY = Math.pow(obj1.position[1] - obj2.position[1], 2);
    return Math.sqrt(changeInX + changeInY);
  },
  randomVector (length){
    const xVector = - (Math.random() + 1) * length;
    return [xVector, 0];
  },
  createImage(imgPath){
    const image = new Image();
    image.src = imgPath;
    return image;
  },
  isCrash(obj1, obj2){
    const distanceBetween = this.distanceBetween(obj1,obj2);
    const minDistanceBetween = obj1.radius + obj2.radius;
    return (distanceBetween < minDistanceBetween);
  },

  checkGunHit(game) {
    for (let i = 0; i < game.guns.length; i++) {
      for (let j = 0; j < game.mines.length; j++) {
        if (this.isCrash(game.guns[i], game.mines[j])) {
          game.remove(game.mines[j]);
        }
      }
    }
  },

  checkPickUp(game) {
    for (let i = 0; i < game.pickups.length; i++) {
      if (this.isCrash(game.submarine, game.pickups[i])) {
        game.pickups[i].applyPickUp(game);
        game.remove(game.pickups[i]);
      }
    }
  },

  calcNemoNum(velocity){
    if (velocity <= 0 && velocity > -2.5){
      return 3;
    } else if (velocity <= -2.5){
      return 4;
    } else if (velocity > 2.5){
      return 0;
    } else {
      return 1;
    }
  },

  oldObjects(game, objects){
    const oldies = [];
    for (var i = 0; i < objects.length; i++) {
      if(game.checkOutOfBounds(objects[i])){
          oldies.push(objects[i]);
      }
    }
    return oldies;
  },

  addMineInterval(game) {
    return window.setInterval(() => {
      if(game.playing){
        game.add(new Mine({ game: game }));
        const minesAndGuns = [].concat(game.mines, game.guns);
        const oldies = this.oldObjects(game, minesAndGuns);
        oldies.forEach((obj) => {
          game.remove(obj);
        });
      }
    }, 750);
  },

  addPickUpInterval(game){
    return window.setInterval(() => {
      if(game.playing){
        game.add(new PickUp({ game: game }));
        const oldies = this.oldObjects(game, game.pickups);
        oldies.forEach((oldObj) => {
          game.remove(oldObj);
        });
      }
    }, 10000);
  }
};

module.exports = Util;
