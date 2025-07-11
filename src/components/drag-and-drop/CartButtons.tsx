'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

const CartButtons: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
    const { cart } = useCart();

    return (
        <div style={{ display: 'flex', gap: '12px' }}>
            <button
                onClick={onCartClick}
                style={{

                    padding: '10px 16px',
                    backgroundColor: '#F8D706',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    minHeight: '44px', // 🔥 ensure equal height
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                🛒 View Cart
                {cart.length > 0 && (
                    <span
                        style={{
                            marginLeft: '8px',
                            backgroundColor: '#ef4444',
                            borderRadius: '999px',
                            padding: '2px 8px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: '#fff',
                        }}
                    >
                        {cart.length}
                    </span>
                )}
            </button>
        </div>
    );
};

export default CartButtons;
