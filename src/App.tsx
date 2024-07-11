import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Inventory from './components/Inventory';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  const handleGameOver = (winner: string,confetti:boolean) => {
    setGameOver(true);
    setShowConfetti(confetti);
    setWinnerMessage(winner);
  };

  return (
    
    <div>
      {showConfetti && <Confetti />}
      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{winnerMessage}</h2>
          </div>
          <div>
            <Link to='/'>
            <button className='bg-cyan-400 hover:bg-cyan-700 m-2'>Play Again</button>
            </Link>
            </div>
         
        </div>
      )}
      <div className='grid grid-cols-2 gap-8'>
        <div>
          <div className='text-4xl mx-8 my-6 font-mono font-bold text-sky-400'>My Fleet</div>
          <Board currentPlayerBoard={true} size={5} onGameOver={handleGameOver} />
        </div>
        <div>
          <div className='text-4xl mx-8 my-6 font-mono font-bold text-sky-400'>My Strikes</div>
          <Board currentPlayerBoard={false} size={5} onGameOver={handleGameOver} />
        </div>
      </div>
      <div>
        <Inventory />
      </div>
    </div>
  );
};

export default App;
