import { create } from 'zustand';
import { CartItem, Product } from '../types'; 

interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,

    addItem: (product) =>
        set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        let updatedItems;
        if (existingItem) {
            updatedItems = state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedItems = [...state.items, { ...product, quantity: 1 }];
        }
        const newTotalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return { items: updatedItems, totalPrice: newTotalPrice };
    }),

    removeItem: (productId) =>
        set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== productId);
        const newTotalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return { items: updatedItems, totalPrice: newTotalPrice };
    }),

    increaseQuantity: (productId) =>
        set((state) => {
        const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        const newTotalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return { items: updatedItems, totalPrice: newTotalPrice };
    }),

    decreaseQuantity: (productId) =>
        set((state) => {
        const updatedItems = state.items
            .map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0); 
        const newTotalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return { items: updatedItems, totalPrice: newTotalPrice };
    }),
}));