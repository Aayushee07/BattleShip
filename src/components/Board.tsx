import React,{useState} from 'react';
import Cell from './Cell';


interface BoardProps {
  size: number;
  currentPlayerBoard: boolean;
}

const Board: React.FC<BoardProps> = ({ size , currentPlayerBoard}) => {
const [grid, setGrid] = useState<Array<Array<string | null>>>(Array.from({ length: size }, () => Array.from({ length: size }, () => null)));


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    if (!currentPlayerBoard) 
      console.log("It is not your board")
      return;
   
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, colIndex: number, shipId: number, shipLength: number, shipWidth: number) => {
    e.preventDefault();

  
    if (rowIndex + shipLength > size || colIndex + shipWidth > size) {
      console.log('Ship does not fit within the grid boundaries.');
      return;
    }


    const newGrid = [...grid];
    for (let i = rowIndex; i < rowIndex + shipLength; i++) {
      for (let j = colIndex; j < colIndex + shipWidth; j++) {
        newGrid[i][j] = 'ship'; 
      }
    }
    console.log(`Ship dropped at (${rowIndex},${colIndex})`)
    setGrid(newGrid);

    
    
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (currentPlayerBoard)
      return;
    console.log(`Cell clicked at (${rowIndex}, ${colIndex})`);
    
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
                if (!currentPlayerBoard) 
                     return;
                const shipData = e.dataTransfer.getData('text/plain');
                if (!shipData) return;

                const { id, length, width } = JSON.parse(shipData);
                handleDrop(e, rowIndex, colIndex, id, length, width);
              }}
              onClick={handleClick}
              
              isShip={_ === 'ship'}


          />
        ))
      )}
    </div>
  );
};

export default Board;
