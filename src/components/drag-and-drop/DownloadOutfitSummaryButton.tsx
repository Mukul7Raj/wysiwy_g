'use client';

import React from 'react';
import jsPDF from 'jspdf';
import { useCart } from '@/context/CartContext';

const DownloadOutfitSummaryButton: React.FC = () => {
  const { cart } = useCart();

  const handleDownloadText = () => {
    const summary = cart.map((outfit, idx) => {
      const itemsArray = Array.isArray(outfit.items) ? outfit.items : [];
      const itemsSummary = itemsArray.map(item =>
        `  - Type: ${item.itemType}\n    ID: ${item.id}\n    Image: ${item.imageUrl}`
      ).join('\n');
      return `Outfit ${idx + 1}:\n${itemsSummary}`;
    }).join('\n\n---\n\n');

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'outfit-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper to load image as data URL
  const loadImageAsDataURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    let y = 10;

    for (const [idx, outfit] of cart.entries()) {
      const itemsArray = Array.isArray(outfit.items) ? outfit.items : [];
      doc.text(`Outfit ${idx + 1}:`, 10, y);
      y += 8;
      for (const item of itemsArray) {
        // Add image
        try {
          const dataUrl = await loadImageAsDataURL(item.imageUrl);
          doc.addImage(dataUrl, 'PNG', 12, y, 24, 24);
        } catch (e) {
          doc.text('[Image failed to load]', 12, y + 12);
        }
        // Add text info next to image
        doc.text(`Type: ${item.itemType}`, 40, y + 8);
        doc.text(`ID: ${item.id}`, 40, y + 16);
        y += 28;
      }
      y += 4;
      // Add new page if needed
      if (y > 260) {
        doc.addPage();
        y = 10;
      }
    }

    doc.save('outfit-summary.pdf');
  };

  return (
    <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
      <button onClick={handleDownloadText}>
        Download Outfit Summary (Text)
      </button>
      <button onClick={handleDownloadPDF}>
        Download Outfit Summary (PDF)
      </button>
    </div>
  );
};

export default DownloadOutfitSummaryButton;
