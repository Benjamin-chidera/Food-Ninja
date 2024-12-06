/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import gallery from '../../assets/Gallery.png';
import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';

const PhotoPreview = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header Image */}
      <Image source={bioImg} className="h-[100px] w-full" />

      <View className="mx-6">
        <Text className="text-3xl font-bold">Upload Your Photo Profile</Text>

        <Text className="my-6">
          This data will be displayed in your account profile for security
        </Text>

        <View className="items-center justify-center">
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            className="h-[238px] w-[245px] rounded-3xl bg-black"
          />
        </View>
      </View>

      {/* Button Positioned at the Bottom */}
      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen={'/(user)/user-location'} title="Next" />
      </View>
    </View>
  );
};

export default PhotoPreview;
