import Game from './Game/motus.js'


let game;

document.addEventListener("keydown", function (event) {
    if (event.key.length === 1 && event.key.match(/[a-z]/i) && game.running) {
      game.addLetter(event.key.toUpperCase());
    }
  })
  
  
  window.addEventListener("DOMContentLoaded", (event) => {
  
    game = new Game(0)
  
  });