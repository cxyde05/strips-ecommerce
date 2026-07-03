'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useWishlistStore } from '@/lib/store';
import { formatPrice, getTotalStock } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const wishlist = useWishlistStore();
  const isWishlisted = wishlist.isWishlisted(product.id);
  const totalStock = getTotalStock(product.stock);
  const isLowStock = totalStock < 8;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      wishlist.removeItem(product.id);
    } else {
      wishlist.addItem(product.id);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-luxury-silver/10 aspect-square mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 text-2xl transition-all duration-300 hover:scale-110"
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>

          {/* Low Stock Badge */}
          {isLowStock && (
            <div className="absolute bottom-4 left-4 bg-luxury-white text-luxury-black px-3 py-1 text-xs micro-label">
              LOW STOCK
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <p className="micro-label text-luxury-silver">{product.category}</p>
          <h3 className="font-display text-lg md:text-xl group-hover:text-luxury-silver transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-luxury-silver">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
