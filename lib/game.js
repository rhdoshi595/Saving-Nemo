const Mine = require('./mine');
const Submarine = require('./submarine');
const Util = require('./util');
const Background = require('./background');
const Gun = require('./gun');
const PickUp = require('./pickup');

class Game {
  constructor (loader) {
    this.loader = loader;
    this.backgrounds = [];
    this.mines = [];
    this.guns = [];
    this.pickups = [];
    // this.addMines();
    this.refreshObjects();
    this.playing = false;
    this.lost = false;
    this.points = 0;
  }

  displayPoints(){
    $('.points').text(this.points);
    $('.highscore').text(`Highscore: 0`);
    this.points += 5;
  }

  add(object){
    if(object instanceof Mine){
      this.mines.push(object);
    } else if(object instanceof Submarine){
      this.submarine = object;
    } else if(object instanceof Background){
      this.backgrounds.push(object);
    } else if (object instanceof Gun){
      this.guns.push(object);
    } else if (object instanceof PickUp){
      this.pickups.push(object);
    } else {
      throw "SQUID!!";
    }
  }

  addBackground(){
    const background = new Background(this.loader);
    this.add(background);
  }

  wrapBackground(){
    if(this.backgrounds[0].posX < -1000 && this.backgrounds.length < 2){
      const bac = new Background(this.loader);
      bac.posX = 898;
      this.add(bac);
    }
    if(this.backgrounds[0].posX < -1900){
      this.backgrounds.shift();
    }
  }

  addMineInterval() {
    return window.setInterval(() => {
      if(this.playing){
        this.add(new Mine({ game: this, loader: this.loader }));
        const minesAndGuns = [].concat(this.mines, this.guns);
        const oldies = Util.oldObjects(this, minesAndGuns);
        oldies.forEach((obj) => {
          this.remove(obj);
        });
      }
    }, 750);
  }

  addPickUpInterval(){
    return window.setInterval(() => {
      if(this.playing){
        this.add(new PickUp({ game: this, loader: this.loader }));
        const oldies = Util.oldObjects(this, this.pickups);
        oldies.forEach((oldObj) => {
          this.remove(oldObj);
        });
      }
    }, 10000);
  }

  refreshObjects(){
    this.add(new Mine({game: this, loader: this.loader}));
    this.mineInterval = this.addMineInterval();
    this.pickUpInterval = this.addPickUpInterval();
  }

 //  this.add(new Asteroid({ game: this, loader: this.loader }));
 // +    this.asteroidInterval = Util.createAsteroidInterval(this, this.loader);
 //      this.powerUpInterval = Util.createPowerUpInterval(this);
 //    }

  allObjects(){
    return [].concat(this.backgrounds, [this.submarine], this.pickups, this.mines, this.guns);
  }

  draw(ctx){
    if(this.playing){
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach((object) => {
        if(object) {
          object.draw(ctx);
        }
      });
      this.checkCrash();
    }
  }

  moveObjects(){
    this.allObjects().forEach((object) => {
      if(object){
        object.move();
      }
    });
  }

  checkCollisions() {
    const mines = this.mines;
    for(let i = 0; i < mines.length; i += 1){
      if (Util.isCrash(this.submarine, mines[i])){
        return true;
      }
    }
    Util.checkGunHit(this);
    Util.checkPickUp(this);
    return false;
  }

  checkOutOfBounds(object){
    const xPos = object.position[0];
    const yPos = object.position[1];
    if(object instanceof Submarine){
      return (yPos < 0 || yPos > 400);
    } else if (object instanceof Mine || object instanceof PickUp){
      return (xPos < 0);
    } else if (object instanceof Gun) {
      return (xPos > 900);
    }
  }

  checkCrash(){
    if (this.checkCollisions() || this.checkOutOfBounds(this.submarine)){
      this.lost = true;
      Mine.resetVelocity();
      Submarine.resetVelocity();
      window.clearInterval(this.mineInterval);
      window.clearInterval(this.pickUpInterval);
      window.clearInterval(this.submarine.gravityInterval);
      window.clearInterval(this.submarine.accelerateInterval);
      this.renderLost();
    }
  }

  renderLost() {
    this.removeAll();
    const $gameModal = $('.game-modal');
    $gameModal.removeClass('hidden');
    $gameModal.text('Better Luck Next Time. Press "Space" to play again?');
    this.playing = false;
  }

  addSubmarine(){
    const submarine = new Submarine({
      position: this.submarineStartPosition(),
      game: this,
      loader: this.loader
    });
    this.add(submarine);
    return submarine;
  }

  submarineStartPosition(){
    return [225, (Game.DIM_Y / 2)];
  }

  mineStartPosition(){
    return [Game.DIM_X, Game.DIM_Y * Math.random()];
  }

  remove(object){
    if(object instanceof Mine){
      this.mines.splice(this.mines.indexOf(object), 1);
    } else if(object instanceof Submarine){
      this.submarine = undefined;
    } else if (object instanceof Gun){
      this.guns.splice(this.guns.indexOf(object), 1);
    } else if (object instanceof PickUp){
      this.pickups.splice(this.pickups.indexOf(object), 1);
    } else {
      throw "AHHH!";
    }
  }

  removeAll(){
    this.mines = [];
    this.guns = [];
    this.pickups = [];
    this.submarine = undefined;
    this.backgrounds = [];
  }

  step(change){
    if(this.playing){
      this.wrapBackground();
      this.moveObjects();
      this.displayPoints();
      Mine.increaseVelocity(this.points);
      Submarine.increaseVelocity(this.points);
    }
  }
}

Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
