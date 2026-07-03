'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { getProductById } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Cart() {
  const cartStore = useCartStore();
  const [cartProducts, setCartProducts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const items = await Promise.all(
        cartStore.items.map(async (item) => {
          const product = await getProductById(item.product_id);
          return { ...item, product };
        })
      );
      setCartProducts(items);
      setLoading(false);
    };

    loadCart();
  }, [cartStore.items]);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-6xl mb-12">YOUR CART</h1>

          {cartProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-luxury-silver mb-8">Your cart is empty</p>
              <Link href="/shop" className="btn btn-primary inline-block">
                CONTINUE SHOPPING
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Items */}
              <div className="lg:col-span-2 space-y-8">
                {cartProducts.map((item, index) => (
                  <motion.div
                    key={`${item.product_id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 pb-6 border-b border-luxury-silver/20"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-luxury-silver/10 flex-shrink-0">
                      <Image
                        src={item.product?.images[0] || ''}
                        alt={item.product?.name || ''}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-display text-lg">{item.product?.name}</h3>
                      <p className="text-sm text-luxury-silver">Size: {item.size}</p>
                      <p className="text-sm text-luxury-silver">{formatPrice(item.product?.price || 0)}</p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="space-y-4 text-right">
                      <div className="flex items-center justify-end border border-luxury-white/40">
                        <button
                          onClick={() =>
                            cartStore.updateQuantity(item.product_id, item.size, item.quantity - 1)
                          }
                          className="px-2 py-1"
                        >
                          −
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            cartStore.updateQuantity(item.product_id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => cartStore.removeItem(item.product_id, item.size)}
                        className="text-xs text-luxury-silver hover:text-luxury-white transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-luxury-silver/5 p-8 h-fit border border-luxury-silver/20"
              >
                <h3 className="font-display text-xl mb-6">ORDER SUMMARY</h3>
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-luxury-silver">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-luxury-silver">Shipping</span>
                    <span className="text-luxury-white">Complimentary</span>
                  </div>
                </div>
                <div className="border-t border-luxury-silver/20 pt-4 mb-6 flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Link href="/checkout" className="block btn btn-primary w-full text-center mb-3">
                  PROCEED TO CHECKOUT
                </Link>
                <Link href="/shop" className="block btn btn-secondary w-full text-center">
                  CONTINUE SHOPPING
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
