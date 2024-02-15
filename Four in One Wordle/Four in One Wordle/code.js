// Start Menu
setScreen("Menu");

// Variables
var solution = "";
var currRow = 1;
var currScreen = "three";
var win = false;
var lose = false;
var dataLength = 0;
var resetNum = 0;

// Screen Selector
onEvent("threedleS", "click", function( ) {
  currScreen = "three";
  createSolution();
  setScreen("Threedle");
});
onEvent("fourdleS", "click", function( ) {
  currScreen = "four";
  createSolution();
  setScreen("Fourdle");
});
onEvent("fivedleS", "click", function( ) {
  currScreen = "five";
  createSolution();
  setScreen("Fivedle");
});
onEvent("sixdleS", "click", function( ) {
  currScreen = "six";
  createSolution();
  setScreen("Sixdle");
});

// Solution Generator
function createSolution() {
  if (currScreen == "three") {
    dataLength = 1011;
  }
  else if (currScreen == "four") {
    dataLength = 5271;
  }
  else if (currScreen == "five") {
    dataLength = 5756;
  }
  else {
    dataLength = 2499;
  }
  solution = getColumn(currScreen + "Solutions", "List")[Math.floor(Math.random() * dataLength)].toUpperCase();
}

// Submit Button
onEvent("submitB_three", "click", function( ) {
  if (!win && !lose) {
    submit();
  }
  else {
    reset();
  }
});
onEvent("submitB_four", "click", function( ) {
  if (!win && !lose) {
    submit();
  }
  else {
    reset(); 
  }
});
onEvent("submitB_five", "click", function( ) {
  if (!win && !lose) {
    submit();
  }
  else {
    reset();
  }
});
onEvent("submitB_six", "click", function( ) {
  if (!win && !lose) {
    submit();
  }
  else {
    reset();
  }
});

// Submit Function
function submit() {
  if (getText("submitT_" + currScreen).length != solution.length || (getColumn(currScreen + "Solutions", "List").indexOf(getText("submitT_" + currScreen).toUpperCase()) == -1 && (getColumn(currScreen + "Solutions", "List").indexOf(getText("submitT_" + currScreen).toLowerCase()) == -1))) {
    setProperty("submitT_" + currScreen, "placeholder", "Not a " + currScreen.substring(0, 1).toUpperCase() + currScreen.substring(1) + " Letter Word");
    setText("submitT_" + currScreen, "");
  }
  else if (!win && !lose) {
    setProperty("submitT_" + currScreen, "placeholder", "Guess Here");
    check(getText("submitT_" + currScreen));
  }
}

// Reset Function
function reset() {
  if (currScreen == "three") {
    resetNum = 3;
  }
  else if (currScreen == "four") {
    resetNum = 4;
  }
  else if (currScreen == "five") {
    resetNum = 5;
  }
  else {
    resetNum = 6;
  }
  
  for (var i = 1; i <= 6; i++) {
    for (var j = 1; j <= resetNum; j++) {
      setImageURL(currScreen + i + "tile" + j, "assets/empty.png");
      setText(currScreen + i + "letter" + j, "");
    }
  }
  
  win = false;
  lose = false;
  currRow = 1;
  
  setProperty("submitB_" + currScreen, "text", "Submit");
  setProperty("submitB_" + currScreen, "background-color", "rgb(32, 224, 11)");
  setProperty("submitT_" + currScreen, "background-color", "rgb(242, 242, 242)");
  setText("submitT_" + currScreen, "");
  setProperty("submitT_" + currScreen, "placeholder", "Guess Here");
  
  setScreen("Menu");
}

// Win State
timedLoop(10, function() {
  if (win && !lose) {
    setProperty("submitB_" + currScreen, "text", "Play Again?");
    setProperty("submitT_" + currScreen, "background-color", "rgb(32, 224, 11)");
    setText("submitT_" + currScreen, "");
    setProperty("submitT_" + currScreen, "placeholder", "Good Guess!");
  }
});

// Lose State
timedLoop(10, function() {
  if (lose && !win) {
    setProperty("submitB_" + currScreen, "text", "Play Again?");
    setProperty("submitT_" + currScreen, "background-color", "red");
    setProperty("submitB_" + currScreen, "background-color", "red");
    setText("submitT_" + currScreen, "");
    setProperty("submitT_" + currScreen, "placeholder", "The Word Was: " + solution);
  }
});

function check(guess) {
  if (guess.toUpperCase() == solution.toUpperCase()) {
    win = true;
  }
  if (currRow == 6 && guess.toUpperCase() != solution.toUpperCase()) {
    lose = true;
  }
  
  var tempSolution = [];
  var tempGuess = [];
  
  for (var h = 0; h < solution.length; h++) {
    tempSolution[h] = solution.substring(h, h + 1).toUpperCase();
    tempGuess[h] = guess.substring(h, h + 1).toUpperCase();
  }
  
  for (var i = 0; i < solution.length; i++) {
    setText(currScreen + currRow + "letter" + (i + 1), tempGuess[i].toUpperCase());
  }
  
  for (var j = 0; j < solution.length; j++) {
    if (tempGuess[j].toUpperCase() == tempSolution[j].toUpperCase()) {
      setImageURL(currScreen + currRow + "tile" + (j + 1), "assets/correct.png");
      tempSolution[j] = null;
      tempGuess[j] = null;
    }
  }
  
  for (var k = 0; k < solution.length; k++) {
    if (tempGuess[k] != null) {
      for (var l = 0; l < 4; l++) {
        if (tempGuess[k] == tempSolution[l]) {
          setImageURL(currScreen + currRow + "tile" + (k + 1), "assets/partialCorrect.png");
          tempGuess[k] = null;
          tempSolution[l] = null;
          break;
        }
      }
    }
  }
  
  for (var m = 0; m < solution.length; m++) {
    if (tempGuess[m] != null) {
      setImageURL(currScreen + currRow + "tile" + (m + 1), "assets/incorrect.png");
    }
  }
  
  currRow++;
}
