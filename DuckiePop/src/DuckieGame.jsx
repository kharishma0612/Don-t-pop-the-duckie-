// import { useState, useEffect } from 'react';
// import Card from '@/components/ui/card';
// import Button from '@/components/ui/button';
// import { Laptop, Headphones, AlertCircle, Zap, Lightbulb, RotateCcw } from 'lucide-react';
// import './DuckieGame.css'; // Import the CSS file

// const words = [
//   'REACT',
//   'PYTHON',
//   'NEURAL',
//   'DOCKER',
//   'GITHUB',
// ];

// const DuckieGame = () => {
//   const [word, setWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState(new Set());
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
//   const [boostersLeft, setBoostersLeft] = useState(3); // Example booster count
//   const [hintsLeft, setHintsLeft] = useState(3); // Example hint count
//   const [history, setHistory] = useState([]);
//   const [score, setScore] = useState(0); // Add this state for tracking score


//   useEffect(() => {
//     startNewGame();
//   }, []);

//   const startNewGame = () => {
//     const randomWord = words[Math.floor(Math.random() * words.length)];
//     setWord(randomWord);
//     setGuessedLetters(new Set());
//     setWrongGuesses(0);
//     setGameStatus('playing');
//     setBoostersLeft(3);
//     setHintsLeft(3);
//     setHistory([]);
//   };

//   const handleGuess = (letter) => {
//     if (gameStatus !== 'playing') return;

//     const newGuessedLetters = new Set(guessedLetters);
//     newGuessedLetters.add(letter);
//     setGuessedLetters(newGuessedLetters);
//     setHistory((prev) => [...prev, letter]);

//     if (!word.includes(letter)) {
//       const newWrongGuesses = wrongGuesses + 1;
//       setWrongGuesses(newWrongGuesses);
//       if (newWrongGuesses >= 5) {
//         setGameStatus('lost');
//       }
//     } else {
//       // Add 10 points for each correct guess
//       setScore((prevScore) => prevScore + 10);
//       const isWordComplete = [...word].every((char) =>
//         newGuessedLetters.has(char)
//       );
//       if (isWordComplete) {
//         setGameStatus('won');
//       }
//     }
//   };

//   const useBooster = () => {
//     if (boostersLeft <= 0 || gameStatus !== 'playing') return;

//     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//     const unusedLetters = alphabet.filter(
//       (letter) => !guessedLetters.has(letter) && !word.includes(letter)
//     );

//     if (unusedLetters.length > 0) {
//       const randomIndex = Math.floor(Math.random() * unusedLetters.length);
//       const letterToReveal = unusedLetters[randomIndex];

//       const newGuessedLetters = new Set(guessedLetters);
//       newGuessedLetters.add(letterToReveal);
//       setGuessedLetters(newGuessedLetters);
//       setHistory((prev) => [...prev, letterToReveal]);
//       setBoostersLeft((prev) => prev - 1);

//       // Check if the word is complete
//       const isWordComplete = [...word].every((char) => newGuessedLetters.has(char));
//       if (isWordComplete) {
//         setGameStatus('won');
//       }
//     }
//   };

//   const useHint = () => {
//     if (hintsLeft <= 0 || gameStatus !== 'playing') return;

//     const unrevealedLetters = [...word].filter(
//       (letter) => !guessedLetters.has(letter)
//     );

//     if (unrevealedLetters.length > 0) {
//       const randomIndex = Math.floor(Math.random() * unrevealedLetters.length);
//       const letterToReveal = unrevealedLetters[randomIndex];

//       const newGuessedLetters = new Set(guessedLetters);
//       newGuessedLetters.add(letterToReveal);
//       setGuessedLetters(newGuessedLetters);
//       setHistory((prev) => [...prev, letterToReveal]);
//       setHintsLeft((prev) => prev - 1);

//       // Check if the word is complete
//       const isWordComplete = [...word].every((char) => newGuessedLetters.has(char));
//       if (isWordComplete) {
//         setGameStatus('won');
//       }
//     }
//   };

//   const undoGuess = () => {
//     if (history.length === 0 || gameStatus !== 'playing') return;

//     const lastGuess = history[history.length - 1];
//     const newHistory = history.slice(0, -1);
//     setHistory(newHistory);

//     const newGuessedLetters = new Set(guessedLetters);
//     newGuessedLetters.delete(lastGuess);
//     setGuessedLetters(newGuessedLetters);

//     if (!word.includes(lastGuess)) {
//       setWrongGuesses(wrongGuesses - 1);
//     }
//   };

//   const renderWord = () => {
//     return (
//       <div className="word-container">
//         {[...word].map((letter, index) => (
//           <div key={index} className="letter-container">
//             {/* Coin symbol */}
//             {!guessedLetters.has(letter) && <span className="coin">💰</span>}
//             {/* Letter or Dash */}
//             <span className="letter">
//               {guessedLetters.has(letter) ? letter : '_'}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   };



//   const renderDuckie = () => {
//     return (
//       <div className="duckie">
//         <div className="pool" style={{ opacity: Math.max(0, 1 - wrongGuesses * 0.2) }} />
//         <div className="duckie-body">
//           <div className="duckie-eyes">
//             <span></span>
//             <span></span>
//           </div>
//           <div className="duckie-beak"></div>
//         </div>
//         {wrongGuesses < 2 && (
//           <Headphones className="absolute -top-4 left-1/2 transform -translate-x-1/2" size={24} color="#333" />
//         )}
//         {wrongGuesses < 3 && (
//           <Laptop className="absolute -right-8 top-4" size={24} color={wrongGuesses >= 2 ? "#666" : "#333"} />
//         )}
//         {gameStatus === 'lost' && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <AlertCircle className="alert-circle" />
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderKeyboard = () => {
//     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//     return (
//       <div className="keyboard">
//         {alphabet.map((letter) => (
//           <Button
//             key={letter}
//             onClick={() => handleGuess(letter)}
//             disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
//             className="button"
//           >
//             {letter}
//           </Button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Card className="container">
//       <div className="game-header">Don't Pop the Duckie!</div>
//       <p className="game-subheader">Wrong guesses: {wrongGuesses}/5</p>

//       <p className="game-subheader">
//         Boosters Left: {boostersLeft} | Hints Left: {hintsLeft}
//       </p>
//       <div className="score-container">
//         <span>Score: {score}</span>
//       </div>


//       {renderDuckie()}
//       {renderWord()}
//       {renderKeyboard()}

//       <div className="actions">
//         <Button className="icon-button" onClick={useBooster} disabled={boostersLeft <= 0 || gameStatus !== 'playing'}>
//           <Zap className="icon" /> Booster ({boostersLeft})
//         </Button>
//         <Button className="icon-button" onClick={useHint} disabled={hintsLeft <= 0 || gameStatus !== 'playing'}>
//           <Lightbulb className="icon" /> Hint ({hintsLeft})
//         </Button>
//         <Button className="icon-button" onClick={undoGuess} disabled={history.length === 0 || gameStatus !== 'playing'}>
//           <RotateCcw className="icon" /> Undo
//         </Button>
//       </div>

//       {gameStatus !== 'playing' && (
//         <div className="play-again">
//           <p>
//             {gameStatus === 'won' ? 'Congratulations! You saved the duckie!' : 'Oh no! The duckie popped!'}
//           </p>
//           <Button onClick={startNewGame}>Play Again</Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default DuckieGame;
// import React from 'react';
// import './DuckieGame.css'; // Import your CSS file

// const DuckieGame = () => {
//   return (
//     <div className="desktop-1">
//       {/* Background and layout elements */}
//       <div className="rectangle-1"></div>
//       <div className="ellipse-106"></div>
//       <div className="ellipse-105"></div>
//       <div className="line-1"></div>
//       <div className="line-2"></div>
//       <div className="line-3"></div>
//       <div className="line-4"></div>
//       <div className="line-6"></div>
//       <div className="line-7"></div>
//       <div className="rectangle-2"></div>
//       <div className="rectangle-29"></div>
//       <div className="rectangle-33"></div>
      
//       {/* Title Section */}
//       <div className="title">
//         <img className="titleimg" src="/icons/logo.png" alt="title" />
//       </div>
      
//       {/* Hint, Eraser, and Bomb Icons */}
//       <img className="hint" src="/icons/hint.ico" alt="Hint Icon" />
//       <img className="eraser" src="/icons/eraser.ico" alt="Eraser Icon" />
//       <img className="bomb" src="/icons/bomb.ico" alt="Bomb Icon" />
      
//       {/* Keyboard Layout */}
//       <div className="keyboard">
//         <div className="rectangle-3"></div>
//         <div className="rectangle-4"></div>
//         <div className="rectangle-5"></div>
//         <div className="rectangle-6"></div>
//         <div className="rectangle-7"></div>
//         <div className="rectangle-8"></div>
//         <div className="rectangle-9"></div>
//         <div className="rectangle-10"></div>
//         <div className="rectangle-11"></div>
//         <div className="rectangle-12"></div>
//         <div className="rectangle-13"></div>
//         <div className="rectangle-14"></div>
//         <div className="rectangle-15"></div>
//         <div className="rectangle-16"></div>
//         <div className="rectangle-17"></div>
//         <div className="rectangle-18"></div>
//         <div className="rectangle-19"></div>
//         <div className="rectangle-20"></div>
//         <div className="rectangle-21"></div>
//         <div className="rectangle-22"></div>
//         <div className="rectangle-23"></div>
//         <div className="rectangle-24"></div>
//         <div className="rectangle-25"></div>
//         <div className="rectangle-26"></div>
//         <div className="rectangle-27"></div>
//         <div className="rectangle-28"></div>
//       </div>

//       {/* Alphabet Keys */}
//       <div className="alphabet-keys">
//         <div className="a">a</div>
//         <div className="b">b</div>
//         <div className="c">c</div>
//         <div className="d">d</div>
//         <div className="e">e</div>
//         <div className="f">f</div>
//         <div className="g">g</div>
//         <div className="h">h</div>
//         <div className="i">i</div>
//         <div className="j">j</div>
//         <div className="k">k</div>
//         <div className="l">l</div>
//         <div className="m">m</div>
//         <div className="n">n</div>
//         <div className="o">o</div>
//         <div className="p">p</div>
//         <div className="q">q</div>
//         <div className="r">r</div>
//         <div className="s">s</div>
//         <div className="t">t</div>
//         <div className="u">u</div>
//         <div className="v">v</div>
//         <div className="w">w</div>
//         <div className="x">x</div>
//         <div className="y">y</div>
//         <div className="z">z</div>
//       </div>

//       {/* Game Stats */}
//       <div className="stats">
//         <div className="bulbs">2</div>
//         <div className="bombs">3</div>
//         <div className="erasers">2</div>
//         <img className="coinsimg" src="/icons/coins.ico" alt="Coins Icon" />
//         <div className="coins">420</div>
//       </div>

//       {/* Duck Image and Home Icon */}
//       <img
//         className="screenshot-2025-01-13-233312-1"
//         src="icons/duck.png"
//         alt="Duck Screenshot"
//       />
//       <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//     </div>
//   );
// };

// export default DuckieGame;
// import React, { useState, useEffect } from 'react';
// import './DuckieGame.css'; // Import your CSS file
// import { Link } from "react-router-dom";


// const words = ['javascript', 'react', 'hangman', 'duck', 'coding']; // Word list

// const DuckieGame = () => {
//   // Game States
//   const words = JSON.parse(localStorage.getItem('gameWords')) || ['javascript', 'react', 'hangman', 'duck', 'coding'];
//   const selectedCategory = localStorage.getItem('selectedCategory') || 'Default';
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [score, setScore] = useState(0);
//   const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
//   const [boosters, setBoosters] = useState(3);
//   const [hints, setHints] = useState(3);
//   const [undoCount, setUndoCount] = useState(3); // Added undo count state

//   useEffect(() => {
//     startNewGame();
//   }, []);

//   const startNewGame = () => {
//     const randomWord = words[Math.floor(Math.random() * words.length)];
//     setTargetWord(randomWord);
//     setGuessedLetters([]);
//     setWrongGuesses(0);
//     setScore(0);
//     setGameState('playing');
//     setBoosters(3);
//     setHints(3);
//     setUndoCount(3); // Reset undo count on new game
//   };

//   const handleLetterClick = (letter) => {
//     if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

//     setGuessedLetters((prev) => [...prev, letter]);

//     if (targetWord.includes(letter)) {
//       setScore((prev) => prev + 10);
//     } else {
//       setWrongGuesses((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     if (wrongGuesses >= 4) {
//       setGameState('lost');
//     } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//       setGameState('won');
//     }
//   }, [guessedLetters, wrongGuesses, targetWord]);

//   const useHint = () => {
//     if (hints > 0 && gameState === 'playing') {
//       const hiddenLetters = targetWord.split('').filter((letter) => !guessedLetters.includes(letter));
//       if (hiddenLetters.length > 0) {
//         const randomHint = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
//         setGuessedLetters((prev) => [...prev, randomHint]);
//         setHints((prev) => prev - 1);
//       }
//     }
//   };

//   const useBooster = () => {
//     if (boosters > 0 && gameState === 'playing') {
//       const unusedLetters = 'abcdefghijklmnopqrstuvwxyz'
//         .split('')
//         .filter((letter) => !guessedLetters.includes(letter) && !targetWord.includes(letter));
//       if (unusedLetters.length > 0) {
//         const randomBooster = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
//         setGuessedLetters((prev) => [...prev, randomBooster]);
//         setBoosters((prev) => prev - 1);
//       }
//     }
//   };

//   const undoLastGuess = () => {
//     if (guessedLetters.length > 0 && gameState === 'playing' && undoCount > 0) {
//       const lastGuess = guessedLetters[guessedLetters.length - 1];
//       setGuessedLetters((prev) => prev.slice(0, -1));
//       if (!targetWord.includes(lastGuess)) {
//         setWrongGuesses((prev) => prev - 1);
//       }
//       setUndoCount((prev) => prev - 1); // Reduce undo count
//     }
//   };

//   const renderWord = () => {
//     return targetWord.split('').map((letter, index) => (
//       <span key={index} className="letter">
//         {guessedLetters.includes(letter) ? letter : '_'}
//       </span>
//     ));
//   };

//   const renderKeyboard = () => {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//     return alphabet.split('').map((letter) => (
//       <button
//         key={letter}
//         className="keyboard-key"
//         disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
//         onClick={() => handleLetterClick(letter)}
//       >
//         {letter}
//       </button>
//     ));
//   };

//   const getDuckieImage = () => {
//     // Change the duck image based on the wrong guesses
//     if (wrongGuesses === 0) {
//       return '/icons/duck.png';
//     } else if (wrongGuesses === 1) {
//       return '/icons/duck1.png';
//     } else if (wrongGuesses === 2) {
//       return '/icons/duck2.png';
//     } else if (wrongGuesses === 3) {
//       return '/icons/duck3.png';
//     } else {
//       return '/icons/duck4.png'; // After 4 wrong guesses
//     }
//   };

//   return (
//     <div className="desktop-1">
//       {/* Left Side for Duckie */}
//       <Link to="/">
//             <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
//       </Link>
//       <div className="title">
//          <img className="titleimg" src="/icons/logo.png" alt="title" />
//        </div>
//       <div className="duckie-pool">
//         <img className="duckie-image" src={getDuckieImage()} alt="Duckie" />
//       </div>
//       <img className="coinsimg" src="/icons/coins.ico" alt="Coins Icon" />
//       <div className="coins">420</div>
//       {/* Right Side for Game Content */}
//       <div className="game-container">
//         <div className="header">
//           <div className="score">Score: {score}</div>
//           <div className="boosters">Boosters: {boosters}</div>
//           <div className="hints">Hints: {hints}</div>
//           <div className="wrong-guesses">moves: {4 - wrongGuesses}</div> {/* Display remaining wrong guesses */}
//           <div className="undo-count">Undo: {undoCount}</div> {/* Display undo count */}
//         </div>
//         <div className="word-display">{renderWord()}</div>
//         <div className="keyboard">{renderKeyboard()}</div>
//         <div className="actions">
//           <button className="action-button" onClick={useHint} disabled={hints <= 0}>
//           <img className="hint" src="/icons/hint.ico" alt="Hint Icon" />
//           </button>
//           <button className="action-button" onClick={useBooster} disabled={boosters <= 0}>
          
//           <img className="bomb" src="/icons/bomb.ico" alt="Bomb Icon" />
//           </button>
//           <button className="action-button" onClick={undoLastGuess} disabled={undoCount <= 0 || guessedLetters.length === 0}>
//           <img className="eraser" src="/icons/eraser.ico" alt="Eraser Icon" />
//           </button>
//         </div>
//         {gameState !== 'playing' && <div className="game-message">{gameState === 'won' ? 'You Win!' : 'You Lose!'}</div>}

//         {/* Restart Button */}
//         <div className="restart-container">
//           <button className="restart-button" onClick={startNewGame}>
//             Restart Game
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DuckieGame;
import React, { useState, useEffect } from 'react';
import './DuckieGame.css'; // Import your CSS file
import { Link } from "react-router-dom";

const DuckieGame = () => {
  // Game States
  const words = JSON.parse(localStorage.getItem('gameWords')) || ['javascript', 'react', 'hangman', 'duck', 'coding'];
  const selectedCategory = localStorage.getItem('selectedCategory') || 'Default';
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('initial'); // 'initial', 'playing', 'won', 'lost'
  const [boosters, setBoosters] = useState(3);
  const [hints, setHints] = useState(3);
  const [undoCount, setUndoCount] = useState(3);

  // Initialize the game when the component mounts
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setScore(0);
    setBoosters(3);
    setHints(3);
    setUndoCount(3);
    setGameState('playing'); // Set game state to 'playing' after initializing the word
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
    if (gameState === 'playing') {
      if (wrongGuesses >= 4) {
        setGameState('lost');
      } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
        setGameState('won');
      }
    }
  }, [guessedLetters, wrongGuesses, targetWord, gameState]);

  const useHint = () => {
    if (hints > 0 && gameState === 'playing') {
      const hiddenLetters = targetWord.split('').filter((letter) => !guessedLetters.includes(letter));
      if (hiddenLetters.length > 0) {
        const randomHint = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
        setGuessedLetters((prev) => [...prev, randomHint]);
        setHints((prev) => prev - 1);
      }
    }
  };

  const useBooster = () => {
    if (boosters > 0 && gameState === 'playing') {
      const unusedLetters = 'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .filter((letter) => !guessedLetters.includes(letter) && !targetWord.includes(letter));
      if (unusedLetters.length > 0) {
        const randomBooster = unusedLetters[Math.floor(Math.random() * unusedLetters.length)];
        setGuessedLetters((prev) => [...prev, randomBooster]);
        setBoosters((prev) => prev - 1);
      }
    }
  };

  const undoLastGuess = () => {
    if (guessedLetters.length > 0 && gameState === 'playing' && undoCount > 0) {
      const lastGuess = guessedLetters[guessedLetters.length - 1];
      setGuessedLetters((prev) => prev.slice(0, -1));
      if (!targetWord.includes(lastGuess)) {
        setWrongGuesses((prev) => prev - 1);
      }
      setUndoCount((prev) => prev - 1);
    }
  };

  const renderWord = () => {
    return targetWord.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessedLetters.includes(letter) ? letter : '_'}
      </span>
    ));
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

  const getDuckieImage = () => {
    if (wrongGuesses === 0) {
      return '/icons/duck.png';
    } else if (wrongGuesses === 1) {
      return '/icons/duck1.png';
    } else if (wrongGuesses === 2) {
      return '/icons/duck2.png';
    } else if (wrongGuesses === 3) {
      return '/icons/duck3.png';
    } else {
      return '/icons/duck4.png';
    }
  };

  return (
    <div className="desktop-1">
      <Link to="/">
        <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
      </Link>
      <div className="title">
        <img className="titleimg" src="/icons/logo.png" alt="title" />
      </div>
      <div className="duckie-pool">
        <img className="duckie-image" src={getDuckieImage()} alt="Duckie" />
      </div>
      <img className="coinsimg" src="/icons/coins.ico" alt="Coins Icon" />
      <div className="coins">420</div>
      <div className="game-container">
        <div className="header">
          <div className="score">Score: {score}</div>
          <div className="boosters">Boosters: {boosters}</div>
          <div className="hints">Hints: {hints}</div>
          <div className="wrong-guesses">Moves: {4 - wrongGuesses}</div>
          <div className="undo-count">Undo: {undoCount}</div>
        </div>
        <div className="word-display">{renderWord()}</div>
        <div className="keyboard">{renderKeyboard()}</div>
        <div className="actions">
          <button className="action-button" onClick={useHint} disabled={hints <= 0 || gameState !== 'playing'}>
            <img className="hint" src="/icons/hint.ico" alt="Hint Icon" />
          </button>
          <button className="action-button" onClick={useBooster} disabled={boosters <= 0 || gameState !== 'playing'}>
            <img className="bomb" src="/icons/bomb.ico" alt="Bomb Icon" />
          </button>
          <button className="action-button" onClick={undoLastGuess} disabled={undoCount <= 0 || guessedLetters.length === 0 || gameState !== 'playing'}>
            <img className="eraser" src="/icons/eraser.ico" alt="Eraser Icon" />
          </button>
        </div>
        {gameState !== 'playing' && gameState !== 'initial' && (
          <div className="game-message">{gameState === 'won' ? 'You Win!' : 'You Lose!'}</div>
        )}
        <div className="restart-container">
          <button className="restart-button" onClick={startNewGame}>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuckieGame;