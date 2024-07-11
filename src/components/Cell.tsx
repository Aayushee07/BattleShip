import React from 'react';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: (rowIndex: number, colIndex: number) => void;
  isShip: boolean;
  isHit: boolean;
  isMiss: boolean;
}

const Cell: React.FC<CellProps> = ({ rowIndex, colIndex, onDragOver, onDrop, onClick, isShip, isHit, isMiss }) => {
  let cellClass = 'bg-sky-300';
  if (isShip) cellClass = 'bg-cyan-700 rounded-full';
  if (isHit) cellClass = 'bg-green-400 rounded-full';
  if (isMiss) cellClass = 'bg-red-400 rounded-full';

  return (
    <div
      data-row={rowIndex}
      data-col={colIndex}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => onClick(rowIndex, colIndex)}
      className={`w-full h-19 ${cellClass}`}
    />
  );
};

export default Cell;
