/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';

import gallery from '../../assets/Gallery.png';
import camera from '../../assets/camera.png';
import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';

const Photo = () => {
  const platform = Platform.OS === 'android';

  return (
    <View className="flex-1 bg-white">
      {/* Header Image */}
      <Image source={bioImg} className="h-[100px] w-full" />

      <View className="mx-6">
        <Text className="text-3xl font-bold">Upload Your Photo Profile</Text>

        <Text className="my-6">
          This data will be displayed in your account profile for security
        </Text>

        <TouchableOpacity
          className={`my-6 flex h-[129px] w-full items-center justify-center rounded-2xl bg-white shadow-2xl shadow-blue-200 ${platform ? ' shadow-blue-600' : ''}`}
          activeOpacity={0.7}>
          <Image source={gallery} />
        </TouchableOpacity>

        <TouchableOpacity
          className={`my-6 flex h-[129px] w-full items-center justify-center rounded-2xl bg-white shadow-2xl shadow-blue-200 ${platform ? ' shadow-blue-600' : ''}`}
          activeOpacity={0.7}>
          <Image source={camera} />
        </TouchableOpacity>
      </View>

      {/* Button Positioned at the Bottom */}
      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen={'/(user)/photo-preview'} title="Next" />
      </View>
    </View>
  );
};

export default Photo;
