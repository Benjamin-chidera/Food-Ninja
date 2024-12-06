import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import onBoarding from '../assets/onboarding.png';

const Page = () => {
  const router = useRouter(); // Get the router instance

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(onboarding)/onBoarding1');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={onBoarding}
        style={{ flex: 1, width: '100%', height: '100%' }}></ImageBackground>
    </View>
  );
};

export default Page;
