import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';

import onBoarding from '../assets/onboarding.png';

import { useAuth } from '~/store/auth-context';

const Page = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, hasCompletedOnboarding } = useAuth();
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);

      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else if (!hasCompletedOnboarding) {
        router.replace('/(onboarding)/onBoarding1');
      } else {
        router.replace('/(auth)/signin');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, hasCompletedOnboarding]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (showImage) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ImageBackground
          source={onBoarding}
          style={{ flex: 1, width: '100%', height: '100%' }}></ImageBackground>
      </View>
    );
  }

  return null;
};

export default Page;
