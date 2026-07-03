'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSubscribers } from '@/lib/api';
import { Subscriber } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscribers = async () => {
      const data = await getSubscribers();
      setSubscribers(data);
      setLoading(false);
    };

    loadSubscribers();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-6xl mb-2">NEWSLETTER SUBSCRIBERS</h1>
            <p className="text-luxury-silver text-lg">Total: {subscribers.length}</p>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : subscribers.length === 0 ? (
            <div className="text-center text-luxury-silver py-20">No subscribers yet</div>
          ) : (
            <div className="border-t border-luxury-silver/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscribers.map((subscriber, idx) => (
                  <motion.div
                    key={subscriber.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-luxury-silver/5 border border-luxury-silver/20 p-6"
                  >
                    <p className="font-display mb-2">{subscriber.email}</p>
                    <p className="text-sm text-luxury-silver">Subscribed: {formatDate(subscriber.created_at)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
