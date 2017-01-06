const Mine = require('./mine');
const Submarine = require('./submarine');
const Util = require('./util');
const Background = require('./background');
const Gun = require('./gun');
const PickUp = require('./pickup');

class Game {
  constructor () {
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
      this.background = object;
    } else if (object instanceof Gun){
      this.guns.push(object);
    } else if (object instanceof PickUp){
      this.pickups.push(object);
    } else {
      throw "SQUID!!";
    }
  }

  addBackground(){
    const background = new Background();
    this.add(background);
  }

  addMineInterval() {
    return window.setInterval(() => {
      if(this.playing){
        this.add(new Mine({ game: this }));
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
        this.add(new PickUp({ game: this }));
        const oldies = Util.oldObjects(this, this.pickups);
        oldies.forEach((oldObj) => {
          game.remove(oldObj);
        });
      }
    }, 10000);
  }

  refreshObjects(){
    this.add(new Mine({game: this}));
    this.mineInterval = this.addMineInterval();
    this.pickUpInterval = this.addPickUpInterval();
    console.log(this.mineInterval, this.pickUpInterval);
  }

  allObjects(){
    return [].concat([this.background], [this.submarine], this.pickups, this.mines, this.guns);
  }

  draw(ctx){
    if(this.playing){
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.allObjects().forEach((object) => {
        object.draw(ctx);
      });
    }
  }

  moveObjects(){
    this.allObjects().forEach((object) => {
      object.move();
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
      console.log(this.mineInterval, this.pickUpInterval);
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
    $gameModal.text('Sorry you lose :( Play Again?');
    this.playing = false;
  }

  addSubmarine(){
    const submarine = new Submarine({
      position: this.submarineStartPosition(),
      game: this
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
    this.background = undefined;
  }

  step(change){
    if(this.playing){
      this.moveObjects();
      this.checkCrash();
      this.displayPoints();
    }
  }
}

Game.DIM_X = 900;
Game.DIM_Y = 400;

module.exports = Game;
