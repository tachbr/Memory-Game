// add animation
// need to add for each card a front and back imagescan I do this on the fly???


const flipSound = new Audio('page.wav');
const cheerSound = new Audio('cheer.mp3');
const sushiImg = 'images/sushi_';
let newGame;


const gameBoard = document.querySelector('.game-board');
const startPage = document.querySelector('.start-page');
const scorePage = document.querySelector('.result-div');

const easyBoard = document.querySelector('.easy-board');
const mediumBoard = document.querySelector('.medium-board');
const hardBoard = document.querySelector('.hard-board');




const newGameButton = document.querySelector('.new-game-btn');
const homeButton = document.querySelector('.home-btn');
const scoreButton = document.querySelector('.score-btn');

startPage.addEventListener('click', startGame);
newGameButton.addEventListener('click', displayHomePage);
scoreButton.addEventListener('click', displayScoreBoard);
homeButton.addEventListener('click', displayHomePage);
easyBoard.addEventListener('click', onClick);
mediumBoard.addEventListener('click', onClick);
hardBoard.addEventListener('click', onClick);



function onClick(event){
  console.log(event.target.dataset.card);
  console.log(event.target.parentNode.parentNode);
  if (event.target.dataset.card) {
    event.target.classList.add('no-click');
    // turnCardUp(event.target.dataset.card);
    turnCardUp(event.target);
  }
}


function startGame(event) {
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



// function dealDeck() {
//   let cardNumber = 1;
//   for (let i = 0; i < newGame.height; i++) {
//     let row = document.createElement('div');
//
//     for (let j = 0; j < newGame.width; j++) {
//       // memory card is the container
//       let div = document.createElement('div');
//       div.classList.add(newGame.memoryCard);
//       // back of card
//       let divImg = document.createElement('img');
//       divImg.src = 'images/back.png';
//       divImg.id = newGame.imgCardID + cardNumber;
//       divImg.dataset.card = cardNumber;
//       // would need to change here to make front and back of card
//       // can I add in img src when the transition takes place
//       cardNumber++;
//       div.append(divImg);
//       row.append(div);
//     }
//     newGame.board.append(row);
//   }
// }



function dealDeck() {
  let cardNumber = 1;
  for (let i = 0; i < newGame.height; i++) {
    let row = document.createElement('div');

    for (let j = 0; j < newGame.width; j++) {
      // memory card is the container
      let div = document.createElement('div');
      div.classList.add(newGame.memoryCard);
      // back of card
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      let frontDiv = document.createElement('div');
      frontDiv.classList.add('card__face');
      frontDiv.classList.add('card__face--front');

      let frontImg = document.createElement('img');
      frontImg.src = 'images/back.png';
      // frontImg.id = newGame.imgCardID + cardNumber;
      frontImg.id = 'front' + cardNumber;
      //what do I use this for???
      frontImg.dataset.card = cardNumber;
      // would need to change here to make front and back of card
      // can I add in img src when the transition takes place

      frontDiv.append(frontImg);
      cardDiv.append(frontDiv);


      let backDiv = document.createElement('div');
      backDiv.classList.add('card__face');
      backDiv.classList.add('card__face--back');

      let backImg = document.createElement('img');
      backImg.src = '';
      backImg.id = 'back' + cardNumber;
      // what do I use these for
      backImg.dataset.card = cardNumber;
      backDiv.append(backImg);
      cardDiv.append(backDiv);

      div.append(cardDiv);

      row.append(div);
      cardNumber++;
    }
    newGame.board.append(row);
  }
}


function startTimer() {
  newGame.seconds = 0;
  newGame.minutes = 0;
  newGame.timer = setInterval(() => {
    newGame.seconds++;
    if (newGame.seconds == 60) {
      newGame.minutes++;
      newGame.seconds = 0;
    }
    let timeString = parseInt(newGame.minutes/10) == 0 ? '0' + newGame.minutes + ':' : newGame.minutes + '0';
    timeString += parseInt(newGame.seconds/10) == 0 ? '0' + newGame.seconds : newGame.seconds;
    document.getElementById('time').textContent = timeString;
  }, 1000);
}


function Score(name, level, time, moves) {
  this.name = name;
  this.level = level;
  this.time = time;
  this.moves = moves;
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
    this.seconds;
    this.minutes;
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
  scorePage.classList.add('inactive');
  startPage.classList.remove('inactive');
  clearSettingsGameBoard();
  clearSettingsScoreBoard();
}

function clearSettingsGameBoard() {
  newGame.board.innerHTML = '';
  newGame.board.classList.add('inactive');
  clearInterval(newGame.timer);
  document.getElementById('time').innerHTML = '';
  document.getElementById('moves').innerHTML = '';
  document.getElementById('pairs').innerHTML = '';
}

function clearSettingsScoreBoard() {
  document.querySelector('.fastest-time[data-level="16"]').innerHTML = '';
  document.querySelector('.fastest-time[data-level="32"]').innerHTML = '';
  document.querySelector('.fastest-time[data-level="64"]').innerHTML = '';
  document.querySelector('.least-moves[data-level="16"]').innerHTML = '';
  document.querySelector('.least-moves[data-level="32"]').innerHTML = '';
  document.querySelector('.least-moves[data-level="64"]').innerHTML = '';
}


function displayScoreBoard() {
  gameBoard.classList.add('inactive');
  scorePage.classList.remove('inactive');
  clearSettingsGameBoard();
  console.log(getScores(16, 'time'));

  displayFastestTimes(getScores(16, 'time'), 16);
  displayLeastMoves(getScores(16, 'moves'), 16);
  displayFastestTimes(getScores(32, 'time'), 32);
  displayLeastMoves(getScores(32, 'moves'), 32);
  displayFastestTimes(getScores(64, 'time'), 64);
  displayLeastMoves(getScores(64, 'moves'), 64);

}


function compareScores(scoreArray, newScore, comparison) {
  scoreArray.push(newScore);
  scoreArray.sort(function(a, b) {
    if (comparison == 'moves') {
      return a.moves - b.moves;
    }
    else if (comparison == 'time'){
      return a.time - b.time;
    }

  });
  while (scoreArray.length > 5) {
    scoreArray.pop();
  }
  return scoreArray;
}


function setScores(scoreArray, arrayName, level) {
  let stringName = arrayName + level;
  localStorage.setItem(stringName, JSON.stringify(scoreArray));
}



function getScores(level, type) {
  let scoreArray = [];

  switch(level) {
    case(16):
      if (type == 'moves') {
        scoreArray = JSON.parse(localStorage.getItem('moves16')) || [];
      }
      if (type == 'time') {
        scoreArray = JSON.parse(localStorage.getItem('time16')) || [];
      }
      break;
    case(32):
      if (type == 'moves') {
        scoreArray = JSON.parse(localStorage.getItem('moves32')) || [];
      }
      if (type == 'time') {
        scoreArray = JSON.parse(localStorage.getItem('time32')) || [];
      }
      break;
    case(64):
      if (type == 'moves') {
        scoreArray = JSON.parse(localStorage.getItem('moves64')) || [];
      }
      if (type == 'time') {
        scoreArray = JSON.parse(localStorage.getItem('time64')) || [];
      }
      break;
  }
  return scoreArray;
}


function displayLeastMoves(scoreArray, level) {
  let scoreDiv;
  switch(level){
    case(16):
      scoreDiv = document.querySelector('.least-moves[data-level="16"]');
      break;
    case(32):
      scoreDiv = document.querySelector('.least-moves[data-level="32"]');
      break;
    case(64):
      scoreDiv = document.querySelector('.least-moves[data-level="64"]');
      break;
    default:
      break;
  }

  scoreArray.forEach(score => {
    let row = document.createElement('div');
    row.classList.add('row');

    let nameDiv = document.createElement('div');
    nameDiv.textContent = score.name;
    row.append(nameDiv);

    let moveDiv = document.createElement('div');
    moveDiv.textContent = score.moves;
    row.append(moveDiv);

    let timeDiv = document.createElement('div');
    let timeString = Math.floor(parseInt(score.time) / 60) + ':' + parseInt(score.time) % 60;
    timeDiv.textContent = timeString;
    row.append(timeDiv);

    scoreDiv.append(row);
  })

  if (scoreArray && scoreArray.length < 5) {
    displayEmpty(scoreArray.length, scoreDiv);
  }
  else if (!scoreArray) {
    displayEmpty(0, scoreDiv);
  }
}

function displayFastestTimes(scoreArray, level) {
  let scoreDiv;

  switch(level){
    case(16):
      scoreDiv = document.querySelector('.fastest-time[data-level="16"]');
      break;
    case(32):
      scoreDiv = document.querySelector('.fastest-time[data-level="32"]');
      break;
    case(64):
      scoreDiv = document.querySelector('.fastest-time[data-level="64"]');
      break;
    default:
      break;
  }

  scoreArray.forEach(score => {
    let row = document.createElement('div');
    row.classList.add('row');
    let nameDiv = document.createElement('div');
    nameDiv.textContent = score.name;
    row.append(nameDiv);
    let timeDiv = document.createElement('div');
    let timeString = Math.floor(parseInt(score.time) / 60) + ':' + parseInt(score.time) % 60;
    timeDiv.textContent = timeString;
    row.append(timeDiv);
    let moveDiv = document.createElement('div');
    moveDiv.textContent = score.moves;
    row.append(moveDiv);
    scoreDiv.append(row);
  })

  if (scoreArray && scoreArray.length < 5) {
    displayEmpty(scoreArray.length, scoreDiv);
  }
  else if (!scoreArray) {
    displayEmpty(0, scoreDiv);
  }


}


function displayEmpty(numRows, element){

  for (let i = 0; i < 5 - numRows; i++){
    let row = document.createElement('div');
    row.classList.add('row');
    row.append(document.createElement('div'));
    row.append(document.createElement('div'));
    row.append(document.createElement('div'));
    element.append(row);
  }

}

function stopTimer() {
  clearInterval(newGame.timer);
  newGame.time = newGame.seconds + (newGame.minutes * 60);
}



function hasWon() {
  stopTimer();
  cheerSound.play();
  let userName = prompt("Please enter your name");
  let gameScore = new Score(userName, newGame.deckSize, newGame.time, newGame.moves);
  console.log(gameScore);
  let currentFastestScores = getScores(gameScore.level, 'time');
  currentFastestScores = compareScores(currentFastestScores, gameScore, 'time');
  setScores(currentFastestScores, 'time', gameScore.level);
  let currentLeastMovesScores = getScores(gameScore.level, 'moves');
  currentLeastMovesScores = compareScores(currentLeastMovesScores, gameScore, 'moves');
  setScores(currentLeastMovesScores, 'moves', gameScore.level);

}



//find card using data-card number plus identifier saved in game object
//change identifier in game object to front and back

function turnCardUp(numCard) {
  console.log(numCard);
  console.log(numCard.dataset.card);

  // let imgCard = newGame.imgCardID + numCard;
  let imgCard = 'back' + numCard.dataset.card;
  document.getElementById(imgCard).src = newGame.deckArray[numCard.dataset.card - 1];
  flipSound.play();
  numCard.parentNode.parentNode.classList.add('is-flipped');

  newGame.checkCards.push(numCard.dataset.card);
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
  let frontNode1 = document.getElementById('front' + newGame.checkCards[0]);
  frontNode1.src = 'images/back.png';
  frontNode1.classList.remove('no-click');
  flipSound.play();
  frontNode1.parentNode.parentNode.classList.remove('is-flipped');

  let frontNode2 = document.getElementById('front' + newGame.checkCards[1]);
  frontNode2.src = 'images/back.png';
  frontNode2.classList.remove('no-click');
  frontNode2.parentNode.parentNode.classList.remove('is-flipped');

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
    // document.querySelector('.result').textContent = 'You won!';
    hasWon();
  }

}

function displayMoves() {
  newGame.moves++;
  document.getElementById('moves').textContent = newGame.moves;
}

function displayFoundPairs() {
    document.getElementById('pairs').textContent = newGame.foundPairs;
}
