import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks'; 
import { createSession, joinSession } from '../websocket';
import { setSessionId } from '../state/session/sessionSlice';

const Home: React.FC = () => {
  const sessionId = useAppSelector((state) => state.session.sessionId); 
  const playerId = useAppSelector((state) => state.session.playerId); 
  const dispatch = useAppDispatch(); 

  const handleCreateSession = () => {
    createSession(); 
  };

  const handleJoinSession = () => {
    joinSession(sessionId, playerId); 
  };

  const handleSessionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSessionId(e.target.value)); 
  };

 
  return (
    <div className="flex flex-col">
      <div className="text-9xl flex justify-center mt-80 my-auto font-mono font-bold text-sky-400">
        BATTLESHIP
      </div>
      <div className="text-2xl flex justify-center mt-2 font-mono font-bold text-white">
        The ultimate combat
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleCreateSession}
          className="rounded-full bg-sky-400 hover:bg-sky-700 hover:text-white w-40 h-15 text-gray-700 text-lg mr-4"
        >
          Create Room
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Session ID"
            value={sessionId}
            onChange={handleSessionIdChange}
            className="rounded-l-full bg-gray-200 text-gray-700 border border-gray-200 focus:outline-none focus:border-sky-400 w-72 py-2 px-4 text-lg"
          />
           <Link to="/game">
          <button
            onClick={handleJoinSession}
            className="rounded-r-full bg-sky-400 hover:bg-sky-700 hover:text-white text-gray-700 text-lg px-6"
          >
            Join Session
          </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-6">
      </div>
    </div>
  );
};

export default Home;
