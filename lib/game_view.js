const Game = require('./game');
const Database = require('./database');

class GameView {
  constructor(ctx, loader, database){
    this.ctx = ctx;
    this.loader = loader;
    this.database = database;
    this.notHighscore = true;
    Database.fetchHighscores(database);
  }

  bindKeyHandlers(){
    $(window).on('keydown', function(event){
      this.handleKeyEvent(event);
    }.bind(this));

    $(window).on('keyup', function(event){
      this.handleKeyRel(event);
    }.bind(this));

    $('.about').on('click', function(event){
      this.handleOpenModal(event);
    }.bind(this));

    $('.leaderboard').on('click', function(event){
      this.handleOpenLeaderboard(event);
    }.bind(this));

    $('.close').on('click', function(event){
      this.handleCloseLeaderboard(event);
    }.bind(this));

    $('.start').on('click', function(event){
      this.handleCloseModal(event);
      let count = 3;
      this.counter = setInterval(() => {
        this.timer(count);
        count--;
      }, 1000);
      window.setTimeout(() => {
        this.start();
      }, 4000);
    }.bind(this));
  }

  handleOpenLeaderboard(event){
    event.preventDefault();
    $('.leader').removeClass('hidden');
  }

  handleCloseLeaderboard(event){
    event.preventDefault();
    $('.leader').addClass('hidden');
    this.notHighScore = true;
    event.stopPropagation();
  }

  timer(count){
    const timer = $('.timer');
    if(count === 0){
      timer.addClass('hidden');
      clearInterval(this.counter);
      return;
    }
    timer.removeClass('hidden');
    timer.text(count);
  }

  unbindKeyHandlers(){
    $(window).off('keydown', function(event){
      this.handleKeyEvent(event);
    }.bind(this));

    $(window).off('keyup', function(event){
      this.handleKeyRel(event);
    }.bind(this));
  }

  handleCloseModal(event){
    event.preventDefault();
    $('.modal').addClass('hidden');
  }

  handleOpenModal(event){
    event.preventDefault();
    $('.modal').removeClass('hidden');
  }

  handleKeyEvent(event){
    if(event.keyCode === 32 && this.newGame && this.notHighscore){
      this.newGame = false;
      this.handleCloseModal(event);
      let count = 3;
      this.counter = setInterval(() => {
        this.timer(count);
        count -= 1;
      }, 1000);
      window.setTimeout(() => {
        this.start();
      }, 4000);
    } else if(event.keyCode === 32){
      this.submarine.acc = true;
      this.submarine.rot = 150 * (Math.PI / 180);
    } else if(event.keyCode === 13){
      this.submarine.shoot();
    }
  }

  handleKeyRel(event){
    if(event.keyCode === 32){
      this.submarine.acc = false;
      this.submarine.rot = 210 * (Math.PI / 180);
    }
  }

  start(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.game = null;
    this.game = new Game(this.loader);
    this.submarine = this.game.addSubmarine();
    this.game.addBackground();
    this.prevTime = 0;
    this.game.playing = true;
    this.intervalId = window.setInterval(() => {
      this.animate();
    }, 20);
  }

  displayAmmoCount() {
    if (this.game.submarine){
      $('.guns').text(`Shells: ${this.game.submarine.guns}`);
    }
  }

  displayPoints(){
    $('.points').text(this.game.points);
    this.game.points += 5;
  }

  animate(time){
    if(this.game.playing){
      this.game.step();
      this.displayPoints();
      this.displayAmmoCount();
      this.game.draw(this.ctx);
    } else {
      this.newGame = true;
      Database.setHighscore(this.database, this.game.points, this);
      window.clearInterval(this.intervalId);
    }
  }

  load(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.bindKeyHandlers();
  }

}

module.exports = GameView;
