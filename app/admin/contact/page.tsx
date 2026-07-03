'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSubmissions } from '@/lib/api';
import { ContactSubmission } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AdminContact() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadSubmissions = async () => {
      const data = await getSubmissions();
      setSubmissions(data);
      setLoading(false);
    };

    loadSubmissions();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-6xl mb-2">CONTACT MESSAGES</h1>
            <p className="text-luxury-silver text-lg">Total: {submissions.length}</p>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="text-center text-luxury-silver py-20">No messages yet</div>
          ) : (
            <div className="space-y-4 border-t border-luxury-silver/20">
              {submissions.map((submission, idx) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-luxury-silver/5 border border-luxury-silver/20"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                    className="w-full p-6 flex justify-between items-start hover:bg-luxury-silver/10 transition-colors text-left"
                  >
                    <div className="space-y-1 flex-1">
                      <h3 className="font-display text-lg">{submission.name}</h3>
                      <p className="text-sm text-luxury-silver">{submission.email}</p>
                      <p className="text-xs text-luxury-silver mt-2">Sent: {formatDate(submission.created_at)}</p>
                    </div>
                    <span className="text-2xl ml-4">{expandedId === submission.id ? '−' : '+'}</span>
                  </button>

                  {expandedId === submission.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-luxury-silver/20 p-6 bg-luxury-black/50 text-sm text-luxury-silver leading-relaxed"
                    >
                      {submission.message}
                    </motion.div>
                  )}
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
