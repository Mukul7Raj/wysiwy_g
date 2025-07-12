'use client';

import React, { useState } from 'react';
import ClothingPanel from './ClothingPanel';
import OutfitCanvas from './OutfitCanvas';
import CartSidebar from './CartSidebar';

const DragAndDropIndex: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 px-4 py-8 max-w-7xl mx-auto">
                {/* Clothing Panel - Fixed height with scroll */}
                <div className="w-full lg:w-1/2 lg:max-w-md">
                    <ClothingPanel />
                </div>
                
                {/* Outfit Canvas */}
                <div className="w-full lg:w-1/2 lg:max-w-2xl">
                    <OutfitCanvas onCartClick={() => setIsCartOpen(true)} />
                </div>
            </div>
            
            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default DragAndDropIndex;