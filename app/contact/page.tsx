'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { submitContact } from '@/lib/api';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData.name, formData.email, formData.message);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-6xl mb-16">GET IN TOUCH</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors resize-none"
              />
              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {submitted ? '✓ MESSAGE SENT' : loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="font-display text-2xl mb-4">CONNECT WITH US</h3>
                <p className="text-luxury-silver mb-8">Follow our journey and stay updated on new collections, exclusive drops, and brand stories.</p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block micro-label hover:text-luxury-white transition-colors"
                >
                  → INSTAGRAM
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block micro-label hover:text-luxury-white transition-colors"
                >
                  → TIKTOK
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block micro-label hover:text-luxury-white transition-colors"
                >
                  → YOUTUBE
                </a>
              </div>

              {/* Email */}
              <div className="border-t border-luxury-silver/20 pt-8">
                <p className="micro-label mb-2 text-luxury-silver">EMAIL</p>
                <a
                  href="mailto:contact@iistrips.com"
                  className="font-display text-xl hover:text-luxury-silver transition-colors"
                >
                  contact@iistrips.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
