'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND_NAME, BRAND_MOTTO } from '@/lib/constants';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.filter((p) => p.featured));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&h=900&fit=crop"
              alt="Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/50 to-luxury-black/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-widest">
                {BRAND_NAME}
              </h1>
              <p className="font-display text-lg md:text-xl italic text-luxury-silver max-w-2xl mx-auto">
                {BRAND_MOTTO}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12"
            >
              <Link href="/shop" className="btn btn-primary inline-block">
                SHOP NOW
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-luxury-silver"
          >
            <p className="text-xs micro-label mb-2">SCROLL</p>
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* New Collection Section */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center scroll-reveal">
              <p className="micro-label mb-4">DISCOVER</p>
              <h2 className="font-display text-4xl md:text-6xl">NEW COLLECTION</h2>
            </div>

            {loading ? (
              <div className="text-center py-20">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="scroll-reveal"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About Teaser */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-luxury-black/50 border-y border-luxury-silver/20">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="font-display text-2xl md:text-3xl italic mb-8 text-luxury-silver">
              "{BRAND_NAME} is a premium streetwear brand built on discipline, purpose and legacy."
            </p>
            <Link href="/about" className="inline-block mt-4">
              <span className="text-sm micro-label hover:text-luxury-silver transition-colors">
                LEARN MORE →
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
