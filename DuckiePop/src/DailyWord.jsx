
// import React, { useState, useEffect } from 'react';
// import './DailyWord.css';
// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     name: 'Generative AI',
//     words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
//   },
//   {
//     name: 'Web Development',
//     words: ['javascript', 'react', 'html', 'css', 'api']
//   },
//   {
//     name: 'Machine Learning',
//     words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
//   },
//   {
//     name: 'Mathematics',
//     words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
//   }
// ];

// const DailyWord = () => {
//   const [category, setCategory] = useState(null);
//   const [targetWord, setTargetWord] = useState('');
//   const [guessedLetters, setGuessedLetters] = useState([]);
//   const [wrongGuesses, setWrongGuesses] = useState(0);
//   const [gameState, setGameState] = useState('playing'); // Game starts in 'playing' state

//   useEffect(() => {
//     const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
//     setCategory(selectedCategory.name);
//     setTargetWord(selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)]);
//   }, []);

//   const handleLetterClick = (letter) => {
//     if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

//     setGuessedLetters((prev) => [...prev, letter]);

//     if (!targetWord.includes(letter)) {
//       setWrongGuesses((prev) => prev + 1);
//     }
//   };

//   useEffect(() => {
//     if (gameState === 'playing' && guessedLetters.length > 0) {
//       if (wrongGuesses >= 4) {
//         setGameState('ended'); // Game ends if wrong guesses reach 4
//       } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
//         setGameState('ended'); // Game ends if all letters are guessed correctly
//       }
//     }
//   }, [guessedLetters, wrongGuesses, targetWord, gameState]);

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
//         disabled={gameState !== 'playing' || guessedLetters.includes(letter)}
//         onClick={() => handleLetterClick(letter)}
//       >
//         {letter}
//       </button>
//     ));
//   };

//   return (
//     <div className="dailyword-container">
//       <Link to="/">
//         <img className="home-icon" src="/icons/home.ico" alt="Home Icon" />
//       </Link>
//       <h2 className="dailyword-title">Daily Word Challenge</h2>
//       {category && <div className="category-display">Category: {category}</div>}

//       <div className="word-display">{renderWord()}</div>
//       <div className="keyboard">{renderKeyboard()}</div>

//       {gameState === 'ended' && (
//         <div className="game-message">
//           {wrongGuesses >= 4 ? 'You Lose!' : 'You Win!'}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyWord;
import React, { useState, useEffect } from 'react';
import './DailyWord.css';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Generative AI',
    words: ['transformer', 'neural', 'chatbot', 'diffusion', 'prompt']
  },
  {
    name: 'Web Development',
    words: ['javascript', 'react', 'html', 'css', 'api']
  },
  {
    name: 'Machine Learning',
    words: ['algorithm', 'dataset', 'model', 'tensor', 'neuron']
  },
  {
    name: 'Mathematics',
    words: ['calculus', 'algebra', 'matrix', 'vector', 'gradient']
  }
];

const DailyWord = () => {
  const [category, setCategory] = useState(null);
  const [targetWord, setTargetWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState('playing'); // Game starts in 'playing' state

  useEffect(() => {
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    setCategory(selectedCategory.name);
    setTargetWord(selectedCategory.words[Math.floor(Math.random() * selectedCategory.words.length)]);
  }, []);

  const handleLetterClick = (letter) => {
    if (gameState !== 'playing' || guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!targetWord.includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && guessedLetters.length > 0) {
      if (wrongGuesses >= 4) {
        setGameState('ended'); // Game ends if wrong guesses reach 4
      } else if (targetWord.split('').every((letter) => guessedLetters.includes(letter))) {
        setGameState('ended'); // Game ends if all letters are guessed correctly
      }
    }
  }, [guessedLetters, wrongGuesses, targetWord, gameState]);

  // Duckie Image Logic
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
        disabled={gameState !== 'playing' || guessedLetters.includes(letter)}
        onClick={() => handleLetterClick(letter)}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="dailyword-container">
      <Link to="/">
        <img className="home-icon" src="/icons/home.ico" alt="Home Icon" />
      </Link>
      <h2 className="dailyword-title">Daily Word Challenge</h2>
      {category && <div className="category-display">Category: {category}</div>}

      <div className="game-content">
            <div className="duckie-pool">
            <img className="duckie-image" src={getDuckieImage()} alt="Duckie" />
                </div>
            <div className="keyboard">{renderKeyboard()}</div>
        </div>
      {/* Word Display */}
      <div className="word-display">{renderWord()}</div>
{/* 

      {/* Game Message */}
      {gameState === 'ended' && (
        <div className="game-message">
          {wrongGuesses >= 4 ? 'You Lose!' : 'You Win!'}
        </div>
      )}
    </div>
  );
};

export default DailyWord;