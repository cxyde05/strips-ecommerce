'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function Lookbook() {
  const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1516575334481-f410b4e4b6ca?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1556821552-7c82c1b24160?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
  ];

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="px-4 md:px-8">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="micro-label mb-4">VISUAL</p>
              <h1 className="font-display text-5xl md:text-7xl">LOOKBOOK</h1>
            </motion.div>
          </div>

          {/* Masonry Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden bg-luxury-silver/10 group ${
                    (idx + 1) % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  style={{
                    aspectRatio: (idx + 1) % 5 === 0 ? '1 / 1' : idx % 2 === 0 ? '3 / 4' : '4 / 3',
                  }}
                >
                  <Image
                    src={img}
                    alt={`Lookbook ${idx + 1}`}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
