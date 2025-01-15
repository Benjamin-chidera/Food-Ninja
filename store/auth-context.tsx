/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { SplashScreen } from 'expo-router';

import * as SecureStore from 'expo-secure-store';
import { FoodProps, useFoodStore } from './food';
import axios from 'axios';

export type AuthProps = {
  isLoggedIn?: string | null | boolean;
  isLoading?: boolean;
  hasCompletedOnboarding?: boolean;
  favorites: FoodProps[];
  getFavorite: () => void;
};

const AuthContext = createContext<AuthProps | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // add to fav
  const { favorites, setFavorites } = useFoodStore();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const onboardingComplete = await SecureStore.getItemAsync('onboarding');

        console.log(token);

        setIsLoggedIn(!!token); // Update isLoggedIn based on token existence
        setHasCompletedOnboarding(!!onboardingComplete);
        SplashScreen.hideAsync();
      } catch (e) {
        console.error('Failed to load token from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // this is for add to favorites

  const getFavorite = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }

      const { data } = await axios(`${apiUrl}/food/get-all-favorite/${token}`);

      setFavorites(data.favoriteFoods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        hasCompletedOnboarding,
        favorites,
        getFavorite,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
