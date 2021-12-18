const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

Draw = (part) => {
   switch (part) {
      case 'gallows' :
        context.strokeStyle = '#444';
        context.lineWidth = 10; 
        context.beginPath();
        context.moveTo(175, 225);
        context.lineTo(5, 225);
        context.moveTo(40, 225);
        context.lineTo(25, 5);
        context.lineTo(100, 5);
        context.lineTo(100, 25);
        context.stroke();
        break;

      case 'head':
        context.lineWidth = 5;
        context.beginPath();
        context.arc(100, 50, 25, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
        break;
      
      case 'body':
        context.beginPath();
        context.moveTo(100, 75);
        context.lineTo(100, 140);
        context.stroke();
        break;

      case 'rightArm':
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(60, 100);
        context.stroke();
        break;

      case 'leftArm':
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(140, 100);
        context.stroke();
        break;

      case 'rightLeg':
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(80, 190);
        context.stroke();
        break;

      case 'leftLeg':
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(125, 190);
        context.stroke();
      break;
   } 
}

var categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull"],
        ["alien", "gladiator", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"],
        ["python","javascript","mongodb","json","java","html","css","c","csharp","golang","kotlin","php","sql","ruby"]
                 ];

var hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama","Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"],
    ["Lightweight and Interpreted", "Originally made by Netscape", "Databases!!", "Human readable interchange format", "by Sun Microsystems", "Used by nearly every webpage", "Style.....", "its pretty obvious", "Used in Unity", "Made by Google", "Successor to Java", "Server Side Scripting", "Databases!!", "on Rails!"]
            ];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
const draws = [
   'head', 
   'body', 
   'rightArm', 
   'leftArm',
   'rightLeg',
   'leftLeg',
]

const drawgallows = 'gallows'

chosenCategory = categories[Math.floor(Math.random() * categories.length)];

function randomWord() {
  answer = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
}

var selectCat = function () {
 if (chosenCategory === categories[0]) {
    catagoryName.innerHTML = "Premier League Football Teams";
  } else if (chosenCategory === categories[1]) {
    catagoryName.innerHTML = "Films";
  } else if (chosenCategory === categories[2]) {
    catagoryName.innerHTML = "Cities";
  } else if (chosenCategory === categories[3]) {
    catagoryName.innerHTML = "Programming Languages";
  }
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    updateHangmanPicture();
    updateMistakes();
    checkIfGameLost();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangman');
    Draw(draws[mistakes++])
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost, Try Again?';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function showHint() {

var catagoryIndex = categories.indexOf(chosenCategory);
var hintIndex = chosenCategory.indexOf(answer);
document.getElementById("clue").innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
};

function reset() {document.location.reload(true)}

document.getElementById('maxWrong').innerHTML = maxWrong;
clearCanvas();
Draw(drawgallows)
randomWord();
selectCat();
generateButtons();
guessedWord();
document.getElementById("clue").innerHTML = "Clue: - "