// Board.tsx
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cell from './Cell';
import { RootState } from '../state/store';
import { setPlayerGrid, setOpponentGrid } from '../state/board/boardSlice';
import { setPosition, setShow } from '../state/ship/shipSlice';
import { setStrike } from '../state/strike/strikeSlice';
import { sendStrike } from '../websocket';

interface BoardProps {
  size: number;
  currentPlayerBoard: boolean;
  onGameOver: (winner: string, confetti: boolean) => void;
}

const Board: React.FC<BoardProps> = ({ size, currentPlayerBoard, onGameOver }) => {
  const playerGrid = useSelector((state: RootState) => state.board.playerGrid);
  const opponentGrid = useSelector((state: RootState) => state.board.opponentGrid);
  const grid = currentPlayerBoard ? playerGrid : opponentGrid;
  const dispatch = useDispatch();
  const sessionID = useSelector((state: RootState) => state.session.sessionId);
  const strikeResults = useSelector((state: RootState) => state.strike.strikeResults);
  const damageResults = useSelector((state: RootState) => state.strike.damageResults);
  const isTurn = useSelector((state: RootState) => state.turn.isTurn); 

  const previousDamageResultsLength = useRef(damageResults.length);

  useEffect(() => {
    if (damageResults.length === previousDamageResultsLength.current) return;

    const latestResult = damageResults[damageResults.length - 1];

    const updatedPlayerGrid = playerGrid.map(row => row.slice());
    updatedPlayerGrid[latestResult.row][latestResult.col] = 'damage';
    dispatch(setPlayerGrid(updatedPlayerGrid));

    if (damageResults.length === 6) {
      onGameOver(currentPlayerBoard ? 'You lost!' : 'You won!', false);
    }

    previousDamageResultsLength.current = damageResults.length;
  }, [damageResults, dispatch, playerGrid, currentPlayerBoard, onGameOver]);

  const previousStrikeResultsLength = useRef(strikeResults.length);

  useEffect(() => {
    if (strikeResults.length === previousStrikeResultsLength.current) return;

    const latestResult = strikeResults[strikeResults.length - 1];
    const updatedOpponentGrid = opponentGrid.map(row => row.slice());
    updatedOpponentGrid[latestResult.row][latestResult.col] = latestResult.result === 'hit' ? 'hit' : 'miss';
    dispatch(setOpponentGrid(updatedOpponentGrid));

    // Check for 6 hits
    const hitsCount = strikeResults.filter(result => result.result === 'hit').length;
    if (hitsCount === 6) {
      onGameOver(currentPlayerBoard ? 'You lost!' : 'You won!', true);
    }

    previousStrikeResultsLength.current = strikeResults.length;
  }, [strikeResults, dispatch, opponentGrid, currentPlayerBoard, onGameOver]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!currentPlayerBoard) {
      return;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, colIndex: number) => {
    e.preventDefault();

    const shipData = e.dataTransfer.getData('text/plain');
    if (!shipData) return;

    const { id, length, width } = JSON.parse(shipData);

    if (rowIndex + length > size || colIndex + width > size) {
      return;
    }

    const newGrid = grid.map(row => row.slice());

    for (let i = rowIndex; i < rowIndex + length; i++) {
      for (let j = colIndex; j < colIndex + width; j++) {
        newGrid[i][j] = 'ship';
        dispatch(setPosition({ id, position: { row: i, col: j } }));
      }
    }

    if (currentPlayerBoard) {
      dispatch(setShow(id));
      dispatch(setPlayerGrid(newGrid));
    } else {
      dispatch(setOpponentGrid(newGrid));
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (!isTurn || currentPlayerBoard) return;

    dispatch(setStrike({ row: rowIndex, col: colIndex }));
    sendStrike(rowIndex, colIndex, sessionID);
  };

  return (
    <div className={`grid grid-cols-${size} gap-1 mx-10 ${!isTurn && !currentPlayerBoard ? 'pointer-events-none opacity-50' : ''}`}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            onDragOver={handleDragOver}
            onDrop={(e) => {
              if (!currentPlayerBoard) return;
              handleDrop(e, rowIndex, colIndex);
            }}
            onClick={() => handleClick(rowIndex, colIndex)}
            isShip={cell === 'ship'}
            isHit={cell === 'hit'}
            isMiss={cell === 'miss'}
            isDamage={cell === 'damage'}
          />
        ))
      )}
    </div>
  );
};

export default Board;