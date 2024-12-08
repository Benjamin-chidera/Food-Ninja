/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { SplashScreen } from 'expo-router';

import * as SecureStore from 'expo-secure-store';

type AuthProps = {
  isLoggedIn?: string | null | boolean;
  isLoading?: boolean;
  hasCompletedOnboarding?: boolean;
};

const AuthContext = createContext<AuthProps | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

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

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        hasCompletedOnboarding,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
