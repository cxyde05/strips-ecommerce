'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function OrderConfirmation() {
  const params = useParams();
  const orderId = params.id as string;

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 md:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Success Icon */}
            <div className="text-6xl">✓</div>

            {/* Title */}
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">ORDER CONFIRMED</h1>
              <p className="text-luxury-silver text-lg">Thank you for your purchase</p>
            </div>

            {/* Order Number */}
            <div className="bg-luxury-silver/5 border border-luxury-silver/20 p-8 space-y-3">
              <p className="micro-label text-luxury-silver">ORDER NUMBER</p>
              <p className="font-display text-2xl tracking-wider">ORD-{orderId.slice(0, 8).toUpperCase()}</p>
            </div>

            {/* Message */}
            <div className="space-y-4 text-luxury-silver">
              <p>We've sent a confirmation email with your order details and tracking information.</p>
              <p>You'll receive shipping updates via email shortly.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary">
                CONTINUE SHOPPING
              </Link>
              <Link href="/" className="btn btn-secondary">
                BACK TO HOME
              </Link>
            </div>

            {/* Contact */}
            <div className="text-sm text-luxury-silver border-t border-luxury-silver/20 pt-8">
              <p className="mb-2">Questions? Reach out to us at</p>
              <a href="mailto:support@iistrips.com" className="hover:text-luxury-white transition-colors">
                support@iistrips.com
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
