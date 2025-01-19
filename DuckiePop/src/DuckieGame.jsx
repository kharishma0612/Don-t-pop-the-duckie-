import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Laptop, Headphones, AlertCircle } from 'lucide-react';
import './DuckieGame.css'; // Import the CSS file

const words = [
  'REACT',
  'PYTHON',
  'NEURAL',
  'DOCKER',
  'GITHUB'
];

const DuckieGame = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= 5) {
        setGameStatus('lost');
      }
    } else {
      const isWordComplete = [...word].every(char => newGuessedLetters.has(char));
      if (isWordComplete) {
        setGameStatus('won');
      }
    }
  };

  const renderDuckie = () => {
    return (
      <div className="duckie">
        {/* Pool */}
        <div className="pool" style={{ opacity: Math.max(0, 1 - (wrongGuesses * 0.2)) }} />

        {/* Duckie */}
        <div className="duckie-body">
          <div className="duckie-eyes">
            <span></span>
            <span></span>
          </div>
          <div className="duckie-beak"></div>
        </div>

        {/* Accessories */}
        {wrongGuesses < 2 && (
          <Headphones className="absolute -top-4 left-1/2 transform -translate-x-1/2" size={24} color="#333" />
        )}
        {wrongGuesses < 3 && (
          <Laptop className="absolute -right-8 top-4" size={24} color={wrongGuesses >= 2 ? "#666" : "#333"} />
        )}

        {/* Game over effects */}
        {gameStatus === 'lost' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="alert-circle" />
          </div>
        )}
      </div>
    );
  };

  const renderWord = () => {
    return (
      <div className="word-container">
        {[...word].map((letter, index) => (
          <span key={index}>
            {guessedLetters.has(letter) ? letter : '_'}
          </span>
        ))}
      </div>
    );
  };

  const renderKeyboard = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
      <div className="keyboard">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
            className="button"
          >
            {letter}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="container">
      <div className="game-header">Don't Pop the Duckie!</div>
      <p className="game-subheader">Wrong guesses: {wrongGuesses}/5</p>

      {renderDuckie()}
      {renderWord()}
      {renderKeyboard()}

      {gameStatus !== 'playing' && (
        <div className="play-again">
          <p>
            {gameStatus === 'won' ? 'Congratulations! You saved the duckie!' : 'Oh no! The duckie popped!'}
          </p>
          <Button onClick={startNewGame}>Play Again</Button>
        </div>
      )}
    </Card>
  );
};

export default DuckieGame;
