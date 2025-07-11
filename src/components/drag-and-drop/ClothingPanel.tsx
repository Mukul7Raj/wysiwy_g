'use client';

import React from 'react';
import DraggableClothingItem from './DraggableClothingItem';

// 🧥 Tops
const tops = [
    { id: 'top1', imageUrl: '/images/tops/top1.webp', itemType: 'top' },
    { id: 'top2', imageUrl: '/images/tops/top2.jpg', itemType: 'top' },
    { id: 'top3', imageUrl: '/images/tops/top3.jpg', itemType: 'top' },
    { id: 'top4', imageUrl: '/images/tops/top4.png', itemType: 'top' },
    { id: 'top5', imageUrl: '/images/tops/top5.png', itemType: 'top' },
];

// 👖 Bottoms
const bottoms = [
    { id: 'bottom1', imageUrl: '/images/bottoms/bottom1.webp', itemType: 'bottom' },
    { id: 'bottom2', imageUrl: '/images/bottoms/bottom2.webp', itemType: 'bottom' },
    { id: 'bottom3', imageUrl: '/images/bottoms/bottom3.jpg', itemType: 'bottom' },
    { id: 'bottom4', imageUrl: '/images/bottoms/bottom4.png', itemType: 'bottom' },
    { id: 'bottom5', imageUrl: '/images/bottoms/bottom5.png', itemType: 'bottom' },
];

// 👟 Shoes
const shoes = [
    { id: 'shoes1', imageUrl: '/images/shoes/shoes1.webp', itemType: 'shoes' },
    { id: 'shoes2', imageUrl: '/images/shoes/shoes2.webp', itemType: 'shoes' },
    { id: 'shoes3', imageUrl: '/images/shoes/shoes3.jpg', itemType: 'shoes' },
    { id: 'shoes4', imageUrl: '/images/shoes/shoes4.jpg', itemType: 'shoes' },
    { id: 'shoes5', imageUrl: '/images/shoes/shoes5.png', itemType: 'shoes' },
];

// 🕶️ Accessories
const accessories = [
    { id: 'accessory1', imageUrl: '/images/accessories/belt.jpg', itemType: 'accessories' },
    { id: 'accessory2', imageUrl: '/images/accessories/belt2.webp', itemType: 'accessories' },
    { id: 'accessory3', imageUrl: '/images/accessories/cap.png', itemType: 'accessories' },
    { id: 'accessory4', imageUrl: '/images/accessories/hat.png', itemType: 'accessories' },
    { id: 'accessory5', imageUrl: '/images/accessories/sunglasses.jpg', itemType: 'accessories' },
];

const clothingItemsByType = {
    top: tops,
    bottom: bottoms,
    shoes: shoes,
    accessories: accessories,
};

const ClothingPanel: React.FC = () => (
    <div className="card bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto my-6 border border-gray-200">
        <h2 className="text-center mb-8 text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Clothing Items
        </h2>
        {Object.entries(clothingItemsByType).map(([type, items]) => (
            <div key={type} className="mb-8">
                <h4 className="mb-4 capitalize text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {type}
                </h4>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="relative group bg-white dark:bg-gray-800 rounded-xl shadow p-2 flex items-center justify-center"
                        >
                            <DraggableClothingItem {...item} />
                            <span className="absolute bottom-1 left-1 text-xs text-white opacity-0 group-hover:opacity-100 transition">
                                {item.id}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export default ClothingPanel;
