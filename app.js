const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const startGameButton = document.querySelector('.btn__reset');
const overlayScreen = document.getElementById('overlay');

startGameButton.addEventListener('click', () => {
  if (startGameButton.textContent === 'Start Game') {
    overlayScreen.style.display = 'none';
  } else {
    location.reload();
  }
});

let phrases = [
  "down to the wire",
  "keep your shirt on",
  "keep on truckin",
  "a piece of cake",
  "on the ropes",
  "playing for keeps",
  "go out on a limb",
  "eat my hat",
  "on the same page",
  "cut to the chase"
];

function getRandomPhraseAsArray(arr){
    //do stuff to any arr that is passed in
    let newArray = arr[Math.floor(Math.random() * arr.length)].split('');
    return newArray;
}


function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = arr[i];

    if (arr[i] === ' ') {
      listItem.className = 'space';
    } else {
      listItem.className = 'letter';
    }
   phrase.appendChild(listItem);
  }
}


function checkLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let letterMatch = null;
  for (let i = 0; i < letters.length; i++) {
    if (button === letters[i].textContent) {
      letters[i].classList.add('show');
      letterMatch = letters[i].textContent;
    }
  }
  return letterMatch;
}



qwerty.addEventListener('click', (e) => {
  const clicked = e.target;
  if (clicked.tagName === 'BUTTON') {
    clicked.className = 'chosen';
    clicked.disabled = true;
    const letterFound = checkLetter(clicked.textContent);
    if (letterFound === null) {
      missed++;
      let scoreImage = document.querySelector('#scoreboard ol img');
      scoreImage.remove();
    }
  }
  checkWin();
});

function checkWin() {
  const classShow = document.querySelectorAll('.show');
  const classLetters = document.querySelectorAll('.letter');
  const endGameDisplay = document.querySelector('#overlay h2');
  if (classShow.length === classLetters.length) {
    overlayScreen.className = 'win';
    endGameDisplay.textContent = "You Won";
    startGameButton.textContent = "Play Again";
    overlayScreen.style.display = 'flex';
  } else if (missed >= 5) {
    overlayScreen.className = 'lose';
    endGameDisplay.textContent = "Game Over";
    startGameButton.textContent = "Play Again";
    overlayScreen.style.display = 'flex';
  }
}

const randomArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomArray);
