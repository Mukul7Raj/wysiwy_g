'use client';

import React from 'react';
import DroppableZone from './DroppableZone';
import AddToCartButton from './AddToCartButton';
import CartButtons from './CartButtons';
import ResetButton from './ResetButton';

type OutfitCanvasProps = {
    onCartClick: () => void;
};

const OutfitCanvas: React.FC<OutfitCanvasProps> = ({ onCartClick }) => {
    return (
        <div className="card border-2 border-gray-200 rounded-2xl p-8 bg-gray-50 dark:bg-gray-800 w-full max-w-md mx-auto my-6 shadow-xl">
            <h2 className="text-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Outfit Builder Canvas
            </h2>
            <DroppableZone zoneId="top-zone" acceptedType="top" label="Top" />
            <DroppableZone zoneId="bottom-zone" acceptedType="bottom" label="Bottom" />
            <DroppableZone zoneId="shoes-zone" acceptedType="shoes" label="Shoes" />
            <DroppableZone zoneId="accessories-zone" acceptedType="accessories" label="Accessories" />
            <h3 className="text-center mt-8 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
                Actions
            </h3>
            <div className="flex gap-4 mt-4 justify-center flex-wrap">
                <AddToCartButton />
                <CartButtons onCartClick={onCartClick} />
                <ResetButton />
            </div>
        </div>
    );
};

export default OutfitCanvas;
