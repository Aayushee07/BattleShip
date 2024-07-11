import React, { useEffect, useRef } from 'react';
import Cell from './Cell';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { setPlayerGrid, setOpponentGrid } from '../state/board/boardSlice';
import { setPosition, setShow } from '../state/ship/shipSlice';
import { setStrike } from '../state/strike/strikeSlice';
import { sendStrike } from '../websocket';



interface BoardProps {
  size: number;
  currentPlayerBoard: boolean;
}

const Board: React.FC<BoardProps> = ({ size, currentPlayerBoard }) => {
  const playerGrid = useAppSelector((state) => state.board.playerGrid);
  const opponentGrid = useAppSelector((state) => state.board.opponentGrid);
  const grid = currentPlayerBoard ? playerGrid : opponentGrid;
  const dispatch = useAppDispatch();
  const sessionID = useAppSelector((state) => state.session.sessionId);
  const strikeResults = useAppSelector((state) => state.strike.strikeResults);

  const previousStrikeResultsLength = useRef(strikeResults.length);

  useEffect(() => {
    if (strikeResults.length === previousStrikeResultsLength.current) return;

    // Access the latest strike result
    const latestResult = strikeResults[strikeResults.length - 1];

    // slice creates a shallow copy of the grid to avoid direct mutations
    const updatedOpponentGrid = opponentGrid.map(row => row.slice());

    updatedOpponentGrid[latestResult.row][latestResult.col] = latestResult.result === 'hit' ? 'hit' : 'miss';
    dispatch(setOpponentGrid(updatedOpponentGrid));

    // Update the previous length
    previousStrikeResultsLength.current = strikeResults.length;

  }, [strikeResults, dispatch, opponentGrid]);

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
      dispatch(setShow(id));
      dispatch(setPlayerGrid(newGrid));
    } else {
      dispatch(setOpponentGrid(newGrid));
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (currentPlayerBoard) return;

    dispatch(setStrike({ row: rowIndex, col: colIndex }));
    console.log(`Cell clicked at (${rowIndex}, ${colIndex})`);
    sendStrike(rowIndex, colIndex, sessionID);

    // Find if there's a strike result at the clicked position
    const result = strikeResults.find(result => result.row === rowIndex && result.col === colIndex);
    console.log(strikeResults)
    console.log("result")
    console.log(result)

    if (result) {
      // Update opponent grid based on strike results
      const updatedOpponentGrid = opponentGrid.map(row => row.slice());
      updatedOpponentGrid[rowIndex][colIndex] = result? 'hit' : 'miss';
      dispatch(setOpponentGrid(updatedOpponentGrid));
    }
  };

  return (
    <div className={`grid grid-cols-${size} gap-1 mx-10`}>
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
          />
        ))
      )}
    </div>
  );
};

export default Board;
