// Mock API functions - replace with actual backend calls
import { Product, Order, Subscriber, ContactSubmission } from './types';

// Mock database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Essential Black Tee',
    description: 'Premium cotton essentials. Minimalist design, maximum impact.',
    price: 120,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    category: 'Black Collection',
    sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 8, M: 14, L: 20, XL: 12, XXL: 5 },
    featured: true,
  },
  {
    id: '2',
    name: 'Monochrome Hoodie',
    description: 'Luxe hoodie in premium fabric blend. Statement piece.',
    price: 280,
    images: ['https://images.unsplash.com/photo-1556821552-7c82c1b24160?w=800'],
    category: 'Black Collection',
    sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 5, M: 10, L: 15, XL: 8, XXL: 3 },
    featured: true,
  },
  {
    id: '3',
    name: 'Ivory Oversized Shirt',
    description: 'Elevated basics. Precision tailored in premium cotton.',
    price: 195,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800'],
    category: 'White Collection',
    sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 12, M: 18, L: 22, XL: 16, XXL: 8 },
    featured: true,
  },
  {
    id: '4',
    name: 'Cream Cargo Trousers',
    description: 'Structural elegance. Tailored comfort meets streetwear attitude.',
    price: 245,
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800'],
    category: 'White Collection',
    sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 6, M: 11, L: 16, XL: 10, XXL: 4 },
    featured: false,
  },
  {
    id: '5',
    name: 'Limited Cargo Hoody',
    description: 'Exclusive drop. Technical fabric, timeless design.',
    price: 320,
    images: ['https://images.unsplash.com/photo-1516575334481-f410b4e4b6ca?w=800'],
    category: 'Limited Edition',
    sizes_available: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 2, M: 3, L: 5, XL: 3, XXL: 1 },
    featured: true,
  },
];

let orders: Order[] = [];
let subscribers: Subscriber[] = [];
let submissions: ContactSubmission[] = [];

// Product API
export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | null> {
  return mockProducts.find((p) => p.id === id) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return mockProducts.filter((p) => p.category === category);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  mockProducts[index] = { ...mockProducts[index], ...data };
  return mockProducts[index];
}

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const newProduct = { ...data, id: Date.now().toString() };
  mockProducts.push(newProduct);
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  mockProducts.splice(index, 1);
  return true;
}

// Order API
export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
  const newOrder = { ...data, id: Date.now().toString() };
  orders.push(newOrder);
  return newOrder;
}

export async function getOrders(): Promise<Order[]> {
  return orders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  return orders.find((o) => o.id === id) || null;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | null> {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status as any;
  return order;
}

// Newsletter API
export async function subscribeNewsletter(email: string): Promise<Subscriber> {
  const newSubscriber = { id: Date.now().toString(), email, created_at: new Date().toISOString() };
  subscribers.push(newSubscriber);
  return newSubscriber;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  return subscribers;
}

// Contact API
export async function submitContact(name: string, email: string, message: string): Promise<ContactSubmission> {
  const newSubmission = {
    id: Date.now().toString(),
    name,
    email,
    message,
    created_at: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  return newSubmission;
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  return submissions;
}
