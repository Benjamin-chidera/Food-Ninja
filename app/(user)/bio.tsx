/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import bioImg from '../../assets/signin-bg-img.png';

import { useAuthStore } from '~/store/auth-store';
import { router } from 'expo-router';

const Bio = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    setUserData,
  } = useAuthStore();

  const handleSubmit = () => {
    setUserData({ firstName, lastName, phoneNumber });
    router.replace('/(user)/photo');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        {/* Header Image */}
        <Image source={bioImg} className="h-[100px] w-full" />

        <View className="mx-6">
          <Text className="text-3xl font-bold">Fill in your bio to get started</Text>

          <Text className="my-6">
            This data will be displayed in your account profile for security
          </Text>

          <View className="mt-7 flex-col gap-5">
            <TextInput
              className="h-[57px] rounded-2xl border px-5 placeholder:text-blue-400"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />

            <TextInput
              className="h-[57px] rounded-2xl border px-5 placeholder:text-blue-400"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput
              className="h-[57px] rounded-2xl border px-5 placeholder:text-blue-400"
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        {/* Button Positioned at the Bottom */}
        <View className="absolute bottom-10 left-6 right-6">
          {/* <OnBoardingBtn screen={''} title="Next" /> */}
          <TouchableOpacity
            disabled={!firstName || !lastName || !phoneNumber}
            onPress={handleSubmit}
            className=" mx-auto mt-10 h-16 w-40  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
            <Text className="text-lg font-bold text-white">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Bio;
