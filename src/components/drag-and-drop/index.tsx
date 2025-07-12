'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import ClothingPanel from './ClothingPanel';
import OutfitCanvas from './OutfitCanvas';
import { DroppableZoneRefMap } from './DroppableZone';
import CartSidebar from './CartSidebar';

const DragAndDropIndex: React.FC = () => {
    const [activeItem, setActiveItem] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveItem(active.data.current);
    };
    
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;
        const itemType = active.data.current?.itemType;
        const imageUrl = active.data.current?.imageUrl;

        if (itemType && imageUrl && DroppableZoneRefMap[over.id]) {
            DroppableZoneRefMap[over.id]({
                id: String(active.id),
                imageUrl,
                itemType,
            });
        }
        
        // Clear the active item after drop
        setActiveItem(null);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Main Content Area */}
                <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-12 px-2 py-8 max-w-6xl mx-auto">
                    <ClothingPanel />
                    <OutfitCanvas onCartClick={() => setIsCartOpen(true)} />
                </div>
                
                {/* Drag Overlay for smooth dragging experience */}
                <DragOverlay>
                    {activeItem ? (
                        <div className="bg-white rounded-lg shadow-lg p-2 border-2 border-blue-400">
                            <img
                                src={activeItem.imageUrl}
                                alt={activeItem.itemType}
                                className="w-20 h-20 object-contain pointer-events-none"
                                draggable={false}
                            />
                        </div>
                    ) : null}
                </DragOverlay>
                
                {/* Cart Sidebar */}
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
        </DndContext>
    );
};

export default DragAndDropIndex;