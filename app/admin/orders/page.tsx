'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrders, updateOrderStatus } from '@/lib/api';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-6xl mb-12">MANAGE ORDERS</h1>

          {loading ? (
            <div>Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-luxury-silver py-20">No orders yet</div>
          ) : (
            <div className="space-y-4 border-t border-luxury-silver/20">
              {orders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-luxury-silver/5 border border-luxury-silver/20 p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="micro-label mb-1">ORDER NUMBER</p>
                      <p className="font-display">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="micro-label mb-1">CUSTOMER</p>
                      <p className="font-display">{order.customer.first_name} {order.customer.last_name}</p>
                    </div>
                    <div>
                      <p className="micro-label mb-1">DATE</p>
                      <p>{formatDate(order.created_at)}</p>
                    </div>
                    <div>
                      <p className="micro-label mb-1">TOTAL</p>
                      <p className="font-display text-lg">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <div className="border-t border-luxury-silver/20 pt-4">
                    <p className="micro-label mb-3">STATUS</p>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-transparent border border-luxury-silver/40 px-4 py-2 text-luxury-white focus:outline-none focus:border-luxury-white transition-colors"
                    >
                      <option value="Pending" className="bg-luxury-black">Pending</option>
                      <option value="Shipped" className="bg-luxury-black">Shipped</option>
                      <option value="Delivered" className="bg-luxury-black">Delivered</option>
                    </select>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
