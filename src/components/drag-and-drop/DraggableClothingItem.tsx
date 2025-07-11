'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

type DraggableClothingItemProps = {
  id: string;
  imageUrl: string;
  itemType: 'top' | 'bottom' | 'shoes' | 'accessories';
};

const DraggableClothingItem: React.FC<DraggableClothingItemProps> = ({ id, imageUrl, itemType }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      imageUrl,
      itemType,
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    width: '80px',
    height: '80px',
    userSelect: 'none',
  };

  return (
    <img
      ref={setNodeRef}
      src={imageUrl}
      alt={itemType}
      {...listeners}
      {...attributes}
      style={style}
      draggable={false}
    />
  );
};

export default DraggableClothingItem;
