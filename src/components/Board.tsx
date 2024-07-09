import React from 'react';
import Cell from './Cell';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { setPlayerGrid, setOpponentGrid } from '../state/board/boardSlice';
import { setPosition, setShow } from '../state/ship/shipSlice';
import { setStrike } from '../state/strike/strikeSlice';

interface BoardProps {
  size: number;
  currentPlayerBoard: boolean;
}

const Board: React.FC<BoardProps> = ({ size, currentPlayerBoard }) => {
  const playerGrid = useAppSelector((state) => state.board.playerGrid);
  const opponentGrid = useAppSelector((state) => state.board.opponentGrid);
  const grid = currentPlayerBoard ? playerGrid : opponentGrid;
  const ships = useAppSelector((state)=>state.ships.ships)
  const strikes = useAppSelector((state)=>state.strike.strikePositions)
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!currentPlayerBoard) {
      console.log("It is not your board");
      return;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, colIndex: number) => {
    e.preventDefault();

    const shipData = e.dataTransfer.getData('text/plain');
    if (!shipData) return;

    const { id, length, width } = JSON.parse(shipData);
    

    if (rowIndex + length > size || colIndex + width > size) {
      console.log('Ship does not fit within the grid boundaries.');
      return;
    }

    const newGrid = grid.map(row => row.slice());

    for (let i = rowIndex; i < rowIndex + length; i++) {
      for (let j = colIndex; j < colIndex + width; j++) {
        newGrid[i][j] = 'ship';
        dispatch(setPosition({ id, position: { row: i, col: j } }));
     
      }
    }

    console.log(`Ship dropped at (${rowIndex},${colIndex})`);
    if (currentPlayerBoard) {
      dispatch(setShow(id))
      dispatch(setPlayerGrid(newGrid));
      console.log(ships)
    } else {
      dispatch(setOpponentGrid(newGrid));
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (currentPlayerBoard) return;
   dispatch(setStrike({row:rowIndex,col:colIndex}))
    console.log(`Cell clicked at (${rowIndex}, ${colIndex})`);
    console.log(strikes)
  };

  return (
    <div className={`grid grid-cols-${size} gap-1 mx-10`}>
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
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
            isShip={_ === 'ship'}
          />
        ))
      )}
    </div>
  );
};

export default Board;
