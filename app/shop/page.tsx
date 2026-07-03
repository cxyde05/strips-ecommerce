'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getProductsByCategory } from '@/lib/api';
import { Product, ProductCategory } from '@/lib/types';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function Shop() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let data;
      if (selectedCategory) {
        data = await getProductsByCategory(selectedCategory);
      } else {
        data = await getProducts();
      }

      // Filter by size if selected
      if (selectedSize) {
        data = data.filter((p) => p.sizes_available.includes(selectedSize as any));
      }

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, selectedSize]);

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        {/* Header */}
        <section className="px-4 md:px-8 py-12 border-b border-luxury-silver/20">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl mb-8">{selectedCategory || 'ALL PRODUCTS'}</h1>

            {/* Filters */}
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="space-y-3">
                <p className="micro-label">CATEGORY</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSize(null);
                    }}
                    className={`px-4 py-2 text-sm transition-all ${
                      !selectedCategory ? 'bg-luxury-white text-luxury-black' : 'border border-luxury-white/40 hover:border-luxury-white'
                    }`}
                  >
                    All
                  </button>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedSize(null);
                      }}
                      className={`px-4 py-2 text-sm transition-all ${
                        selectedCategory === cat
                          ? 'bg-luxury-white text-luxury-black'
                          : 'border border-luxury-white/40 hover:border-luxury-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-3">
                <p className="micro-label">SIZE</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSize(null)}
                    className={`px-4 py-2 text-sm transition-all ${
                      !selectedSize ? 'bg-luxury-white text-luxury-black' : 'border border-luxury-white/40 hover:border-luxury-white'
                    }`}
                  >
                    All Sizes
                  </button>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm transition-all ${
                        selectedSize === size
                          ? 'bg-luxury-white text-luxury-black'
                          : 'border border-luxury-white/40 hover:border-luxury-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-luxury-silver">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
