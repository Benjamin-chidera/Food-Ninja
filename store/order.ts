import { create } from 'zustand';
import { FoodProps } from './food';

interface OrderProps {
  order: {
    item: FoodProps[];
    paymentStatus: string;
  };
  setOrder: (item: FoodProps[]) => void;

  refreshing: boolean;
  setRefreshing: (refreshing: boolean) => void;
}

export const useOrderStore = create<OrderProps>((set) => ({
  order: {
    item: [],
    paymentStatus: '',
  },

  setOrder: (item) => set((state) => ({ order: { ...state.order, item } })),
  refreshing: false,
  setRefreshing: (refreshing) => set({ refreshing }),
}));
