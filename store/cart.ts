import { create } from 'zustand';

interface cartProps {
  _id: string;
  name: string;
  description: string;
  price: number | string | any;
  image: string;
  tags: string[];
  restaurant: string;
}

interface CartState {
  cart: cartProps[];
  setCart: (cart: cartProps[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string;
  setError: (error: string) => void;

  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (cart: cartProps[]) => set({ cart }),

  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  error: '',
  setError: (error: string) => set,

  quantity: 0,
  setQuantity: (quantity: number) => set({ quantity }),
}));
