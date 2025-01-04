/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import bioImg from '../../assets/signin-bg-img.png';

import { useAuthStore } from '~/store/auth-store';

interface ForgotPasswordResponse {
  user: string; // Adjust this to match your API's actual response structure
}

const ForgotPassword = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { email, setEmail } = useAuthStore();

  const handleForgotPassword = async () => {
    try {
      const { data } = await axios.post<ForgotPasswordResponse>(`${apiUrl}/auth/forgot-password`, {
        email,
      });
  
      if (data.user) {
        // console.log(data.user);
        
        await SecureStore.setItemAsync('token', data.user);
        setEmail('');
        router.replace('/(auth)/resetPassword');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        {/* Header Image */}
        <Image source={bioImg} className="h-[100px] w-full" />

        <View className="mx-6">
          <Text className="text-3xl font-bold">Verify your email address</Text>

          <Text className="mb-10 mt-2">Fill all the fields below to reset your password.</Text>

          <View className="">
            <TextInput
              className="h-[57px] rounded-2xl border px-5 pr-10 placeholder:text-blue-400"
              placeholder="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Button Positioned at the Bottom */}
        <View className="absolute bottom-10 left-6 right-6">
          <TouchableOpacity
            className=" mx-auto mt-10 h-16   items-center justify-center rounded-xl bg-green-500 px-4 py-2"
            onPress={handleForgotPassword}>
            <Text className="text-lg font-bold text-white">Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
