import { createContext, ReactNode, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useCartStore } from './cart';
import axios from 'axios';

type CartProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  isInCart: boolean | string;
  setIsInCart: (isInCart: boolean) => void;
  addToCart: (id: string) => Promise<void>;
};

const CartContext = createContext<CartProps | null>(null);

export const useGlobalCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { quantity, setQuantity, isInCart, setIsInCart, setCart } = useCartStore();

  const getCart = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios(`${apiUrl}/cart/get-cart/${token}`);
      if (data.success) {
        console.log(data.cart.items);
        // const check = data.cart.items.some((item: any) => item.food._id === id);
        // setIsInCart(check);

        setCart(data.cart.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (id: string) => {
    if (quantity < 1) {
      return;
    }

    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios.post(`${apiUrl}/cart/add-to-cart`, {
        userId: token,
        foodId: id,
        quantity,
      });

      if (data.success) {
        console.log(data);
        getCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        quantity,
        setQuantity,
        isInCart,
        setIsInCart,
        addToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
