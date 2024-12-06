/* eslint-disable prettier/prettier */
import { View, Text, Image } from 'react-native';
import React from 'react';
import onBoarding from '~/assets/onboarding1.png';
import OnBoardingBtn from '~/components/onBoarding-btn';

const OnBoarding1 = () => {
  return (
    <View className=" h-full flex-1 bg-white">
      <View className=" mt-14">
        <Image source={onBoarding} />
      </View>

      <View className=" mt-7 flex-col items-center justify-center">
        <Text className=" text-3xl font-bold">Find your Comfort</Text>
        <Text className=" text-3xl font-bold">Food here</Text>
      </View>

      <View>
        <Text className=" mx-auto mt-10 max-w-xs text-center">
          Here you can find a chef or dish for every taste and color. Enjoy!
        </Text>
      </View>

      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen="/(onboarding)/onBoarding2" title={'Next'} />
      </View>
    </View>
  );
};

export default OnBoarding1;
