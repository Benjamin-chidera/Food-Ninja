/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { OtpInput } from 'react-native-otp-entry';

import bioImg from '../../assets/signin-bg-img.png';

import { useAuthStore } from '~/store/auth-store';
import { router } from 'expo-router';

import axios, { AxiosError } from 'axios';

import * as SecureStore from 'expo-secure-store';

const Verification = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { otp, setOtp, userData, user, loading, setLoading } = useAuthStore();
  const [seconds, setSeconds] = useState(3); // Start with 5 minutes
  const [isResending, setIsResending] = useState(false);

  // console.log(userData);

  // Handle OTP submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/auth/verify-otp`, {
        userId: user,
        otp,
      });
      // console.log(data);

      if (data.success) {
        setLoading(false);
        router.replace('/(user)/success-msg');

        // console.log(data.success);
        await SecureStore.setItemAsync('token', data.user);
      }
      // Alert.alert(data.message, 'You can now login to your account');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.data);
        // Alert.alert('Unexpected error', error?.response?.data);
        setLoading(false);
      }
    }
  };

  // Countdown timer logic
  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  // Resend OTP and reset the timer
  const handleResend = async () => {
    setIsResending(true);
    setOtp('');
    setSeconds(300);

    setTimeout(() => {
      setIsResending(false);
    }, 1000);

    try {
      const { data } = await axios.post(`${apiUrl}/auth/request-new-otp`, {
        userId: user,
      });
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.data);

        // setLoading(false);
      }
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        {/* Header Image */}
        <Image source={bioImg} className="h-[100px] w-full" />

        <View className="mx-6">
          <Text className="text-3xl font-bold">Enter 4-digit Verification Code</Text>
          <Text className="my-6">Code has been sent to your email address. This code will expire in 5 minutes.</Text>

          <View className="mx-auto w-[270px] shadow shadow-blue-300 ">
            <OtpInput
              numberOfDigits={4}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setOtp(text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
            />

            <View className="mt-6 flex-col items-center justify-center">
              {seconds !== 0 && <Text>Countdown: {formatTime(seconds)}</Text>}

              {seconds === 0 && !isResending && (
                <TouchableOpacity
                  className="mt-5 h-14 w-40 items-center justify-center rounded-md bg-green-500"
                  activeOpacity={0.6}
                  onPress={handleResend}>
                  <Text className="font-semibold text-white">
                    {isResending ? 'Resending...' : 'Resend Code'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Verify Button Positioned at the Bottom */}
        <View className="absolute bottom-10 left-6 right-6">
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!otp || loading}
            className="mx-auto mt-10 h-16 w-44 items-center justify-center rounded-xl bg-green-500 px-4 py-2">
            <Text className="text-lg font-bold text-white">
              {loading ? 'Loading...' : 'Verify Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Verification;
