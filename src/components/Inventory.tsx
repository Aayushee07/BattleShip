import React, { useState } from 'react';
import Ship from './Ship';

const Inventory: React.FC = () => {
    const [ships, setShips] = useState([
        { id: 1, length: 3, width: 1, show: true },
        { id: 2, length: 2, width: 1, show: true },
        { id: 3, length: 1, width: 1, show: true }
    ]);

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
