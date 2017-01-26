const Game = require("./game");
const GameView = require("./game_view");

const firebase = require('firebase/app');
require('firebase/database');

const config = {
  apiKey: "AIzaSyBsI0koOMiV8944vb5XpRQxtS6FmUdgQ1E",
    authDomain: "saving-nemo-d501a.firebaseapp.com",
    databaseURL: "https://saving-nemo-d501a.firebaseio.com",
    storageBucket: "saving-nemo-d501a.appspot.com",
    messagingSenderId: "233715418539"
};

firebase.initializeApp(config);
const database = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");

  const manifest = [
    {src: "sprites/nemo0.png", id: "nemo0"},
    {src: "sprites/nemo1.png", id: "nemo1"},
    {src: "sprites/nemo2.png", id: "nemo2"},
    {src: "sprites/nemo3.png", id: "nemo3"},
    {src: "sprites/nemo4.png", id: "nemo4"},
    {src: "sprites/villain0.png", id: "villain0"},
    {src: "sprites/villain1.png", id: "villain1"},
    {src: "sprites/villain2.png", id: "villain2"},
    {src: "sprites/villain3.png", id: "villain3"},
    {src: "sprites/pickup0.png", id: "pickup0"},
    {src: "sprites/pickup1.png", id: "pickup1"},
    {src: "images/undersea.jpg", id: "background"}
  ];

  const loader = new createjs.LoadQueue(false);
  loader.loadManifest(manifest, true, "./assets/");
  const gameView = new GameView(ctx, loader, database);

  const loadGame = () => {
    gameView.load();
  };


  loader.addEventListener("complete", loadGame);


});
