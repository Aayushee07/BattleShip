import React from 'react';
import Ship from './Ship';
import {  useAppSelector } from '../state/hooks';


const Inventory: React.FC = () => {
    const ships = useAppSelector((state) => state.ships.ships);
  


    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number, length: number, width: number) => {
        console.log(`Drag started for ship with id: ${id} length:${length} width:${width}`);
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, length, width }));
    };

    return (
        <div className="bg-zinc-900 p-1 col-span-2 mx-10 mt-4">
            <h2 className="text-2xl m-2 font-mono font-bold text-sky-400 mb-4">Inventory</h2>
            <div className="grid grid-cols-3 gap-2">
                {ships.map(ship => (
                    <div key={ship.id} className={`grid grid-cols-${ship.width} gap-2`}>
                        <Ship
                            show={ship.show}
                            id={ship.id}
                            length={ship.length}
                            width={ship.width}
                            onDragStart={(e) => handleDragStart(e, ship.id, ship.length, ship.width)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;
