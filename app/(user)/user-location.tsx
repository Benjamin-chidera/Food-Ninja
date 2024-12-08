/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

import gallery from '../../assets/Gallery.png';
import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';
import { MapPin } from 'lucide-react-native';
import { useAuthStore } from '~/store/auth-store';
import { router } from 'expo-router';
import axios, { AxiosError } from 'axios';

import * as SecureStore from 'expo-secure-store';

const UserLocation = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const {
    isLocation,
    setIsLocation,
    location,
    setLocation,
    setUserData,
    loading,
    setLoading,
    userData,
    user,
    setUser,
  } = useAuthStore();
  const platform = Platform.OS === 'android';

  const handleSubmit = async () => {
    setUserData({ location });

    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('location', location);

    if (userData.photo) {
      formData.append('photo', {
        uri: userData.photo,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any);
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      if (data.success) {
        setUser(data.user);

        // console.log(data);
        

        setUserData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          photo: '',
          location: '',
        });
        router.replace('/(user)/verification');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.data);

        setLoading(false);
      }
    }
  };

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
                value={location}
                onChangeText={setLocation}
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
        {/* <OnBoardingBtn screen={'/(user)/verification'} title="Next" /> */}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isLocation}
          className=" mx-auto mt-10 h-16 w-40  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
          <Text className="text-lg font-bold text-white">{loading ? 'Loading...' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserLocation;
