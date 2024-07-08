import React from 'react';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isShip: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
}

const Cell: React.FC<CellProps> = ({ rowIndex, colIndex, onDragOver, onDrop, isShip, onClick }) => {
  return (
    <div
      data-row={rowIndex}
      data-col={colIndex}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => onClick(rowIndex, colIndex)}
      className={`w-full h-19 ${isShip ? 'bg-cyan-700 rounded-full' : 'bg-sky-300'}`}
    >
      
    </div>
  );
};

export default Cell;
