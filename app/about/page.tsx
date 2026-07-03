'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function About() {
  const pillars = [
    {
      title: 'DISCIPLINE',
      description: 'Every piece is crafted with meticulous attention to detail. We believe discipline defines quality.',
    },
    {
      title: 'PURPOSE',
      description: 'We design with intention. Each collection tells a story of resilience and confidence.',
    },
    {
      title: 'LEGACY',
      description: 'Ⅱ STRIPS is built to last. Timeless pieces that transcend trends and seasons.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative w-full h-96 md:h-screen flex items-center justify-center overflow-hidden mb-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&h=900&fit=crop"
              alt="About Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/50 to-luxury-black/80"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="font-display text-5xl md:text-7xl">OUR STORY</h1>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="px-4 md:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-display text-2xl md:text-4xl italic text-luxury-silver mb-12"
            >
              Ⅱ STRIPS is built on discipline, purpose, and legacy. Every piece is designed to represent confidence, resilience, and timeless style.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm text-luxury-silver leading-relaxed space-y-4"
            >
              <p>
                We are more than a streetwear brand. We are a movement built on the principles of minimalism, quality, and purpose. Every garment in our collection is a statement—a declaration of who you are and what you stand for.
              </p>
              <p>
                Our design philosophy rejects excess and embraces silence. In a world of noise, we believe strength lies in subtlety. Each piece is meticulously crafted to stand the test of time, both in durability and aesthetic.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="px-4 md:px-8 py-20 md:py-32 bg-luxury-black/50 border-y border-luxury-silver/20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <p className="micro-label mb-4 scroll-reveal">OUR VALUES</p>
              <h2 className="font-display text-4xl md:text-6xl scroll-reveal">THE THREE PILLARS</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <h3 className="font-display text-2xl">{pillar.title}</h3>
                  <p className="text-sm text-luxury-silver leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
