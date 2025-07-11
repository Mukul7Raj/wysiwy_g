'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableZoneProps = {
    zoneId: string;
    acceptedType: 'top' | 'bottom' | 'shoes' | 'accessories';
    label?: string; 
};

type DroppedItem = {
    id: string;
    imageUrl: string;
    itemType: 'top' | 'bottom' | 'shoes'| 'accessories';
};
export type DroppableZoneHandler = {
    (item: DroppedItem): void;
    getCurrentItem?: () => DroppedItem | null;
    clear?: () => void;
};

export const DroppableZoneRefMap: Record<string, DroppableZoneHandler> = {};

const DroppableZone: React.FC<DroppableZoneProps> = ({ zoneId, acceptedType, label }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: zoneId,
    });

    const droppedItemRef = useRef<DroppedItem | null>(null);
    const [, forceUpdate] = useState(0);
    const [animateDrop, setAnimateDrop] = useState(false);

    useEffect(() => {
        DroppableZoneRefMap[zoneId] = (item: DroppedItem) => {
            if (item.itemType === acceptedType) {
                droppedItemRef.current = item;
                forceUpdate((x) => x + 1);
                setAnimateDrop(true);
                setTimeout(() => setAnimateDrop(false), 300);
            }
        };
        DroppableZoneRefMap[zoneId].getCurrentItem = () => droppedItemRef.current;
        DroppableZoneRefMap[zoneId].clear = () => {
            droppedItemRef.current = null;
            forceUpdate(x => x + 1);
        };
        return () => {
            delete DroppableZoneRefMap[zoneId];
        };
    }, [zoneId, acceptedType]);

    return (
        <div
            ref={setNodeRef}
            className={`relative flex items-center justify-center min-h-[120px] my-4 border-2 border-dashed rounded-xl transition-colors duration-200 ${isOver ? 'bg-blue-50 border-blue-400 shadow-lg' : 'bg-white dark:bg-gray-900 border-gray-300'} group hover:border-blue-400 focus-within:border-blue-400`}
        >
            {label && (
                <div className="absolute top-2 left-3 text-sm text-gray-500 font-medium group-hover:text-blue-500">
                    {label}
                </div>
            )}
            {droppedItemRef.current ? (
                <>
                    <img
                        src={droppedItemRef.current.imageUrl}
                        alt={droppedItemRef.current.itemType}
                        className={`w-28 h-auto object-contain clothing-drop-transition ${animateDrop ? 'clothing-drop-enter' : ''}`}
                        onAnimationEnd={() => setAnimateDrop(false)}
                    />
                    <button
                        onClick={() => DroppableZoneRefMap[zoneId].clear?.()}
                        className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-red-500 font-bold shadow hover:bg-opacity-100 transition"
                        aria-label="Remove item"
                    >
                        ×
                    </button>
                </>
            ) : (
                <p className="text-gray-400 text-base font-medium">Drop a {acceptedType}</p>
            )}
        </div>
    );
};

export default DroppableZone;
