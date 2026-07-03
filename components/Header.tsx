'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BRAND_NAME, BRAND_MOTTO } from '@/lib/constants';
import { useCartStore } from '@/lib/store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-black border-b border-luxury-silver/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-3xl font-semibold tracking-wide hover:text-luxury-silver transition-colors">
            {BRAND_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link href="/shop" className="micro-label hover:text-luxury-white transition-colors">
              SHOP
            </Link>
            <Link href="/about" className="micro-label hover:text-luxury-white transition-colors">
              ABOUT
            </Link>
            <Link href="/lookbook" className="micro-label hover:text-luxury-white transition-colors">
              LOOKBOOK
            </Link>
            <Link href="/contact" className="micro-label hover:text-luxury-white transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" className="micro-label hover:text-luxury-white transition-colors">
              ♥ WISHLIST
            </Link>
            <Link href="/cart" className="micro-label hover:text-luxury-white transition-colors relative">
              CART
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-luxury-white text-luxury-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden micro-label hover:text-luxury-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-luxury-silver/20 pt-6 animate-slide-down">
            <Link href="/shop" className="micro-label hover:text-luxury-white" onClick={() => setMobileMenuOpen(false)}>
              SHOP
            </Link>
            <Link href="/about" className="micro-label hover:text-luxury-white" onClick={() => setMobileMenuOpen(false)}>
              ABOUT
            </Link>
            <Link href="/lookbook" className="micro-label hover:text-luxury-white" onClick={() => setMobileMenuOpen(false)}>
              LOOKBOOK
            </Link>
            <Link href="/contact" className="micro-label hover:text-luxury-white" onClick={() => setMobileMenuOpen(false)}>
              CONTACT
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
