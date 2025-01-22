/* eslint-disable import/order */
import { createContext, ReactNode, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useCartStore } from './cart';
import axios from 'axios';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { ShoppingCart } from 'lucide-react-native';
import { useOrderStore } from './order';

type CartProps = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  isInCart: boolean | string;
  setIsInCart: (isInCart: boolean) => void;
  addToCart: (id: string) => Promise<void>;
  removeCart: (id: string) => Promise<void>;
  getOrders: () => Promise<void>;
};

const CartContext = createContext<CartProps | null>(null);

export const useGlobalCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { quantity, setQuantity, isInCart, setIsInCart, setCart, setLoading } = useCartStore();

  const { setOrder } = useOrderStore();

  const getCart = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios(`${apiUrl}/cart/get-cart/${token}`);
      if (data.success) {
        // console.log(data);
        // const check = data.cart.items.some((item: any) => item.food._id === id);
        // setIsInCart(check);

        setCart(data.cart);
        setLoading(false);

        // <Alert icon={<ShoppingCart />} className="max-w-xl">
        //   <AlertTitle>Heads up!</AlertTitle>
        //   <AlertDescription>
        //     You can use a terminal to run commands on your computer.
        //   </AlertDescription>
        // </Alert>;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (id: string) => {
    setLoading(true);
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
        setLoading(false);
        getCart();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const removeCart = async (id: string) => {
    console.log(id);

    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);

      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios.post(`${apiUrl}/cart/remove-from-cart`, {
        userId: token,
        foodId: id,
      });

      if (data.success) {
        console.log(data);
        getCart();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);

      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios.get(`${apiUrl}/order/${token}`);

      if (data.success) {
        setOrder(data.orders);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <CartContext.Provider
      value={{
        quantity,
        setQuantity,
        isInCart,
        setIsInCart,
        addToCart,
        removeCart,
        getOrders,
      }}>
      {children}
    </CartContext.Provider>
  );
};
