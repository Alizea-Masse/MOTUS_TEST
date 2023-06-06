import Game from './Game/motus.js'

let game;

  window.addEventListener("DOMContentLoaded", (event) => {
  
    game = new Game(0)
  
  });

  document.addEventListener("keydown", function (event) {
    if (event.key.length === 1 && event.key.match(/[a-z]/i) && game.running) {
      game.addLetter(event.key.toUpperCase());
    }
  })