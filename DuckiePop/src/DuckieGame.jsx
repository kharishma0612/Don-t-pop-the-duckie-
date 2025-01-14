import  { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Laptop, Headphones, AlertCircle } from 'lucide-react';

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
      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Pool */}
        <div 
          className="absolute bottom-0 w-full h-24 rounded-b-full"
          style={{
            backgroundColor: '#87CEEB',
            opacity: Math.max(0, 1 - (wrongGuesses * 0.2))
          }}
        />
        
        {/* Duckie */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Duckie body */}
            <div className="w-20 h-20 bg-yellow-300 rounded-full">
              {/* Eyes */}
              <div className="absolute top-6 left-4 w-2 h-2 bg-black rounded-full" />
              <div className="absolute top-6 right-4 w-2 h-2 bg-black rounded-full" />
              {/* Beak */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded" />
            </div>
            
            {/* Accessories */}
            {wrongGuesses < 2 && (
              <Headphones 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2" 
                size={24} 
                color="#333"
              />
            )}
            {wrongGuesses < 3 && (
              <Laptop 
                className="absolute -right-8 top-4" 
                size={24} 
                color={wrongGuesses >= 2 ? "#666" : "#333"}
              />
            )}
          </div>
        </div>

        {/* Game over effects */}
        {gameStatus === 'lost' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="text-red-500 w-16 h-16 animate-bounce" />
          </div>
        )}
      </div>
    );
  };

  const renderWord = () => {
    return (
      <div className="text-4xl font-bold tracking-wider text-center mb-8">
        {[...word].map((letter, index) => (
          <span key={index} className="mx-1">
            {guessedLetters.has(letter) ? letter : '_'}
          </span>
        ))}
      </div>
    );
  };

  const renderKeyboard = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return (
      <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.has(letter) || gameStatus !== 'playing'}
            variant={guessedLetters.has(letter) ? "secondary" : "default"}
            className="w-10 h-10"
          >
            {letter}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">Don&apos;t Pop the Duckie!</h1>
        <p className="text-gray-600">
          Wrong guesses: {wrongGuesses}/5
        </p>
      </div>

      {renderDuckie()}
      {renderWord()}
      {renderKeyboard()}

      {gameStatus !== 'playing' && (
        <div className="text-center mt-8">
          <p className="text-xl font-bold mb-4">
            {gameStatus === 'won' ? 'Congratulations! You saved the duckie!' : 'Oh no! The duckie popped!'}
          </p>
          <Button onClick={startNewGame}>Play Again</Button>
        </div>
      )}
    </Card>
  );
};

export default DuckieGame;