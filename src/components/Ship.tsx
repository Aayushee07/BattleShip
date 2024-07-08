import React from 'react';

interface ShipSize {
    id: number;
    length: number;
    width: number;
    show: boolean;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number, length: number, width: number) => void;
}

const Ship: React.FC<ShipSize> = ({ length, width, show, id, onDragStart }) => {
    if (!show) {
        return null;
    }

    const dots = Array.from({ length }).map((_, index) => (
        <div key={index} className="w-3 h-3 bg-white rounded-full m-1"></div>
    ));

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, id, length, width)}
            className="bg-cyan-700 hover:bg-cyan-800 opacity-50 rounded-full ml-4 flex flex-col justify-center items-center"
            style={{ width: width * 70, height: length * 70 }}
        >
            <div className="flex flex-col items-center">
                {dots}
            </div>
        </div>
    );
}

export default Ship;
