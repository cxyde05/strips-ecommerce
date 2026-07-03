'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts, getOrders, getSubscribers, getSubmissions } from '@/lib/api';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalSubscribers: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const [products, orders, subscribers, submissions] = await Promise.all([
        getProducts(),
        getOrders(),
        getSubscribers(),
        getSubmissions(),
      ]);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalSubscribers: subscribers.length,
        totalMessages: submissions.length,
      });
      setLoading(false);
    };

    loadStats();
  }, []);

  const dashboardCards = [
    {
      title: 'PRODUCTS',
      value: stats.totalProducts,
      link: '/admin/products',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'ORDERS',
      value: stats.totalOrders,
      link: '/admin/orders',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'SUBSCRIBERS',
      value: stats.totalSubscribers,
      link: '/admin/newsletter',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'MESSAGES',
      value: stats.totalMessages,
      link: '/admin/contact',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-6xl mb-2">ADMIN DASHBOARD</h1>
            <p className="text-luxury-silver">Manage your II STRIPS e-commerce platform</p>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={card.link}>
                    <div className="bg-luxury-silver/5 border border-luxury-silver/20 p-6 hover:border-luxury-silver/40 transition-all cursor-pointer group">
                      <p className="micro-label text-luxury-silver mb-4">{card.title}</p>
                      <p className="font-display text-4xl mb-4 group-hover:text-luxury-silver transition-colors">
                        {card.value}
                      </p>
                      <p className="text-xs text-luxury-silver">View Details →</p>
                    </div>
                  </Link>
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
