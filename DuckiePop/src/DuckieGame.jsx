import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Laptop, Headphones, AlertCircle, Zap, Lightbulb, RotateCcw } from 'lucide-react';
import './DuckieGame.css'; // Import the CSS file

const words = [
  'REACT',
  'PYTHON',
  'NEURAL',
  'DOCKER',
  'GITHUB',
];

const DuckieGame = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [boostersLeft, setBoostersLeft] = useState(3); // Example booster count
  const [hintsLeft, setHintsLeft] = useState(3); // Example hint count
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0); // Add this state for tracking score


  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
    setBoostersLeft(3);
    setHintsLeft(3);
    setHistory([]);
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);
    setHistory((prev) => [...prev, letter]);

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= 5) {
        setGameStatus('lost');
      }
    } else {
      // Add 10 points for each correct guess
      setScore((prevScore) => prevScore + 10);
      const isWordComplete = [...word].every((char) =>
        newGuessedLetters.has(char)
      );
      if (isWordComplete) {
        setGameStatus('won');
      }
    }
  };

  const useBooster = () => {
    if (boostersLeft <= 0 || gameStatus !== 'playing') return;

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const unusedLetters = alphabet.filter(
      (letter) => !guessedLetters.has(letter) && !word.includes(letter)
    );

    if (unusedLetters.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedLetters.length);
      const letterToReveal = unusedLetters[randomIndex];

      const newGuessedLetters = new Set(guessedLetters);
      newGuessedLetters.add(letterToReveal);
      setGuessedLetters(newGuessedLetters);
      setHistory((prev) => [...prev, letterToReveal]);
      setBoostersLeft((prev) => prev - 1);

      // Check if the word is complete
      const isWordComplete = [...word].every((char) => newGuessedLetters.has(char));
      if (isWordComplete) {
        setGameStatus('won');
      }
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0 || gameStatus !== 'playing') return;

    const unrevealedLetters = [...word].filter(
      (letter) => !guessedLetters.has(letter)
    );

    if (unrevealedLetters.length > 0) {
      const randomIndex = Math.floor(Math.random() * unrevealedLetters.length);
      const letterToReveal = unrevealedLetters[randomIndex];

      const newGuessedLetters = new Set(guessedLetters);
      newGuessedLetters.add(letterToReveal);
      setGuessedLetters(newGuessedLetters);
      setHistory((prev) => [...prev, letterToReveal]);
      setHintsLeft((prev) => prev - 1);

      // Check if the word is complete
      const isWordComplete = [...word].every((char) => newGuessedLetters.has(char));
      if (isWordComplete) {
        setGameStatus('won');
      }
    }
  };

  const undoGuess = () => {
    if (history.length === 0 || gameStatus !== 'playing') return;

    const lastGuess = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.delete(lastGuess);
    setGuessedLetters(newGuessedLetters);

    if (!word.includes(lastGuess)) {
      setWrongGuesses(wrongGuesses - 1);
    }
  };

  const renderWord = () => {
    return (
      <div className="word-container">
        {[...word].map((letter, index) => (
          <div key={index} className="letter-container">
            {/* Coin symbol */}
            {!guessedLetters.has(letter) && <span className="coin">💰</span>}
            {/* Letter or Dash */}
            <span className="letter">
              {guessedLetters.has(letter) ? letter : '_'}
            </span>
          </div>
        ))}
      </div>
    );
  };



  const renderDuckie = () => {
    return (
      <div className="duckie">
        <div className="pool" style={{ opacity: Math.max(0, 1 - wrongGuesses * 0.2) }} />
        <div className="duckie-body">
          <div className="duckie-eyes">
            <span></span>
            <span></span>
          </div>
          <div className="duckie-beak"></div>
        </div>
        {wrongGuesses < 2 && (
          <Headphones className="absolute -top-4 left-1/2 transform -translate-x-1/2" size={24} color="#333" />
        )}
        {wrongGuesses < 3 && (
          <Laptop className="absolute -right-8 top-4" size={24} color={wrongGuesses >= 2 ? "#666" : "#333"} />
        )}
        {gameStatus === 'lost' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="alert-circle" />
          </div>
        )}
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

      <p className="game-subheader">
        Boosters Left: {boostersLeft} | Hints Left: {hintsLeft}
      </p>
      <div className="score-container">
        <span>Score: {score}</span>
      </div>


      {renderDuckie()}
      {renderWord()}
      {renderKeyboard()}

      <div className="actions">
        <Button className="icon-button" onClick={useBooster} disabled={boostersLeft <= 0 || gameStatus !== 'playing'}>
          <Zap className="icon" /> Booster ({boostersLeft})
        </Button>
        <Button className="icon-button" onClick={useHint} disabled={hintsLeft <= 0 || gameStatus !== 'playing'}>
          <Lightbulb className="icon" /> Hint ({hintsLeft})
        </Button>
        <Button className="icon-button" onClick={undoGuess} disabled={history.length === 0 || gameStatus !== 'playing'}>
          <RotateCcw className="icon" /> Undo
        </Button>
      </div>

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
