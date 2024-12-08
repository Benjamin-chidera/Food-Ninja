/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import onBoarding from '~/assets/onboarding1.png';
import { router } from 'expo-router';
// import OnBoardingBtn from '~/components/onBoarding-btn';

import * as SecureStore from 'expo-secure-store';

const OnBoarding1 = () => {
  const handleNext = async () => {
    await SecureStore.setItemAsync('onboarding', 'done');

    router.replace('/(onboarding)/onBoarding2');
  };

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
        {/* <OnBoardingBtn screen="/(onboarding)/onBoarding2" title={'Next'} /> */}

        <TouchableOpacity
          onPress={handleNext}
          className=" mx-auto mt-10 h-16 w-40  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
          <Text className="text-lg font-bold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding1;
