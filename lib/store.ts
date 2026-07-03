import { create } from 'zustand';
import { CartState, CartItem, WishlistState, ProductSize } from './types';

export const useCartStore = create<CartState>((set) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  
  addItem: (item: CartItem) => set((state) => {
    const existingItem = state.items.find(
      (i) => i.product_id === item.product_id && i.size === item.size
    );
    
    const newItems = existingItem
      ? state.items.map((i) =>
          i.product_id === item.product_id && i.size === item.size
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, 10) }
            : i
        )
      : [...state.items, item];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
    
    return { items: newItems };
  }),
  
  removeItem: (product_id: string, size: ProductSize) => set((state) => {
    const newItems = state.items.filter(
      (i) => !(i.product_id === product_id && i.size === size)
    );
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newItems));
    }
    
    return { items: newItems };
  }),
  
  updateQuantity: (product_id: string, size: ProductSize, quantity: number) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.product_id === product_id && i.size === size
          ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) }
          : i
      );
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
      
      return { items: newItems };
    }),
  
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    return { items: [] };
  },
}));

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wishlist') || '[]') : [],
  
  addItem: (product_id: string) => set((state) => {
    const newItems = [...new Set([...state.items, product_id])];
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newItems));
    }
    
    return { items: newItems };
  }),
  
  removeItem: (product_id: string) => set((state) => {
    const newItems = state.items.filter((id) => id !== product_id);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newItems));
    }
    
    return { items: newItems };
  }),
  
  isWishlisted: (product_id: string) => get().items.includes(product_id),
}));
