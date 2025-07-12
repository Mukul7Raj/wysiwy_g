'use client';

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '@/context/CartContext';

type PlacedItem = {
    id: string;
    imageUrl: string;
    itemType: 'top' | 'bottom' | 'shoes' | 'accessories';
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
};

type OutfitCanvasProps = {
    onCartClick: () => void;
};

const EnhancedOutfitCanvas: React.FC<OutfitCanvasProps> = ({ onCartClick }) => {
    const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizing, setResizing] = useState<string | null>(null);
    const [savedOutfits, setSavedOutfits] = useState<PlacedItem[][]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    
    // Add cart functionality
    const { addToCart } = useCart();

    // Load saved outfits from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('savedOutfits');
        if (saved) {
            setSavedOutfits(JSON.parse(saved));
        }
    }, []);

    // Handle drop from clothing panel
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (!data) return;

        try {
            const { imageUrl, itemType, id } = JSON.parse(data);
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;

            const newItem: PlacedItem = {
                id: uuidv4(),
                imageUrl,
                itemType,
                x: e.clientX - rect.left - 50,
                y: e.clientY - rect.top - 50,
                width: 100,
                height: 100,
                zIndex: placedItems.length,
            };

            setPlacedItems(prev => [...prev, newItem]);
        } catch (error) {
            console.error('Error parsing dropped data:', error);
        }
    };

    // Handle drag start for repositioning
    const handleItemDragStart = (e: React.MouseEvent, itemId: string) => {
        e.preventDefault();
        setDraggedItem(itemId);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Handle drag move
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggedItem || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragOffset.x;
        const y = e.clientY - rect.top - dragOffset.y;

        setPlacedItems(prev => prev.map(item => 
            item.id === draggedItem 
                ? { ...item, x: Math.max(0, Math.min(x, rect.width - item.width)), 
                    y: Math.max(0, Math.min(y, rect.height - item.height)) }
                : item
        ));
    };

    // Handle drag end
    const handleMouseUp = () => {
        setDraggedItem(null);
        setResizing(null);
    };

    // Handle resize start
    const handleResizeStart = (e: React.MouseEvent, itemId: string) => {
        e.stopPropagation();
        setResizing(itemId);
    };

    // Handle resize move
    const handleResizeMove = (e: React.MouseEvent) => {
        if (!resizing || !canvasRef.current) return;

        const item = placedItems.find(i => i.id === resizing);
        if (!item) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const newWidth = Math.max(50, Math.min(200, e.clientX - rect.left - item.x));
        const newHeight = Math.max(50, Math.min(200, e.clientY - rect.top - item.y));

        setPlacedItems(prev => prev.map(i => 
            i.id === resizing 
                ? { ...i, width: newWidth, height: newHeight }
                : i
        ));
    };

    // Bring item to front
    const bringToFront = (itemId: string) => {
        const maxZ = Math.max(...placedItems.map(i => i.zIndex));
        setPlacedItems(prev => prev.map(item => 
            item.id === itemId 
                ? { ...item, zIndex: maxZ + 1 }
                : item
        ));
    };

    // Remove item
    const removeItem = (itemId: string) => {
        setPlacedItems(prev => prev.filter(item => item.id !== itemId));
    };

    // Add to Cart function
    const handleAddToCart = () => {
        if (placedItems.length === 0) {
            alert('Please add items to your outfit before adding to cart!');
            return;
        }

        // Check if outfit has at least one item of each type for a complete outfit
        const hasTop = placedItems.some(item => item.itemType === 'top');
        const hasBottom = placedItems.some(item => item.itemType === 'bottom');
        const hasShoes = placedItems.some(item => item.itemType === 'shoes');
        const hasAccessories = placedItems.some(item => item.itemType === 'accessories');

        if (!hasTop || !hasBottom || !hasShoes || !hasAccessories) {
            const missing = [];
            if (!hasTop) missing.push('top');
            if (!hasBottom) missing.push('bottom');
            if (!hasShoes) missing.push('shoes');
            if (!hasAccessories) missing.push('accessories');
            
            alert(`Please add the following items to complete your outfit: ${missing.join(', ')}`);
            return;
        }

        const outfitId = `outfit-${Date.now()}`;
        
        // Convert PlacedItems to OutfitItems for cart
        const outfitItems = placedItems.map(item => ({
            id: item.id,
            imageUrl: item.imageUrl,
            itemType: item.itemType
        }));

        addToCart({
            id: outfitId,
            items: outfitItems
        });

        // Clear the canvas after adding to cart
        setPlacedItems([]);
        
        alert('Outfit added to cart successfully!');
    };

    // Save outfit
    const saveOutfit = () => {
        if (placedItems.length === 0) {
            alert('Please add items to your outfit before saving!');
            return;
        }

        const newSavedOutfits = [...savedOutfits, placedItems];
        setSavedOutfits(newSavedOutfits);
        localStorage.setItem('savedOutfits', JSON.stringify(newSavedOutfits));
        alert(`Outfit saved! You have ${newSavedOutfits.length} saved outfits.`);
    };

    // Load outfit
    const loadOutfit = (outfitIndex: number) => {
        if (savedOutfits[outfitIndex]) {
            setPlacedItems(savedOutfits[outfitIndex]);
        }
    };

    // Clear canvas
    const clearCanvas = () => {
        setPlacedItems([]);
    };

    // Export outfit as image
    const exportAsImage = () => {
        if (!canvasRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 400;
        canvas.height = 500;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let loadedImages = 0;
        const totalImages = placedItems.length;

        if (totalImages === 0) {
            alert('No items to export!');
            return;
        }

        placedItems
            .sort((a, b) => a.zIndex - b.zIndex)
            .forEach((item) => {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, item.x, item.y, item.width, item.height);
                    loadedImages++;
                    
                    if (loadedImages === totalImages) {
                        const link = document.createElement('a');
                        link.download = `outfit-${Date.now()}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                    }
                };
                img.src = item.imageUrl;
            });
    };

    return (
        <div className="card border-2 border-gray-200 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800 w-full max-w-2xl mx-auto my-6 shadow-xl">
            <h2 className="text-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Enhanced Outfit Builder
            </h2>
            
            {/* Canvas Area */}
            <div
                ref={canvasRef}
                className="relative w-full h-96 bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onMouseMove={draggedItem ? handleMouseMove : resizing ? handleResizeMove : undefined}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {placedItems.map((item) => (
                    <div
                        key={item.id}
                        className="absolute cursor-move border-2 border-transparent hover:border-blue-400 group"
                        style={{
                            left: item.x,
                            top: item.y,
                            width: item.width,
                            height: item.height,
                            zIndex: item.zIndex,
                        }}
                        onMouseDown={(e) => handleItemDragStart(e, item.id)}
                        onClick={() => bringToFront(item.id)}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.itemType}
                            className="w-full h-full object-contain pointer-events-none"
                            draggable={false}
                        />
                        
                        {/* Controls */}
                        <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(item.id);
                                }}
                                className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                            >
                                ×
                            </button>
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                {item.itemType}
                            </span>
                        </div>
                        
                        {/* Resize Handle */}
                        <div
                            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
                            onMouseDown={(e) => handleResizeStart(e, item.id)}
                        />
                    </div>
                ))}
                
                {placedItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <p className="text-lg font-medium">Drag items here to build your outfit</p>
                            <p className="text-sm">Click to bring to front • Drag corners to resize</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Items: {placedItems.length} | Saved Outfits: {savedOutfits.length}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    🛒 Add to Cart
                </button>
                
                <button
                    onClick={saveOutfit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    💾 Save Outfit
                </button>
                
                <button
                    onClick={exportAsImage}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    📸 Export Image
                </button>
                
                <button
                    onClick={clearCanvas}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    🗑️ Clear All
                </button>
                
                <button
                    onClick={onCartClick}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    🛒 View Cart
                </button>
            </div>

            {/* Saved Outfits */}
            {savedOutfits.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                        Saved Outfits
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {savedOutfits.map((outfit, index) => (
                            <button
                                key={index}
                                onClick={() => loadOutfit(index)}
                                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                                Load Outfit {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnhancedOutfitCanvas;