let game;
class Game {
  constructor() {
    this.running = true;
    this.word = "";
    this.position = 1;
    this.round = 0;
    this.letterArray;
    this.board = document.getElementById("board");
    this.board.innerHTML = "";
    this.fetchWord(() => {
      this.drawboard()
    })
  }

}