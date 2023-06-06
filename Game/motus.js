export default class Game {

  constructor() {
    this.boardContainer = document.getElementById("board-container");
    this.board = document.getElementById("board");
    this.fame = document.getElementById("fame");
    this.init(0)
  }

  init(score) {
    this.user
    this.score = score
    this.running = true;
    this.word = "";
    this.position = 1;
    this.round = 0;
    this.letterArray;
    this.board.innerHTML = "";
    this.getWord().then((word) => { this.word = word; this.drawboard()})
    this.fame = document.getElementById("fame");
    this.wall = []
  }


  drawboard() {
    this.board = document.getElementById("board");
    const score = document.getElementById("score")
    score.innerHTML = `Score : ${this.score} `

    // de la création d'une ligne
    for (let counterRow = 0; counterRow < 6; counterRow++) {
      const rowElement = document.createElement("div");
      rowElement.id = `row${counterRow}`
      rowElement.className = "row";
      this.board.appendChild(rowElement);

      // répétition
      for (let counterCell = 0; counterCell < this.word.length; counterCell++) {
        // de la création d'une case
        const cellElement = document.createElement("div");
        cellElement.className = "cell";
        cellElement.id = "cell" + counterRow + "-" + counterCell;
        rowElement.appendChild(cellElement);
      }
    }

    this.generateLetterArray()
    this.writePoints()
    this.writeLetter(this.word[0], "goodPlace", "cell0-0");
  }


  writePoints() {
    for (let index = 1; index < this.word.length; index++) {
      let LineCells = document.getElementById(`cell${this.round}-${index}`)
      LineCells.innerHTML = "."
      if (this.letterArray[index] == true) {
        LineCells.innerHTML = ""
      }
    }
  }

  writeLetter(letter, className, id) {
    let cellContainer = document.getElementById(id);
    let cell = document.createElement('span')
    cellContainer.appendChild(cell)
    cellContainer.classList.add(className);
    cell.innerHTML = letter.toUpperCase();
  }

  generateLetterArray() {
    this.letterArray = Array.from({ length: this.word.length }, (i) => (i = false));
    this.letterArray[0] = true;
  }


  addLetter(letter) {
    const cell = "cell" + this.round + "-" + this.position;
    let goodCell = document.getElementById(cell)
    goodCell.innerHTML = ""
    // La bonne position
    if (this.word[this.position] == letter) {
      this.writeLetter(letter, "goodPlace", cell);
      this.letterArray[this.position] = true;
    }
    //Present dans le mot
    else if (this.word.includes(letter)) {
      this.writeLetter(letter, "badPlaceButInside", cell);
    }
    // Pas present
    else {
      this.writeLetter(letter, "badPlace", cell);
    }
    //position++;
    while (++(this.position) < this.letterArray.length && this.letterArray[this.position] == true);
    if (this.position == this.word.length) {
      this.newRound();
    }
  }

  newRound() {
    this.round++;
    this.position = this.letterArray.indexOf(false);

    if (this.position === -1) {
      this.win()
      return

    }
    else if (this.round == 6) {
      this.lose()
      return

    }
    this.writePoints()
    for (let index = 0; index < this.letterArray.length; index++) {
      if (this.letterArray[index] == true) {
        const cell = "cell" + this.round + "-" + index;
        this.writeLetter(this.word[index], "goodPlace", cell);
      }
    }
  }

  getWord() {
    return $.ajax({
      method: "POST",
      url: "ajaxMethods.php",
      data: { action: "getWord" },
      success: function (word) {
        this.word = word
      }
    })

  }



  win() {
    const id = this.round - 1
    for (let index = 0; index < this.letterArray.length; index++) {
      let cell = document.getElementById(`cell${id}-${index}`)
      setTimeout(() => {
        cell.classList.add('win')
      }, 500 * index)
    }

    for (let index = this.round; index < 6; index++) {
      let emptyRows = document.getElementById(`row${index}`)
      let rowsChildren = emptyRows.children


      for (let item of rowsChildren) {
        item.classList.add('empty')

      }

    }
    this.running = false
    setTimeout(() => {
      this.init(this.score + 1)
    }, 4000);

  }

  lose() {
    this.running = false
    this.submitScore()
    this.clearGame()
    setTimeout(() => {
      this.getBestScore().then((wall) => { this.wall = wall; this.drawFame() })
    }, 900);
  }

  clearGame() {
    setTimeout(() => {
      const boardContainer = document.getElementById('board-container')
      boardContainer.style.display = "none"
    }, 500);
  }


  getBestScore() {
    return $.ajax({
      method: "POST",
      url: "ajaxMethods.php",
      data: { action: "getBestScore" },
    })
  }

  drawFame() {
    const bestScoreJsonArray = this.wall
    const bestScoreJsArray = JSON.parse(bestScoreJsonArray)
    const wallOfFame = document.getElementById('fame')
    const wallTitle = document.createElement('h1')
    wallTitle.setAttribute('class', 'wall-title')
    wallTitle.innerHTML = "Classement des meilleurs joueurs"
    wallOfFame.appendChild(wallTitle)
    const newTable = document.createElement("table");
    newTable.setAttribute("id", "fame-table")
    newTable.innerHTML = "<thead><th>Joueurs</th><th>Score</th></thead>";

    for (let player of bestScoreJsArray) {

      const newRow = document.createElement("tr");
      const tdPlayer = document.createElement("td");
      const tdScore = document.createElement("td");
      tdPlayer.textContent = player.username.toUpperCase();
      tdScore.textContent = player.best_score;
      newRow.appendChild(tdPlayer);
      newRow.appendChild(tdScore);
      newTable.appendChild(newRow);
    }

    const target = document.getElementById('fame');
    target.appendChild(newTable);

    const startAgainButton = document.createElement('button')
    startAgainButton.innerHTML = "Nouvelle partie !"
    target.appendChild(startAgainButton)

    startAgainButton.addEventListener('click', () => {

      this.init(0);
      const boardContainer = document.getElementById("board-container");
      boardContainer.style.display = "flex"

      const wallOfFame = document.getElementById('fame');
      wallOfFame.innerHTML = ''
    })
  }



  submitScore() {
    $.ajax({
      method: "POST",
      url: "ajaxMethods.php",
      data: { action: "addScore", score: this.score }
    })
  };
}






