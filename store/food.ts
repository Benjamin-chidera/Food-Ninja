import { create } from 'zustand';

export interface FoodProps {
  _id: string;
  name: string;
  description: string;
  price: number | string | any;
  image: string;
  tags: string[];
  restaurant: string;
}

interface FoodState {
  foods: FoodProps[];
  setFoods: (foods: FoodProps[]) => void;

  foodDetails: FoodProps | null;
  setFoodDetails: (foodDetails: FoodProps | null) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  foods: [],
  setFoods: (foods) => set({ foods }),

  foodDetails: null,
  setFoodDetails: (foodDetails) => set({ foodDetails }),
}));
