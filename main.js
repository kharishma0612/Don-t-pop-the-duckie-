const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let word = "JAVASCRIPT"; // The secret word
let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;
let displayWord;

function preload() {
    // No need to preload sprite sheets, we will use text and basic shapes
}

function create() {
    // Display the secret word as underscores
    displayWord = this.add.text(400, 100, getDisplayWord(), { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);

    // Create letter buttons as text objects
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const buttonSpacing = 50;
    let startX = 50;
    let startY = 300;

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const button = this.add.text(startX + (i % 13) * buttonSpacing, startY + Math.floor(i / 13) * buttonSpacing, letter, {
            font: '24px Arial',
            fill: '#000',
            backgroundColor: '#ddd',
            padding: { x: 10, y: 5 },
        })
        .setInteractive()
        .on('pointerdown', () => handleLetterGuess(letter));
    }

    // Add hangman drawing placeholder (a simple stick figure)
    this.hangman = this.add.container(400, 200);
    this.hangman.add(this.add.graphics().lineStyle(5, 0x000000));
    updateHangman(this.hangman);
}

function update() {
    // Update game logic if needed
}

function handleLetterGuess(letter) {
    if (guessedLetters.includes(letter)) return; // Ignore already guessed letters

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        // Correct guess
        displayWord.setText(getDisplayWord());

        if (getDisplayWord().replace(/ /g, '') === word) {
            endGame(true); // Player wins
        }
    } else {
        // Incorrect guess
        incorrectGuesses++;
        updateHangman(this.hangman);

        if (incorrectGuesses >= maxIncorrectGuesses) {
            endGame(false); // Player loses
        }
    }
}

function getDisplayWord() {
    return word
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function updateHangman(hangman) {
    // Clear previous drawing
    hangman.removeAll(true);

    // Redraw hangman based on incorrect guesses
    const graphics = this.add.graphics();
    graphics.lineStyle(5, 0x000000);

    // Drawing stages based on incorrect guesses
    if (incorrectGuesses >= 1) graphics.moveTo(400, 200).lineTo(400, 250); // Head
    if (incorrectGuesses >= 2) graphics.moveTo(400, 250).lineTo(400, 300); // Body
    if (incorrectGuesses >= 3) graphics.moveTo(400, 270).lineTo(375, 320); // Left arm
    if (incorrectGuesses >= 4) graphics.moveTo(400, 270).lineTo(425, 320); // Right arm
    if (incorrectGuesses >= 5) graphics.moveTo(400, 300).lineTo(375, 350); // Left leg
    if (incorrectGuesses >= 6) graphics.moveTo(400, 300).lineTo(425, 350); // Right leg

    hangman.add(graphics);
}

function endGame(won) {
    if (won) {
        alert('You win! The word was: ' + word);
    } else {
        alert('You lose! The word was: ' + word);
    }

    // Restart the game
    guessedLetters = [];
    incorrectGuesses = 0;
    displayWord.setText(getDisplayWord());
    updateHangman(this.hangman);
}
