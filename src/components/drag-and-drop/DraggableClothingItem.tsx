'use client';

import React from 'react';

type DraggableClothingItemProps = {
  id: string;
  imageUrl: string;
  itemType: 'top' | 'bottom' | 'shoes' | 'accessories';
};

const DraggableClothingItem: React.FC<DraggableClothingItemProps> = ({ 
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
    e.dataTransfer.effectAllowed = 'copy';
    
    // Create a custom drag image
    const dragImage = new Image();
    dragImage.src = imageUrl;
    dragImage.onload = () => {
      e.dataTransfer.setDragImage(dragImage, 50, 50);
    };
  };

  // Get appropriate sizing based on item type
  const getItemSize = () => {
    switch (itemType) {
      case 'accessories':
        return 'h-24'; // Larger height for accessories
      case 'shoes':
        return 'h-20';
      case 'top':
      case 'bottom':
        return 'h-28';
      default:
        return 'h-24';
    }
  };

  return (
    <div
      className={`relative group bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-grab active:cursor-grabbing hover:border-blue-400 dark:hover:border-blue-500`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className={`flex items-center justify-center ${getItemSize()} w-full`}>
        <img
          src={imageUrl}
          alt={itemType}
          className="max-w-full max-h-full object-contain"
          draggable={false}
        />
      </div>
      
      {/* Item Type Badge */}
      <div className="absolute top-2 right-2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {itemType}
      </div>
      
      {/* Drag Indicator */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          Drag to Canvas
        </div>
      </div>

      {/* Drag Handle Visual */}
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DraggableClothingItem;