import React, { useState, useEffect } from 'react';
import './DuckieGame.css'; // Import your CSS file
import { Link } from "react-router-dom";

const TwoPlayer = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
  const [boosters, setBoosters] = useState(3);
  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(3);
  const [inputWord, setInputWord] = useState('');

  const startGame = () => {
    if (inputWord.trim()) {
      setTargetWord(inputWord.toLowerCase());
      setGameState('playing');
      setGuessedLetters([]);
      setWrongGuesses(0);
      setScore(0);
      setBoosters(3);
      setHints(3);
      setUndoCount(3);
    }
  };

  const handleLetterClick = (letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (targetWord.includes(letter)) {
      setScore((prev) => prev + 10);
    } else {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (wrongGuesses >= 4) {
      setGameState('lost');
    } else if (targetWord && targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
      setGameState('won');
    }
  }, [guessedLetters, wrongGuesses, targetWord]);

  const renderWord = () => {
    return targetWord.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
  };

  const getDuckieImage = () => {
    // Change the duck image based on the wrong guesses
    if (wrongGuesses === 0) {
      return '/icons/duck.png';
    } else if (wrongGuesses === 1) {
      return '/icons/duck1.png';
    } else if (wrongGuesses === 2) {
      return '/icons/duck2.png';
    } else if (wrongGuesses === 3) {
      return '/icons/duck3.png';
    } else {
      return '/icons/duck4.png'; // After 4 wrong guesses
    }
  };

  const renderKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet.split('').map((letter) => (
      <button
        key={letter}
        className="keyboard-key"
        disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
        onClick={() => handleLetterClick(letter)}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="desktop-1">
      <Link to="/">
        <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
      </Link>
      <div className="title">
        <img className="titleimg" src="/icons/logo.png" alt="title" />
      </div>

      {gameState === 'playing' && (
        <div className="duckie-pool">
          <img className="duckie-image" src={getDuckieImage()} alt="Duckie" />
        </div>
      )}

      {gameState === 'waiting' ? (
        <div className="word-input-container">
          <input
            type="text"
            className="word-input"
            placeholder="Enter word to be guessed"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
          <button className="start-button" onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="header">
            <div className="score">Score: {score}</div>
            <div className="wrong-guesses">Moves left: {4 - wrongGuesses}</div>
          </div>

          {/* Show "You Won!" or "You Lost!" */}
          {gameState === 'won' && <div className="game-message">🎉 You Won! 🎉</div>}
          {gameState === 'lost' && <div className="game-message">😢 You Lost! Try Again!</div>}

          <div className="word-display">{renderWord()}</div>
          <div className="keyboard">{renderKeyboard()}</div>

          {/* Restart Button */}
          {(gameState === 'won' || gameState === 'lost') && (
            <button className="restart-button" onClick={() => setGameState('waiting')}>
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TwoPlayer;
