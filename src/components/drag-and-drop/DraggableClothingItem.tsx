'use client';

import React from 'react';

type DraggableClothingItemProps = {
  id: string;
  imageUrl: string;
  itemType: 'top' | 'bottom' | 'shoes' | 'accessories';
};

const EnhancedDraggableClothingItem: React.FC<DraggableClothingItemProps> = ({ 
  id, 
  imageUrl, 
  itemType 
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    const data = JSON.stringify({
      id,
      imageUrl,
      itemType
    });
    e.dataTransfer.setData('text/plain', data);
  };

  return (
    <div
      className="relative group bg-white dark:bg-gray-800 rounded-xl shadow-sm p-2 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={handleDragStart}
    >
      <img
        src={imageUrl}
        alt={itemType}
        className="w-full h-20 object-contain"
        draggable={false}
      />
      
      {/* Item Type Badge */}
      <div className="absolute top-1 right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {itemType}
      </div>
      
      {/* Drag Indicator */}
      <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-blue-600 font-medium text-sm">
          Drag me!
        </span>
      </div>
    </div>
  );
};

export default EnhancedDraggableClothingItem;