/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, TextInput, Platform } from 'react-native';

import gallery from '../../assets/Gallery.png';
import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';
import { MapPin } from 'lucide-react-native';
import { useAuthStore } from '~/store/auth-store';

const UserLocation = () => {
  const { isLocation, setIsLocation } = useAuthStore();
  const platform = Platform.OS === 'android';

  
  return (
    <View className="flex-1 bg-white">
      {/* Header Image */}
      <Image source={bioImg} className="h-[100px] w-full" />

      <View className="mx-6">
        <Text className="text-3xl font-bold">Set Your Location</Text>

        <Text className="my-6">
          This data will be displayed in your account profile for security
        </Text>

        <View className=" w-full rounded-xl bg-white p-4 shadow shadow-blue-200">
          <View className=" flex-row items-center gap-3">
            <View className=" h-[33px] w-[33px] items-center justify-center rounded-full bg-yellow-300">
              <MapPin color="green" />
            </View>

            <Text className=" text-xl font-bold">Your Location</Text>
          </View>
          <View>
            {/* input field for location */}

            {isLocation && (
              <TextInput
                placeholder="Input your location"
                className={`mt-5 h-[50px] w-full rounded-xl bg-white px-3 shadow-xl shadow-blue-200 placeholder:text-black ${platform && 'shadow-blue-600'}`}
              />
            )}

            {/* input field for location */}
          </View>

          <Pressable
            className="mt-7 h-[57px] w-full items-center justify-center rounded-xl bg-[#F6F6F6]"
            onPress={() => setIsLocation(true)}>
            <Text className=" text-lg font-bold">Set Location</Text>
          </Pressable>
        </View>
      </View>

      {/* Button Positioned at the Bottom */}
      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen={'/(user)/verification'} title="Next" />
      </View>
    </View>
  );
};

export default UserLocation;
