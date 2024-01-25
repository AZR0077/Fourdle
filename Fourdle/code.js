// Variables
var solution = "";
var currRow = 1;
var win = false;
var lose = false;

// Solution Generator
solution = getColumn("Solutions", "List")[Math.floor(Math.random() * 497)];

// Submit Button
onEvent("submitB", "click", function( ) {
  if (getText("submitT").length != 4 || getColumn("Solutions", "List").indexOf(getText("submitT").toLowerCase()) == -1) {
    setProperty("submitT", "placeholder", "Not a 4 Letter Word");
    setText("submitT", "");
  }
  else if (!win && !lose) {
    setProperty("submitT", "placeholder", "Guess Here");
    check(getText("submitT"));
  }
});

// Win State
timedLoop(10, function() {
  if (win && !lose) {
    setProperty("submitB", "text", "Good Guess!");
    setProperty("submitT", "background-color", "rgb(32, 224, 11)");
    setText("submitT", "");
    setProperty("submitT", "placeholder", "");
  }
});

// Lose State
timedLoop(10, function() {
  if (lose && !win) {
    setProperty("submitB", "text", "The Word Was: " + solution);
    setProperty("submitT", "background-color", "red");
    setProperty("submitB", "background-color", "red");
    setText("submitT", "");
    setProperty("submitT", "placeholder", "");
  }
});

function check(guess) {
  if (guess.toUpperCase() == solution.toUpperCase()) {
    win = true;
  }
  if (currRow == 6 && guess.toUpperCase() != solution.toUpperCase()) {
    lose = true;
  }
  
  var tempSolution = [solution.substring(0, 1), solution.substring(1, 2), solution.substring(2, 3), solution.substring(3, 4)];
  var tempGuess = [guess.substring(0, 1), guess.substring(1, 2), guess.substring(2, 3), guess.substring(3, 4)];
  
  for (var i = 0; i < 4; i++) {
    setText(currRow + "letter" + (i + 1), tempGuess[i].toUpperCase());
  }
  
  for (var j = 0; j < 4; j++) {
    if (tempGuess[j].toUpperCase() == tempSolution[j].toUpperCase()) {
      setImageURL(currRow + "tile" + (j + 1), "assets/correct.png");
      tempSolution[j] = null;
      tempGuess[j] = null;
    }
  }
  
  for (var k = 0; k < 4; k++) {
    if (tempGuess[k] != null) {
      for (var l = 0; l < 4; l++) {
        if (tempGuess[k] == tempSolution[l]) {
          setImageURL(currRow + "tile" + (k + 1), "assets/partialCorrect.png");
          tempGuess[k] = null;
          tempSolution[l] = null;
          break;
        }
      }
    }
  }
  
  for (var m = 0; m < 4; m++) {
    if (tempGuess[m] != null) {
      setImageURL(currRow + "tile" + (m + 1), "assets/incorrect.png");
    }
  }
  
  currRow++;
}
