/* eslint-disable prettier/prettier */
import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';

import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';
import { useAuthStore } from '~/store/auth-store';
import AuthButton from '~/components/buttons/auth-button';

const ForgotPassword = () => {
  const { showPassword, setShowPassword } = useAuthStore();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        {/* Header Image */}
        <Image source={bioImg} className="h-[100px] w-full" />

        <View className="mx-6">
          <Text className="text-3xl font-bold">Reset your password here</Text>

          <Text className="mb-10 mt-2">Fill all the fields below to reset your password.</Text>

          <View className=" relative">
            <TextInput
              className="h-[57px] rounded-2xl border px-5 pr-10 placeholder:text-blue-400"
              placeholder="Password"
              secureTextEntry={!showPassword}
            />

            <Pressable
              className=" absolute bottom-5 right-3"
              onPress={() => setShowPassword(!showPassword)}>
              {!showPassword ? <Eye /> : <EyeOff />}
            </Pressable>
          </View>

          <View className=" relative mt-5">
            <TextInput
              className="h-[57px] rounded-2xl border px-5 pr-10 placeholder:text-blue-400"
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
            />

            <Pressable
              className=" absolute bottom-5 right-3"
              onPress={() => setShowPassword(!showPassword)}>
              {!showPassword ? <Eye /> : <EyeOff />}
            </Pressable>
          </View>
        </View>

        {/* Button Positioned at the Bottom */}
        <View className="absolute bottom-10 left-6 right-6">
          <AuthButton title="Reset Password" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
