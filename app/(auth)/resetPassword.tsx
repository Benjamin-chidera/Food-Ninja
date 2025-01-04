/* eslint-disable import/order */
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
  TouchableOpacity,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import bioImg from '../../assets/signin-bg-img.png';

import { useAuthStore } from '~/store/auth-store';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { ErrorModal } from '~/components/modal/ErrorModal';

const ResetPassword = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { showPassword, setShowPassword, password, setPassword, error, setError, setIsOpen } =
    useAuthStore();

  const handleResetPassword = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      return console.log('User not found');
    }

    try {
      const data = await axios.patch(`${apiUrl}/auth/reset-password/${token}`, {
        password,
      });

      if (data.status === 200) {
        setPassword('');
        router.replace('/(auth)/signin');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
        setError(error?.response?.data?.message);
        setIsOpen(true);
      }
    }
  };

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
              value={password}
              onChangeText={setPassword}
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
          <TouchableOpacity
            className=" mx-auto mt-10 h-16 w-44  items-center justify-center rounded-xl bg-green-500 px-4 py-2"
            onPress={handleResetPassword}>
            <Text className="text-lg font-bold text-white">Reset Password</Text>
          </TouchableOpacity>
        </View>

        {error && <ErrorModal />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;
