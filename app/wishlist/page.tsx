'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlistStore } from '@/lib/store';
import { getProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const wishlistStore = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      const items = await Promise.all(
        wishlistStore.items.map((id) => getProductById(id))
      );
      setProducts(items.filter((p) => p !== null) as Product[]);
      setLoading(false);
    };

    loadWishlist();
  }, [wishlistStore.items]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-6xl mb-12">MY WISHLIST</h1>

          {products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-luxury-silver mb-8">Your wishlist is empty</p>
              <Link href="/shop" className="btn btn-primary inline-block">
                SHOP NOW
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
