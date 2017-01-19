const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");

  const gameView = new GameView(ctx);

  const manifest = [
    {src: "sprites/nemo0.png", id: "nemo0"},
    {src: "sprites/nemo1.png", id: "nemo1"},
    {src: "sprites/nemo2.png", id: "nemo2"},
    {src: "sprites/nemo3.png", id: "nemo3"},
    {src: "sprites/nemo4.png", id: "nemo4"},
    {src: "images/undersea.jpg", id: "background"}
  ];

  const loadGame = () => {
    gameView.load();
  };

  const loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", loadGame);
  loader.loadManifest(manifest, true, "./assets/");

});
