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
import React from 'react';
import './DuckieGame.css'; // Import your CSS file


const DuckieGame = () => {
  return (
    <div className="desktop-1">
      <div className="rectangle-1"></div>
      <div className="ellipse-106"></div>
      <div className="ellipse-105"></div>
      <div className="line-2"></div>
      <div className="line-3"></div>
      <div className="line-4"></div>
      <div className="line-7"></div>
      <div className="line-6"></div>
      <div className="line-1"></div>
      <div className="rectangle-2"></div>
      <div className="rectangle-29"></div>
      <img
        className="_32-officeicons-1-89729-3"
        src="/icons/hint.ico"
        alt="Office Icons"
      />
      <div className="frame-1"></div>
      <div className="title">
      <img
        className="titleimg"
        src="/icons/logo.png"
        alt="title"
      />
      </div>
      <div className="rectangle-3"></div>
      <div className="rectangle-4"></div>
      <div className="rectangle-5"></div>
      <div className="rectangle-24"></div>
      <div className="rectangle-6"></div>
      <div className="rectangle-25"></div>
      <div className="rectangle-7"></div>
      <div className="d">d</div>
      <div className="c">c</div>
      <div className="rectangle-26"></div>
      <div className="rectangle-8"></div>
      <div className="rectangle-27"></div>
      <div className="rectangle-9"></div>
      <div className="rectangle-28"></div>
      <div className="rectangle-10"></div>
      <div className="rectangle-17"></div>
      <div className="rectangle-11"></div>
      <div className="rectangle-18"></div>
      <div className="rectangle-12"></div>
      <div className="rectangle-19"></div>
      <div className="rectangle-13"></div>
      <div className="rectangle-20"></div>
      <div className="rectangle-14"></div>
      <div className="rectangle-21"></div>
      <div className="rectangle-15"></div>
      <div className="rectangle-22"></div>
      <div className="rectangle-16"></div>
      <div className="rectangle-23"></div>
      <div className="a">a</div>
      <div className="b">b</div>
      <div className="e">e</div>
      <div className="f">f</div>
      <div className="g">g</div>
      <div className="h">h</div>
      <div className="i">i</div>
      <div className="j">j</div>
      <div className="k">k</div>
      <div className="l">l</div>
      <div className="m">m</div>
      <div className="n">n</div>
      <div className="o">o</div>
      <div className="p">p</div>
      <div className="q">q</div>
      <div className="r">r</div>
      <div className="s">s</div>
      <div className="t">t</div>
      <div className="u">u</div>
      <div className="v">v</div>
      <div className="w">w</div>
      <div className="x">x</div>
      <div className="y">y</div>
      <div className="z">z</div>
      <div className="bulbs">2</div>
      <div className="bombs">3</div>
      <div className="erasers">2</div>
      <div className="rectangle-33"></div>
      <img className="coinsimg" src="/icons/coins.ico" alt="coins" />
      
      <div className="coins">420</div>
      {/* <img className="line-8" src="line-80.svg" alt="Line 8" /> */}
      {/* <div className="line-9"></div> */}
      {/* <img className="ellipse-104" src="ellipse-1040.svg" alt="Ellipse 104" /> */}
      <img
        className="screenshot-2025-01-13-233312-1"
        src="icons/duck.png"
        alt="Screenshot"
      />
      <img
        className="gui-eraser-icon-157160-2"
        src="/icons/eraser.ico"
        alt="Eraser Icon"
      />
      <img
        className="console-gamepad-bomb-sports-gaming-video-sport-game-controller-icon-262437-3"
        src="/icons/bomb.ico"
        alt="Gamepad Icon"
      />
      <img className="home-04" src="/icons/home.ico" alt="Home Icon" />
    </div>
  );
};

export default DuckieGame;
