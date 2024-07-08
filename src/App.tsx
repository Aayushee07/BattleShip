import React from 'react';
import './App.css';
import Board from './components/Board';
import Inventory from './components/Inventory';




const App: React.FC = () => {

  
  return (
  <div>
      <div className='grid grid-cols-2 gap-8'>
        <div >
          <div className='text-4xl mx-8 my-6 font-mono font-bold text-sky-400'>My Fleet</div>
          
          <Board currentPlayerBoard={true} size={5} />
        </div>
        <div>
        <div className='text-4xl mx-8 my-6 font-mono font-bold text-sky-400'>My Strikes</div>
          <Board currentPlayerBoard={false} size={5} />
        </div>
      </div>
      <div>
        <Inventory />
      </div>
      </div>
  );
};

export default App;
