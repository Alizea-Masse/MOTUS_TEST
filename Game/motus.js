//import Fame from './Game/wallOfFame.js'


export default class Game {

  constructor(score) {
    this.user
    this.score = score
    this.running = true;
    this.word = "";
    this.position = 1;
    this.round = 0;
    this.letterArray;
    this.board = document.getElementById("board");
    this.board.innerHTML = "";
    this.getWord().then((word)=>{this.word = word ; this.drawboard()})
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
    //console.log(position);
   
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
      success: function(word) {
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

    for (let index = this.round ; index < 6; index++) {
      let emptyRows = document.getElementById(`row${index}`)
      let rowsChildren = emptyRows.children
     

      for (let item of rowsChildren) {
        item.classList.add('empty')

      }
      
      // le mot s'écrit sur toutes les lignes
      
    }
    this.running = false
    setTimeout(() => {
      
      game = new Game(this.score + 1)
    }, 4000);
   
  }

  lose() {

    const bestScore = this.score
    //console.log(bestScore)
    this.running = false
    this.submitScore()
    this.clearGame()
    this.getBestScore().then((wall)=>{this.wall = wall ;  this.drawFame()})
    
    

  }

  clearGame(){
    setTimeout(() => {
      const boardContainer = document.querySelector('.board-container')
      boardContainer.innerHTML = ''
    }, 500);
  }


  getBestScore() {
    
    return $.ajax({
       method: "POST",
       url: "ajaxMethods.php",
       data: { action: "getBestScore" },
      //  success: function(wall) {
      //    this.wall = wall
      //  }
     }) 
 
   }

  drawFame(){

// this.getBestScore()
 console.log(this.wall)
 
 
   
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('fame').appendChild(table);
// Creating and adding data to first row of the table
let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Place";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Nom";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "Score";

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
thead.appendChild(row_1);


// Creating and adding data to second row of the table
let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = "1.";
let row_2_data_2 = document.createElement('td');
row_2_data_2.innerHTML = "James Clerk";
let row_2_data_3 = document.createElement('td');
row_2_data_3.innerHTML = "Netflix";

row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
tbody.appendChild(row_2);


// Creating and adding data to third row of the table
let row_3 = document.createElement('tr');
let row_3_data_1 = document.createElement('td');
row_3_data_1.innerHTML = "2.";
let row_3_data_2 = document.createElement('td');
row_3_data_2.innerHTML = "Adam White";
let row_3_data_3 = document.createElement('td');
row_3_data_3.innerHTML = "Microsoft";

row_3.appendChild(row_3_data_1);
row_3.appendChild(row_3_data_2);
row_3.appendChild(row_3_data_3);
tbody.appendChild(row_3);

}



  submitScore() {
    $.ajax({
      method: "POST",
      url: "ajaxMethods.php",
      data: { action: "addScore", score: this.score }
    })
  };
  


}






