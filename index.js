// make game object and set all variables within game object



const sushiImg = 'images/sushi_';
let newGame;


const gameBoard = document.querySelector('.game-board');
const startPage = document.querySelector('.start-page');

const easyBoard = document.querySelector('.easy-board');
const mediumBoard = document.querySelector('.medium-board');
const hardBoard = document.querySelector('.hard-board');




const newGameButton = document.querySelector('.new-game-btn');


startPage.addEventListener('click', startGame);
newGameButton.addEventListener('click', displayHomePage);
easyBoard.addEventListener('click', onClick);
mediumBoard.addEventListener('click', onClick);
hardBoard.addEventListener('click', onClick);



function onClick(event){
  console.log(event);
  if (event.target.dataset.card) {
    event.target.classList.add('no-click');
    turnCardUp(event.target.dataset.card);
  }
}


function startGame(event) {
  console.log(event.target.dataset.level);

  gameBoard.classList.remove('inactive');
  startPage.classList.add('inactive');
  newGame = new MemoryGame(parseInt(event.target.dataset.level));
  dealDeck();
  shuffleDeck();
  startTimer();
}


function shuffleDeck() {

  for (let i = 1; i <= newGame.deckSize/2; i++) {
    let j = 0;
    while (j < 2) {
      let randomIndex = Math.floor(Math.random() * newGame.deckSize);
      if (newGame.deckArray[randomIndex] === undefined){
        newGame.deckArray[randomIndex] = sushiImg + i + '.png';
        j++;
     }
   }
  }
}



function dealDeck() {
  let cardNumber = 1;
  for (let i = 0; i < newGame.height; i++) {
    let row = document.createElement('div');

    for (let j = 0; j < newGame.width; j++) {
      let div = document.createElement('div');
      div.classList.add(newGame.memoryCard);
      let divImg = document.createElement('img');
      divImg.src = 'images/back.png';
      divImg.id = newGame.imgCardID + cardNumber;
      divImg.dataset.card = cardNumber;
      cardNumber++;
      div.append(divImg);
      row.append(div);
    }
    newGame.board.append(row);
  }
}


function startTimer() {
  let seconds = 0;
  let minutes = 0;
  newGame.timer = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    let timeString = parseInt(minutes/10) == 0 ? '0' + minutes + ':' : minutes + '0';
    timeString += parseInt(seconds/10) == 0 ? '0' + seconds : seconds;
    document.getElementById('time').textContent = timeString;
  }, 1000);
}



function MemoryGame(level) {
    this.deckSize = level;
    this.numPairs = level / 2;
    this.deckArray = [];
    this.moves = 0;
    this.firstCard = true;
    this.checkCards = [];
    this.foundPairs = 0;
    this.timer;
    this.imgCardID;
    this.board;
    this.name;
    this.time;

    switch(level){
      case(16):
        this.imgCardID = 'easy-card-';
        this.width = 4;
        this.height = 4;
        this.memoryCard = 'memory-card';
        this.board = easyBoard;
        this.board.classList.remove('inactive');
        break;
      case(32):
        this.imgCardID = 'medium-card-';
        this.width = 8;
        this.height = 4;
        this.memoryCard = 'memory-card-md';
        this.board = mediumBoard;
        this.board.classList.remove('inactive');
        break;
      case(64):
        this.imgCardID = 'hard-card-';
        this.width = 8;
        this.height = 8;
        this.memoryCard = 'memory-card-lg';
        this.board = hardBoard;
        this.board.classList.remove('inactive');
        break;
      default:
        this.imgCardID = 'easy-card-';
        this.board = easyBoard;
        this.board.classList.remove('inactive');
        break;
      }
}

function displayHomePage() {
  gameBoard.classList.add('inactive');
  startPage.classList.remove('inactive');
  newGame.board.innerHTML = '';
  newGame.board.classList.add('inactive');
  clearInterval(newGame.timer);
  document.getElementById('time').innerHTML = '';
  document.getElementById('moves').innerHTML = '';
  document.getElementById('pairs').innerHTML = '';
}



function getFastestTimes(level) {

  let gameArray = [];

  switch(level) {
    case(16):
      gameArray = JSON.parse(localStorage.getItem('easyFastestTime'));
      break;
    case(32):
      gameArray = JSON.parse(localStorage.getItem('mediumFastestTime'));
      break;
    case(64):
      gameArray = JSON.parse(localStorage.getItem('hardFastestTime'));
      break;
  }

  return gameArray;
}


function compareFastestTimes(gameArray) {
  gameArray.push(newGame);
  gameArray.sort(function(a, b) {
    return a.time - b.time;
  });
  while (gameArray.length > 3) {
    gameArray.pop();
  }
}

function compareLeastMoves(gameArray) {
  gameArray.push(newGame);
  gameArray.sort(function(a, b) {
    return a.moves - b.moves;
  });
  while (gameArray.length > 3) {
    gameArray.pop();
  }
}


function setFastestTimes(board) {
  localStorage.setItem('games', JSON.stringify())

}



function getLeastMoves(level) {
  let gameArray = [];

  switch(level) {
    case(16):
      gameArray = JSON.parse(localStorage.getItem('easyLeastMoves'));
      break;
    case(32):
      gameArray = JSON.parse(localStorage.getItem('mediumLeastMoves'));
      break;
    case(64):
      gameArray = JSON.parse(localStorage.getItem('hardLeastMoves'));
      break;
  }
  return gameArray;
}



function setLeastMoves(board) {

}

function displayLeastMoves() {
  let leastMoves = document.querySelector('least-moves');
  let heading = document.createElement('h2');
  heading.textContent = 'Least Moves - ' + level + ' Board';
  leastMoves.append(heading);
  for (let game in gameArray) {
    let paragraph = document.createElement('p');
    let nameSpan = document.createElement('span');
    nameSpan.textContent = game.name;
    paragraph.append(nameSpan);
    let movesSpan = document.createElement('span');
    movesSpan.textContent = game.moves;
    paragraph.append(movesSpan);
    leastMoves.append(paragraph);
  }
}

function displayFastestTimes(gameArray) {
  let fastestTime = document.querySelector('fastest-time');
  let heading = document.createElement('h2');
  heading.textContent = 'Best Times - ' + level + ' Board';
  fastestTime.append(heading);
  for (let game in gameArray) {
    let paragraph = document.createElement('p');
    let nameSpan = document.createElement('span');
    nameSpan.textContent = game.name;
    paragraph.append(nameSpan);
    let timeSpan = document.createElement('span');
    timeSpan.textContent = game.time;
    paragraph.append(timeSpan);
    fastestTime.append(paragraph);
  }
}

function stopTimer() {
  clearInterval(newGame.timer);
}



function hasWon() {
  stopTimer();
  newGame.name = prompt("Please enter your name");
  // enter name
}





function turnCardUp(numCard) {
  let imgCard = newGame.imgCardID + numCard;
  document.getElementById(imgCard).src = newGame.deckArray[numCard - 1];
  newGame.checkCards.push(numCard);
  if (newGame.firstCard) {
    newGame.firstCard = false;
  }
  else {
    newGame.board.classList.add('no-click');
    newGame.firstCard = true;
    displayMoves();
    compareCards();
    displayFoundPairs();
  }
}

function turnCardDown() {
  document.getElementById(newGame.imgCardID + newGame.checkCards[0]).src = 'images/back.png';
  document.getElementById(newGame.imgCardID + newGame.checkCards[1]).src = 'images/back.png';
  document.getElementById(newGame.imgCardID + newGame.checkCards[0]).classList.remove('no-click');
  document.getElementById(newGame.imgCardID + newGame.checkCards[1]).classList.remove('no-click');
  newGame.checkCards = [];
  newGame.board.classList.remove('no-click');
}


function compareCards() {
  if (newGame.deckArray[newGame.checkCards[0] - 1] == newGame.deckArray[newGame.checkCards[1] - 1]){
    newGame.checkCards = [];
    newGame.foundPairs++;
    allPairsFound();
    newGame.board.classList.remove('no-click');
  }
  else {
    setTimeout(turnCardDown, 1500);
  }
}

function allPairsFound() {
  if (newGame.foundPairs == newGame.numPairs ) {
    document.querySelector('.result').textContent = 'You won!';
    stopTimer();
  }

}

function displayMoves() {
  newGame.moves++;
  document.getElementById('moves').textContent = newGame.moves;
}

function displayFoundPairs() {
    document.getElementById('pairs').textContent = newGame.foundPairs;
}
