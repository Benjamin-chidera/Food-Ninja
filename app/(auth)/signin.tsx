/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { Eye, EyeOff, Fingerprint } from 'lucide-react-native';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import logo from '../../assets/Logo-img.png';
import fb from '../../assets/fb.png';
import gg from '../../assets/gg.png';
import signinBgImg from '../../assets/signin-bg-img.png';
import { Link, router } from 'expo-router';
import { useAuthStore } from '~/store/auth-store';
import axios, { AxiosError } from 'axios';

import * as SecureStore from 'expo-secure-store';
import { ErrorModal } from '~/components/modal/ErrorModal';

import * as LocalAuthentication from 'expo-local-authentication';

const SignIn = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const {
    showPassword,
    setShowPassword,
    password,
    setPassword,
    email,
    setEmail,
    setUserData,
    loading,
    setLoading,
    isOpen,
    setIsOpen,
    setError,
    enable,
  } = useAuthStore();

  console.log(enable);

  const handleSignIn = async () => {
    // setUserData({ email, password });
    setLoading(true);

    try {
      const { data } = await axios.post(`${apiUrl}/auth/signin`, {
        email,
        password,
      });

      if (data.success) {
        console.log(data);
        await SecureStore.setItemAsync('token', data.user);
        setEmail('');
        setPassword('');

        setLoading(false);
        router.replace('/(tabs)');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.data.message);
        setError(error?.response?.data.message);
        setIsOpen(true);
        setLoading(false);
      }
    }
  };

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        return Alert.alert('Not supported', 'Biometric authentication not supported');
      }
      setIsBiometricSupported(compatible);
    })();
  });

  const handleBiometricAuth = async () => {
    try {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        Alert.alert('Biometric record not found', 'Please set up biometrics on your device.');
        return;
      }

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        disableDeviceFallback: true,
      });

      console.log('Biometric Auth Response:', biometricAuth);

      if (biometricAuth.success) {
        handleSignIn(); // Proceed with sign-in if biometrics succeed
      } else {
        Alert.alert('Authentication Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Biometric Authentication Error:', error);
      Alert.alert('Error', 'An error occurred during biometric authentication.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full bg-white">
        {/* ImageBackground and Logo Section */}
        <ImageBackground source={signinBgImg} className="h-[280px] w-full">
          <View className="h-full flex-col items-center justify-center">
            <Image source={logo} />
          </View>
        </ImageBackground>

        {/* Title */}
        <Text className=" text-center text-3xl font-bold">Login To Your Account</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //   style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View className="mx-7 mt-9 flex-col gap-4">
              {/* Email Input */}
              <TextInput
                className="h-[57px] rounded-2xl border px-5 placeholder:text-blue-400"
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password Input */}
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
          </ScrollView>
        </KeyboardAvoidingView>

        <View className=" mx-7 flex-row items-center justify-between">
          <Text className=" mt-8 text-center font-bold">Or Continue With</Text>

          <Link
            href="/(auth)/forgotPassword"
            className=" mt-7 text-center font-semibold text-green-600">
            Forgot Your Password?
          </Link>
        </View>

        <View className=" mx-7 mt-6 flex-row items-center gap-6">
          <TouchableOpacity className=" h-[57px] flex-1 flex-row items-center justify-center gap-3 rounded-2xl border border-blue-400 p-3">
            <Image source={fb} />
            <Text className=" text-lg font-bold">Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" h-[57px] flex-1 flex-row items-center justify-center gap-3 rounded-2xl border border-blue-400 p-3">
            <Image source={gg} />
            <Text className=" text-lg font-bold">Google</Text>
          </TouchableOpacity>
        </View>

        {/* {enable && (
          <View className=" mx-7 my-5 items-center justify-center">
            <TouchableOpacity onPress={handleBiometricAuth}>
              <Fingerprint color="green" size={40} />
            </TouchableOpacity>
          </View>
        )} */}

        <View className="absolute bottom-10 left-6 right-6">
          {/* <AuthButton title="Login" screen={''} /> */}

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={!email || !password || loading}
            className=" mx-auto mt-10 h-16 w-44  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
            <Text className="text-lg font-bold text-white">
              {loading ? 'Signing in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <Link href="/(auth)/signup" className=" mt-7 text-center font-semibold text-green-600">
            Don't have an account? Sign Up
          </Link>
        </View>
        {isOpen && <ErrorModal />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
