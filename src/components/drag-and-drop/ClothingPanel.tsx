'use client';

import React from 'react';
import DraggableClothingItem from './DraggableClothingItem';

type ItemType = "top" | "bottom" | "shoes" | "accessories";
type ClothingItem = { id: string; imageUrl: string; itemType: ItemType };

// 🧥 Tops
const tops: ClothingItem[] = [
    { id: 'top1', imageUrl: '/images/tops/top1.webp', itemType: 'top' },
    { id: 'top2', imageUrl: '/images/tops/top2.jpg', itemType: 'top' },
    { id: 'top3', imageUrl: '/images/tops/top3.jpg', itemType: 'top' },
    { id: 'top4', imageUrl: '/images/tops/top4.png', itemType: 'top' },
    { id: 'top5', imageUrl: '/images/tops/top5.png', itemType: 'top' },
];

// 👖 Bottoms
const bottoms: ClothingItem[] = [
    { id: 'bottom1', imageUrl: '/images/bottoms/bottom1.webp', itemType: 'bottom' },
    { id: 'bottom2', imageUrl: '/images/bottoms/bottom2.webp', itemType: 'bottom' },
    { id: 'bottom3', imageUrl: '/images/bottoms/bottom3.jpg', itemType: 'bottom' },
    { id: 'bottom4', imageUrl: '/images/bottoms/bottom4.png', itemType: 'bottom' },
    { id: 'bottom5', imageUrl: '/images/bottoms/bottom5.png', itemType: 'bottom' },
];

// 👟 Shoes
const shoes: ClothingItem[] = [
    { id: 'shoes1', imageUrl: '/images/shoes/shoes1.webp', itemType: 'shoes' },
    { id: 'shoes2', imageUrl: '/images/shoes/shoes2.webp', itemType: 'shoes' },
    { id: 'shoes3', imageUrl: '/images/shoes/shoes3.jpg', itemType: 'shoes' },
    { id: 'shoes4', imageUrl: '/images/shoes/shoes4.jpg', itemType: 'shoes' },
    { id: 'shoes5', imageUrl: '/images/shoes/shoes5.png', itemType: 'shoes' },
];

// 🕶️ Accessories
const accessories: ClothingItem[] = [
    { id: 'accessory1', imageUrl: '/images/accessories/belt.jpg', itemType: 'accessories' },
    { id: 'accessory2', imageUrl: '/images/accessories/belt2.webp', itemType: 'accessories' },
    { id: 'accessory3', imageUrl: '/images/accessories/cap.png', itemType: 'accessories' },
    { id: 'accessory4', imageUrl: '/images/accessories/hat.png', itemType: 'accessories' },
    { id: 'accessory5', imageUrl: '/images/accessories/sunglasses.jpg', itemType: 'accessories' },
];

const clothingItemsByType: Record<ItemType, ClothingItem[]> = {
    top: tops,
    bottom: bottoms,
    shoes: shoes,
    accessories: accessories,
};

const typeLabels: Record<ItemType, { label: string; emoji: string }> = {
    top: { label: 'Tops', emoji: '👕' },
    bottom: { label: 'Bottoms', emoji: '👖' },
    shoes: { label: 'Shoes', emoji: '👟' },
    accessories: { label: 'Accessories', emoji: '🕶️' },
};

const ClothingPanel: React.FC = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 h-[calc(100vh-4rem)] max-h-[800px] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                Clothing Items
            </h2>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
                {Object.entries(clothingItemsByType).map(([type, items]) => (
                    <div key={type} className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-900 z-10">
                            <span className="text-2xl">{typeLabels[type as ItemType].emoji}</span>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">
                                {typeLabels[type as ItemType].label}
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative group bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                    <DraggableClothingItem {...item} />
                                    
                                    {/* Enhanced hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                                    
                                    {/* Item ID label */}
                                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        {item.id}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Instructions Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/30">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                <span className="font-semibold">💡 Tip:</span> Drag items to the canvas builder to create your outfit
            </p>
        </div>
    </div>
);

export default ClothingPanel;