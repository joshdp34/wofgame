let phrase = "";  // Start with an empty phrase
let messageBox = document.getElementById('message');
let phraseDisplay = document.getElementById('phraseDisplay');
let alphabetDisplay = document.getElementById('alphabetDisplay');
let inputLetter = document.getElementById('inputLetter');
let showSolutionBtn = document.getElementById('showSolutionBtn');
let newGameBtn = document.getElementById('newGameBtn');
let dialog = document.getElementById('dialog');
let startGameBtn = document.getElementById('startGameBtn');
let newPhraseInput = document.getElementById('newPhraseInput');

// Scrabble points for each letter
const scrabblePoints = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 
    'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 
    'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

// Function to create tiles for the phrase
function createTiles(phrase) {
    phraseDisplay.innerHTML = ''; // Clear existing tiles
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === ' ') {
            let space = document.createElement('div');
            space.classList.add('space'); // No tile for spaces
            phraseDisplay.appendChild(space);
        } else {
            let tile = document.createElement('div');
            tile.classList.add('tile');

            // Create front and back divs for the tile
            let front = document.createElement('div');
            front.classList.add('front');
            front.textContent = '';  // Show blank for letters

            let back = document.createElement('div');
            back.classList.add('back');
            back.textContent = phrase[i].toUpperCase();  // Set the back to the letter

            tile.appendChild(front);
            tile.appendChild(back);
            phraseDisplay.appendChild(tile);
        }
    }
}

// Function to display the alphabet with Scrabble points
function displayAlphabet() {
    alphabetDisplay.innerHTML = '';  // Clear previous alphabet
    for (let letter in scrabblePoints) {
        let letterDiv = document.createElement('div');
        letterDiv.classList.add('alphabet-letter');
        letterDiv.innerHTML = `<span class="letter">${letter}</span> <span class="points">- ${scrabblePoints[letter]}  </span>`;
        alphabetDisplay.appendChild(letterDiv);
    }
}

// Function to grey out guessed letters
function greyOutLetter(guessedLetter) {
    let letters = document.querySelectorAll('.alphabet-letter .letter');
    letters.forEach(letterElement => {
        if (letterElement.textContent === guessedLetter) {
            letterElement.parentElement.classList.add('guessed');
        }
    });
}

// Function to flip tile and reveal the letter
function flipTile(index) {
    let tiles = document.getElementsByClassName('tile');
    tiles[index].classList.add('flipped');
}

// Function to update displayed phrase with correct guesses
function updateDisplay(guess) {
    let correct = false;
    let tiles = document.getElementsByClassName('tile');
    let tileIndex = 0; // Index to track letters only, skip spaces
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] !== ' ') {
            if (phrase[i].toUpperCase() === guess) {
                flipTile(tileIndex);
                correct = true;
            }
            tileIndex++;
        }
    }

    // Grey out the guessed letter regardless of correctness
    greyOutLetter(guess);

    if (!correct) {
        messageBox.textContent = 'X';
        setTimeout(() => messageBox.textContent = '', 1000);  // Flash red X for incorrect guess
    }
    
    return correct;
}

// Handle keyboard input for guessing letters
inputLetter.addEventListener('input', function (e) {
    let guess = e.target.value.toUpperCase();
    e.target.value = '';  // Clear the input box

    if (!/[A-Z]/.test(guess)) return;  // Only accept letters
    
    updateDisplay(guess);
});

// Show the solution when the button is clicked
showSolutionBtn.addEventListener('click', function () {
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.add('flipped');  // Reveal all letters
    }
});

// New game button opens the dialog
newGameBtn.addEventListener('click', function () {
    dialog.style.display = 'block';
});

// Start game with the entered phrase
startGameBtn.addEventListener('click', function () {
    phrase = newPhraseInput.value.toUpperCase();
    createTiles(phrase);
    displayAlphabet();  // Display alphabet with Scrabble points
    dialog.style.display = 'none';
    inputLetter.focus();  // Set focus back to input box for guessing
});
