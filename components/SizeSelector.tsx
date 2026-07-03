'use client';

import { useState } from 'react';
import { Product, ProductSize } from '@/lib/types';

interface SizeSelectorProps {
  product: Product;
  onSelect: (size: ProductSize) => void;
  selectedSize?: ProductSize;
}

export default function SizeSelector({
  product,
  onSelect,
  selectedSize,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="micro-label">SELECT SIZE</label>
      <div className="flex gap-2 flex-wrap">
        {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((size) => {
          const stock = product.stock[size];
          const isDisabled = stock === 0;
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => !isDisabled && onSelect(size)}
              disabled={isDisabled}
              className={`
                px-6 py-2 border transition-all duration-300
                ${isDisabled ? 'border-luxury-silver/20 text-luxury-silver/40 cursor-not-allowed line-through' : ''}
                ${isSelected && !isDisabled ? 'border-luxury-white bg-luxury-white text-luxury-black' : ''}
                ${!isSelected && !isDisabled ? 'border-luxury-white/40 hover:border-luxury-white' : ''}
              `}
              title={isDisabled ? `${size} - Out of stock` : undefined}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
