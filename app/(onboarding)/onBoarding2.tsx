/* eslint-disable prettier/prettier */
import { View, Text, Image } from 'react-native';

import onBoarding from '~/assets/onboarding2.png';
import OnBoardingBtn from '~/components/onBoarding-btn';

const OnBoarding2 = () => {
  return (
    <View className=" h-full flex-1 bg-white">
      <View className=" mt-14">
        <Image source={onBoarding} />
      </View>

      <View className=" mt-7 flex-col items-center justify-center">
        <Text className=" text-3xl font-bold">Food Ninja is Where Your</Text>
        <Text className=" text-3xl font-bold">Comfort Food Lives</Text>
      </View>

      <View>
        <Text className=" mx-auto mt-10 max-w-xs text-center">
          Enjoy a fast and smooth food delivery a your doorstep.
        </Text>
      </View>

      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen="/(auth)/signin" title="Next" />
      </View>
    </View>
  );
};

export default OnBoarding2;
