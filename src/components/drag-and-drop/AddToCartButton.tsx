'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { DroppableZoneRefMap } from './DroppableZone';

const AddToCartButton: React.FC = () => {
    const { addToCart } = useCart();

    const handleClick = () => {
        const top = DroppableZoneRefMap['top-zone']?.getCurrentItem?.();
        const bottom = DroppableZoneRefMap['bottom-zone']?.getCurrentItem?.();
        const shoes = DroppableZoneRefMap['shoes-zone']?.getCurrentItem?.();
        const accessories = DroppableZoneRefMap['accessories-zone']?.getCurrentItem?.();

        console.log('Items being added to cart:', { top, bottom, shoes, accessories });

        if (!top || !bottom || !shoes || !accessories) {
            alert('Please complete the outfit (top, bottom, shoes, accessories) before adding to cart.');
            return;
        }

        const outfitId = `outfit-${Date.now()}`;

        const items = [top, bottom, shoes, accessories].filter(Boolean); // ensure no undefined

        addToCart({
            id: outfitId,
            items, // clean and valid
        });

        // Reset
        DroppableZoneRefMap['top-zone']?.clear?.();
        DroppableZoneRefMap['bottom-zone']?.clear?.();
        DroppableZoneRefMap['shoes-zone']?.clear?.();
        DroppableZoneRefMap['accessories-zone']?.clear?.();

        alert('Outfit added to cart!');
    };

    return (
        <button
            onClick={handleClick}
            style={{
                padding: '10px 16px',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '15px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
