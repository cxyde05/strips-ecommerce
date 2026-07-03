'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SizeSelector from '@/components/SizeSelector';
import QuantityStepper from '@/components/QuantityStepper';
import Accordion from '@/components/Accordion';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProductsByCategory } from '@/lib/api';
import { Product, ProductSize } from '@/lib/types';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  const isWishlisted = wishlistStore.isWishlisted(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(productId);
      setProduct(data);

      if (data) {
        const related = await getProductsByCategory(data.category);
        setRelatedProducts(related.filter((p) => p.id !== productId).slice(0, 4));
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    cartStore.addItem({
      product_id: productId,
      size: selectedSize,
      quantity,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      wishlistStore.removeItem(productId);
    } else {
      wishlistStore.addItem(productId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const accordionItems = [
    {
      title: 'DETAILS & FIT',
      content: product.description + ' Premium construction, timeless silhouette.',
    },
    {
      title: 'SHIPPING & RETURNS',
      content: 'Free worldwide shipping on all orders. 30-day returns on unworn items in original packaging.',
    },
    {
      title: 'COMPOSITION & CARE',
      content: '100% premium cotton. Machine wash cold, tumble dry low. Do not bleach.',
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-luxury-silver/10 aspect-square overflow-hidden group">
                  <Image
                    src={product.images[mainImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImageIndex(idx)}
                        className={`relative w-20 h-20 border transition-all ${
                          mainImageIndex === idx ? 'border-luxury-white' : 'border-luxury-silver/20 hover:border-luxury-white/40'
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="micro-label mb-2">{product.category}</p>
                <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>
                <p className="text-2xl text-luxury-silver">{formatPrice(product.price)}</p>
              </div>

              <p className="text-sm text-luxury-silver leading-relaxed">{product.description}</p>

              {/* Size Selector */}
              <SizeSelector product={product} onSelect={setSelectedSize} selectedSize={selectedSize} />

              {/* Quantity */}
              <QuantityStepper quantity={quantity} onQuantityChange={setQuantity} />

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-primary"
                >
                  {addedToCart ? '✓ ADDED TO CART' : 'ADD TO CART'}
                </button>
                <button
                  onClick={toggleWishlist}
                  className="px-6 btn btn-secondary"
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Accordion items={accordionItems} />
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-12 text-center">
                <p className="micro-label mb-4">YOU MAY ALSO LIKE</p>
                <h2 className="font-display text-3xl md:text-4xl">Related Products</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
