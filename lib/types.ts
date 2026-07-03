// Product types
export type ProductCategory = 'Black Collection' | 'White Collection' | 'New Arrivals' | 'Limited Edition';
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  sizes_available: ProductSize[];
  stock: Record<ProductSize, number>;
  featured: boolean;
  created_at?: string;
}

export interface CartItem {
  product_id: string;
  size: ProductSize;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (product_id: string, size: ProductSize) => void;
  updateQuantity: (product_id: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
}

export interface WishlistState {
  items: string[];
  addItem: (product_id: string) => void;
  removeItem: (product_id: string) => void;
  isWishlisted: (product_id: string) => boolean;
}

export interface ShippingAddress {
  address: string;
  city: string;
  country: string;
  postal_code: string;
}

export interface OrderLineItem {
  product_id: string;
  name: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  shipping_address: ShippingAddress;
  line_items: OrderLineItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: OrderStatus;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
