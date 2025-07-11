'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import DownloadOutfitSummaryButton from './DownloadOutfitSummaryButton';

type CartSidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const { cart, clearCart, removeOutfit } = useCart();

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: isOpen ? 0 : '-100%',
                width: '300px',
                height: '100vh',
                backgroundColor: '#fff',
                borderLeft: '1px solid #ddd',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                transition: 'right 0.3s ease',
                zIndex: 1000,
                overflowY: 'auto',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#000000' }}>
                <h3>🛒 Your Outfits</h3>
                <button onClick={onClose} style={{ fontSize: '18px', cursor: 'pointer' }}>✖</button>
            </div>

            {cart.length === 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        padding: '20px',
                        color: '#888',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src="/images/empty-cart.png"
                        alt="Empty Cart"
                        style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'contain',
                            marginBottom: '16px',
                            opacity: 0.7,
                        }}
                    />
                    <p style={{ fontSize: '16px' }}>Your cart is empty</p>
                    <p style={{ fontSize: '14px' }}>Start building your outfit!</p>
                </div>
            ) : (
                <>
                    {cart.map((outfit, index) => {
                        const itemsArray = Array.isArray(outfit.items) ? outfit.items : [];
                        return (
                            <div
                                key={outfit.id}
                                style={{
                                    border: '1px solid #eee',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    marginBottom: '12px',
                                    color: '#000000',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Outfit {index + 1}</strong>
                                    <button
                                        onClick={() => removeOutfit(outfit.id)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            fontSize: '16px',
                                            color: '#888',
                                            cursor: 'pointer',
                                        }}
                                        title="Remove Outfit"
                                    >
                                        ❌
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    {itemsArray.map((item) => (
                                        <img
                                            key={item.id}
                                            src={item.imageUrl}
                                            alt={item.itemType}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'contain',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <button
                        onClick={clearCart}
                        style={{
                            marginTop: '16px',
                            padding: '8px 12px',
                            backgroundColor: '#ff4d4f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Clear Cart
                    </button>
                    <DownloadOutfitSummaryButton />
                </>
            )}
        </div>
    );
};

export default CartSidebar;
