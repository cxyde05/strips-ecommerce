'use client';

import Link from 'next/link';
import { BRAND_NAME, BRAND_MOTTO } from '@/lib/constants';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-silver/20">
      {/* Newsletter Section */}
      <div className="border-b border-luxury-silver/20 py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl mb-4">STAY IN THE LOOP</h3>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              {subscribed ? '✓ SUBSCRIBED' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h4 className="font-display text-xl mb-4">{BRAND_NAME}</h4>
            <p className="text-sm text-luxury-silver mb-4">Premium luxury streetwear built on discipline, purpose, and legacy.</p>
            <p className="text-xs italic text-luxury-silver">"{BRAND_MOTTO}"</p>
          </div>

          {/* Shop */}
          <div>
            <h5 className="micro-label mb-4">SHOP</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop?category=Black Collection" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Black Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=White Collection" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  White Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?category=New Arrivals" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Limited Edition" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand */}
          <div>
            <h5 className="micro-label mb-4">BRAND</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="micro-label mb-4">CONNECT</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="mailto:contact@iistrips.com" className="text-luxury-silver hover:text-luxury-white transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-luxury-silver/20 mt-12 pt-8 text-center text-xs text-luxury-silver">
          <p>© 2024 Ⅱ STRIPS. All rights reserved. Strength is in Silence.</p>
        </div>
      </div>
    </footer>
  );
}
