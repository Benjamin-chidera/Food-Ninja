import { create } from 'zustand';

export interface FoodProps {
  _id: string;
  name: string;
  description: string;
  price: number | string | any;
  image: string;
  tags: string[];
  restaurant: string;
  isFavorite?: boolean;
}

interface FoodState {
  foods: FoodProps[];
  setFoods: (foods: FoodProps[]) => void;

  foodDetails: FoodProps | null;
  setFoodDetails: (foodDetails: FoodProps | null) => void;

  nearestRestaurant: FoodProps[];
  setNearestRestaurant: (nearestRestaurant: FoodProps[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  isFavorite: boolean;
  setIsFavorite: (isFavorite: boolean) => void;

  favorites: FoodProps[];
  setFavorites: (favorites: FoodProps[]) => void;

  toggleFavorite: (foodId: string) => void;
}

export const useFoodStore = create<FoodState>((set) => ({
  foods: [],
  setFoods: (foods) => set({ foods }),

  foodDetails: null,
  setFoodDetails: (foodDetails) => set({ foodDetails }),

  nearestRestaurant: [],
  setNearestRestaurant: (nearestRestaurant) => set({ nearestRestaurant }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  isFavorite: false,
  setIsFavorite: (isFavorite) => set({ isFavorite }),

  favorites: [],
  setFavorites: (favorites) => set({ favorites }),

  toggleFavorite: (foodId: string) =>
    set((state) => {
      const updatedFoodDetails = state.foodDetails;
      if (updatedFoodDetails && updatedFoodDetails._id === foodId) {
        updatedFoodDetails.isFavorite = !updatedFoodDetails.isFavorite;
        return { foodDetails: updatedFoodDetails };
      }
      return {};
    }),
}));
