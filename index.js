const sushiImg = 'images/sushi_';
let deckArray = [];
let deckSize = 16;
let checkCards = [];
let firstCard = true;
let score = 0;

const easyBoard = document.querySelector('.easy-board');

shuffleDeck(16);

easyBoard.addEventListener('click', function(event){
  turnCardUp(event.target.dataset.card);
})


function createCardDeck(level) {
  deckSize = level;
}

function shuffleDeck(numCards) {

  for (let i = 1; i <= numCards/2; i++) {
    let j = 0;
    while (j < 2) {
      let randomIndex = Math.floor(Math.random() * deckSize);
      if (deckArray[randomIndex] === undefined){
        deckArray[randomIndex] = sushiImg + i + '.png';
        j++;
     }
   }
  }
}


function dealDeck(x) {
  // lay out the cards in formation x rows by x columns
  for ( let card in deckArray) {

  }
}

function turnCardUp(numCard) {
  let imgCard = 'easy-card-' + numCard;
  document.getElementById(imgCard).src = deckArray[numCard - 1];
  checkCards.push(numCard);
  if (firstCard) {
    firstCard = false;
  }
  else {
    easyBoard.classList.add('no-click');
    firstCard = true;
    compareCards();
  }
}

function turnCardDown() {
  document.getElementById('easy-card-' + checkCards[0]).src = 'images/back.png';
  document.getElementById('easy-card-' + checkCards[1]).src = 'images/back.png';
  checkCards = [];
  easyBoard.classList.remove('no-click');
}


function compareCards() {
  if (deckArray[checkCards[0] - 1] == deckArray[checkCards[1] - 1]){
    score++;
    checkCards = [];
    easyBoard.classList.remove('no-click');
  }
  else {
    setTimeout(turnCardDown, 1500);
  }

}
