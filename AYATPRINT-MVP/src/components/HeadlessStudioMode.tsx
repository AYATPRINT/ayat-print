import React, { useState, useEffect, useCallback } from 'react';

/**
 * HeadlessStudioMode
 * 
 * When the app is opened with ?mode=headless, this component takes over.
 * It provides a streamlined Studio experience that:
 * 1. Opens directly to the Canvas Editor
 * 2. Adds a "Finish Design" button
 * 3. On finish, POSTs the design to the Core API
 * 4. Redirects back to the WooCommerce returnUrl with the design_id
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

interface HeadlessParams {
  productId: string;
  productName: string;
  returnUrl: string;
}

interface DesignState {
  artworkId: string;
  material: string;
  frame: string;
  size: string;
  language: string;
  price: number;
}

export function getHeadlessParams(): HeadlessParams | null {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') !== 'headless') return null;
  return {
    productId: params.get('productId') || '',
    productName: decodeURIComponent(params.get('productName') || 'Custom Artwork'),
    returnUrl: decodeURIComponent(params.get('returnUrl') || ''),
  };
}

export default function HeadlessStudioMode({ params, children }: { params: HeadlessParams; children: React.ReactNode }) {
  const [design, setDesign] = useState<DesignState>({
    artworkId: params.productId,
    material: 'premium_canvas',
    frame: 'walnut_floating',
    size: '50x70cm',
    language: 'ar',
    price: 149.00,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinishDesign = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate a simple preview (in a real app, this would be a canvas screenshot)
      const previewImage = `https://placehold.co/400x400/1C1917/C5A059?text=${encodeURIComponent(params.productName)}`;

      const response = await fetch(`${API_URL}/api/designs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artworkId: design.artworkId,
          previewImage,
          material: design.material,
          frame: design.frame,
          size: design.size,
          language: design.language,
          price: design.price,
          metadata: {
            productName: params.productName,
            source: 'ayat-studio-headless',
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to save design');

      const savedDesign = await response.json();
      console.log('✅ Design saved:', savedDesign);

      // Redirect back to WooCommerce with design_id
      const returnUrl = params.returnUrl || 'http://localhost:8080/ayat-return/';
      const separator = returnUrl.includes('?') ? '&' : '?';
      window.location.href = `${returnUrl}${separator}design_id=${savedDesign.id}`;

    } catch (err) {
      console.error('Failed to save design:', err);
      setError('Failed to save your design. Please try again.');
      setIsSubmitting(false);
    }
  }, [design, params]);

  return (
    <div className="min-h-screen bg-art-cream text-art-charcoal flex flex-col">
      {/* Headless Studio Header */}
      <header className="bg-art-charcoal text-white px-6 py-3 flex items-center justify-between shadow-lg z-50">
        <div className="flex items-center gap-3">
          <span className="text-art-gold font-bold text-lg tracking-wide">✦ Ayat Studio</span>
          <span className="text-white/40 text-xs">|</span>
          <span className="text-white/70 text-sm">Customizing: <strong className="text-white">{params.productName}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          {/* Material Selector */}
          <select 
            value={design.material} 
            onChange={(e) => setDesign(d => ({ ...d, material: e.target.value }))}
            className="bg-white/10 text-white text-xs px-3 py-2 rounded border border-white/20"
          >
            <option value="premium_canvas">Premium Canvas</option>
            <option value="fine_art_paper">Fine Art Paper</option>
            <option value="acrylic">Acrylic Glass</option>
            <option value="metal">Brushed Metal</option>
          </select>
          {/* Frame Selector */}
          <select 
            value={design.frame} 
            onChange={(e) => setDesign(d => ({ ...d, frame: e.target.value }))}
            className="bg-white/10 text-white text-xs px-3 py-2 rounded border border-white/20"
          >
            <option value="walnut_floating">Walnut Floating</option>
            <option value="black_gallery">Black Gallery</option>
            <option value="gold_ornate">Gold Ornate</option>
            <option value="frameless">Frameless</option>
          </select>
          {/* Size Selector */}
          <select 
            value={design.size} 
            onChange={(e) => {
              const prices: Record<string, number> = { '30x40cm': 99, '50x70cm': 149, '70x100cm': 249, '100x150cm': 399 };
              setDesign(d => ({ ...d, size: e.target.value, price: prices[e.target.value] || 149 }));
            }}
            className="bg-white/10 text-white text-xs px-3 py-2 rounded border border-white/20"
          >
            <option value="30x40cm">30×40 cm — $99</option>
            <option value="50x70cm">50×70 cm — $149</option>
            <option value="70x100cm">70×100 cm — $249</option>
            <option value="100x150cm">100×150 cm — $399</option>
          </select>

          {/* Price Display */}
          <span className="text-art-gold font-bold text-lg">${design.price}</span>

          {/* Finish Button */}
          <button
            onClick={handleFinishDesign}
            disabled={isSubmitting}
            className="bg-art-gold text-art-charcoal font-bold text-sm px-6 py-2.5 rounded uppercase tracking-wider hover:bg-art-gold/90 transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            {isSubmitting ? '⏳ Saving...' : '✓ Finish Design'}
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-500 text-white text-center text-sm py-2">
          {error}
        </div>
      )}

      {/* Render the actual Studio content (DesignEditor) */}
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
