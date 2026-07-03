'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Black Collection',
    stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    featured: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleStockChange = (size: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      stock: { ...prev.stock, [size]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProduct(editingId, formData as any);
      } else {
        await createProduct({
          ...formData,
          images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
          sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
        } as any);
      }
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Black Collection',
        stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        featured: false,
      });
      setEditingId(null);
      setShowForm(false);
      loadProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-display text-4xl md:text-6xl">MANAGE PRODUCTS</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  name: '',
                  description: '',
                  price: 0,
                  category: 'Black Collection',
                  stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
                  featured: false,
                });
              }}
              className="btn btn-primary"
            >
              {showForm ? 'CANCEL' : 'ADD PRODUCT'}
            </button>
          </div>

          {/* Product Form */}
          {showForm && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-luxury-silver/5 border border-luxury-silver/20 p-8 mb-12 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange as any}
                required
                className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors resize-none"
                rows={3}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-luxury-silver/40 px-4 py-3 text-luxury-white focus:outline-none focus:border-luxury-white transition-colors"
              >
                <option value="Black Collection" className="bg-luxury-black">Black Collection</option>
                <option value="White Collection" className="bg-luxury-black">White Collection</option>
                <option value="New Arrivals" className="bg-luxury-black">New Arrivals</option>
                <option value="Limited Edition" className="bg-luxury-black">Limited Edition</option>
              </select>

              {/* Stock Management */}
              <div className="space-y-3">
                <label className="micro-label">STOCK BY SIZE</label>
                <div className="grid grid-cols-5 gap-3">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <input
                      key={size}
                      type="number"
                      placeholder={size}
                      value={formData.stock[size as any]}
                      onChange={(e) => handleStockChange(size, parseInt(e.target.value) || 0)}
                      className="bg-transparent border border-luxury-silver/40 px-3 py-2 text-luxury-white placeholder:text-luxury-silver/60 focus:outline-none focus:border-luxury-white transition-colors text-center"
                    />
                  ))}
                </div>
              </div>

              {/* Featured Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="micro-label">Featured Product</span>
              </label>

              <button type="submit" className="btn btn-primary w-full">
                {editingId ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
              </button>
            </motion.form>
          )}

          {/* Products List */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-3 border-t border-luxury-silver/20">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-luxury-silver/5 border border-luxury-silver/20 p-6 flex justify-between items-center hover:border-luxury-silver/40 transition-all"
                >
                  <div>
                    <h3 className="font-display text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-luxury-silver">{product.category}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="font-display text-lg">${product.price}</span>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-secondary px-4 py-2 text-sm">
                      DELETE
                    </button>
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
