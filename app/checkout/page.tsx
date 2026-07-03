'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { createOrder, getProductById } from '@/lib/api';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Checkout() {
  const router = useRouter();
  const cartStore = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postal_code: '',
    payment_method: 'card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calculate totals
      let subtotal = 0;
      const line_items = await Promise.all(
        cartStore.items.map(async (item) => {
          const product = await getProductById(item.product_id);
          const itemTotal = (product?.price || 0) * item.quantity;
          subtotal += itemTotal;
          return {
            product_id: item.product_id,
            name: product?.name || '',
            size: item.size,
            quantity: item.quantity,
            price: product?.price || 0,
          };
        })
      );

      const shipping_cost = 0;
      const total = subtotal + shipping_cost;

      // Create order
      const order = await createOrder({
        order_number: generateOrderNumber(),
        customer: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
        },
        shipping_address: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postal_code: formData.postal_code,
        },
        line_items,
        subtotal,
        shipping_cost,
        total,
        status: 'Pending',
        created_at: new Date().toISOString(),
      });

      // Clear cart
      cartStore.clearCart();

      // Redirect to confirmation
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const cartItems = cartStore.items;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * 100), 0) / 100; // Mock calculation
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-6xl mb-12">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Shipping Details */}
              <div>
                <h2 className="font-display text-2xl mb-6">SHIPPING DETAILS</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                  />
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors mb-4"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors mb-4"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                  />
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors mt-4"
                />
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-display text-2xl mb-6">PAYMENT METHOD</h2>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white focus:outline-none focus:border-luxury-white transition-colors"
                >
                  <option value="card" className="bg-luxury-black">Credit Card</option>
                  <option value="paypal" className="bg-luxury-black">PayPal</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary disabled:opacity-50"
              >
                {loading ? 'PROCESSING...' : 'PLACE ORDER'}
              </button>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-luxury-silver/5 p-8 h-fit border border-luxury-silver/20"
            >
              <h3 className="font-display text-xl mb-6">ORDER SUMMARY</h3>
              <div className="space-y-3 mb-6 text-sm border-b border-luxury-silver/20 pb-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-luxury-silver">
                    <span>Item {idx + 1} (x{item.quantity})</span>
                    <span className="text-luxury-white">$120.00</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxury-silver">Shipping</span>
                  <span className="text-luxury-white">Complimentary</span>
                </div>
              </div>
              <div className="border-t border-luxury-silver/20 pt-4 flex justify-between font-display text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
