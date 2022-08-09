function newGame(button) {
  button.style.display = "none"; // when element is clicked 'button' style removed from the html div element
  const game = document.getElementById("gameContainer"); // create variable called game and apply css style game container
  //creates array for columns
  const columns = [];
  //creates an array that stores rows (ie. slots)
  const slotsArray = [];
  //create variable that will store / determine the next color in game
  let nextColor = "red";
  //loop to create columns
  for (let i = 0; i < 7; i++) { //loop start index, end terminator (ie. 6), increment one each time 
    const column = document.createElement("div"); //variable of column and assign html div element to it
    column.className = "column"; // applies CSS class name of 'column' to div element 
    game.appendChild(column); // add child element to game variable
    columns.push(column); //push variable created to columns array
  }
  class Slot { //constructs a class called 'Slot'
    constructor(element, column, row) {  // constrctor essentially parameters which the class is constructed of
      this.column = column;
      this.row = row;
      this.element = element;
      this.state = ""; //will either be empty, red or yellow. If any slot has empty state not draw has occurred
    }
    clicked() { //method within class for when slot objects are clicked
      const el = this.element; //variable to link to class element
      if (!el.classList.contains("clickable")) return; // if class list does not contain clickable return, else process next line
      el.style.backgroundColor = nextColor; //style of next color is applied to background
      this.state = nextColor; //
      //make this element(slot) not clickable
      el.classList.remove("clickable");
      //make element (slot) above clickable
      if (slotsArray[this.column][this.row - 1]) { //asks the question whether their is a slo t above
        slotsArray[this.column][this.row - 1].element.classList.add(//adds clickable class list to slots array
          "clickable",
          nextColor
        ); //add both clickable and hovering becomes next color
      }
      //check for game over
      if (isDraw(slotsArray) == true) gameOver(nextColor);

      if (isWinner(this.column, this.row, nextColor, slotsArray) == true)
        gameOver(nextColor);

      //change next color
      let oldColor = nextColor;
      nextColor == "red" ? (nextColor = "yellow") : (nextColor = "red"); //if next colour is color is currently red then change to yellow else change to red
      document.querySelectorAll(".clickable").forEach((el) => { //for each element with class clickable change hover color from red to yellow
        el.classList.remove(oldColor);
        el.classList.add(nextColor);
      });
    }
  }

  //create slots and push to columns
  columns.forEach((el, col) => { //for each columns pass through parameters el and col
    let slotColumn = []; //create empty array
    for (i = 0; i < 6; i++) {    //loop 6 times
      const div = document.createElement("div");  //create a div html element
      div.classList.add("slot"); //add slot class to the created div
      el.appendChild(div); //append this div to the parameter el
      const slot = new Slot(div, col, i);  //add parameter of div, col and i to slot
      slotColumn.push(slot); //push slot to slot column
      div.onclick = function () { //add on click functionality to each slot
        slot.clicked();
      };
      div.style.top = i * 70 + 2 + "px"; //style each slot in column so that they are spaced equally from the top 
    }
    slotsArray.push(slotColumn); //push the created array to the slot column array
  });
  slotsArray.forEach((col) => {
    col[5].element.classList.add("clickable", nextColor); //hover over each slot that is clickable with next colour in game
  });
  console.log(slotsArray);
}

//check if game is draw
function isDraw(slotsArray) {
  let isDraw = true;
  slotsArray.forEach((col) => {
    col.forEach((slot) => {
      if (slot.state == "") isDraw = false; //if any slot returns a blank string then it's not a draw otherwise (statement is false)
    });
  });
  return isDraw;
}

//test the lines to see if someone has won
function testLines(lines, color, slotsArray) {
  let connectedSlots = 1; //slots touching, if 4 you win
  lines.forEach((line) => {
    for (i = 0; i < line.length; i++) { 
      const slotLocation = line[i];
      column = slotLocation[0];
      row = slotLocation[1];
      //don't allow for searching off screen
      if (column >= 0 && column <= 6 && row >= 0 && row <= 5) {
        //make sure it is defined
        if (typeof slotsArray[column][row] !== "undefined") {
          if (slotsArray[column][row].state == color) {
            connectedSlots += 1;
            console.log(connectedSlots);
          } else break;
        }
      } else break;
    }
  });
  if (connectedSlots >= 4) return true; 
  return false;
}

//check if there is a winner
function isWinner(col, row, color, slotsArray) {
  const winningLines = {
    horizontal: [
      [
        [col - 1, row], //check the three slots to the left for a match
        [col - 2, row],
        [col - 3, row],
      ],
      [
        [col + 1, row], //check the three slots to the right for a match
        [col + 2, row],
        [col + 3, row],
      ],
    ],
    vertical: [
      [
        [col, row - 1], //check the three slots above for a match
        [col, row - 2],
        [col, row - 3],
      ],
      [
        [col, row + 1], //check the three slots below for a match
        [col, row + 2],
        [col, row + 3],
      ],
    ],
    diagonalLeft: [
      [
        [col - 1, row - 1],
        [col - 2, row - 2],
        [col - 3, row - 3],
      ],
      [
        [col + 1, row + 1],
        [col + 2, row + 2],
        [col + 3, row + 3],
      ],
    ],
    diagonalRight: [
      [
        [col - 1, row + 1],
        [col - 2, row + 2],
        [col - 3, row + 3],
      ],
      [
        [col + 1, row - 1],
        [col + 2, row - 2],
        [col + 3, row - 3],
      ],
    ],
  };
  if (testLines(winningLines.horizontal, color, slotsArray) == true)
    return true;

  if (testLines(winningLines.vertical, color, slotsArray) == true) return true;
  if (testLines(winningLines.diagonalLeft, color, slotsArray) == true)
    return true;

  if (testLines(winningLines.diagonalRight, color, slotsArray) == true)
    return true;

  return false;
}

//check if game is over
function gameOver(winner) {
  console.log("game over");
  setScore(winner);
  //delete game
  document.querySelectorAll(".column").forEach((column) => {
    column.innerHTML = "";
    column.parentNode.removeChild(column);
    document.getElementById("playButton").style.display = "inherit";
  });
}

//set score on the scoreboard
function setScore(winner) {
  if (winner == "undefined") return;

  document.getElementById(winner + "Score").innerHTML =
    parseInt(document.getElementById(winner + "Score").innerHTML) + 1;
}