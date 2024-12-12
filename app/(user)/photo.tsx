/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';

import gallery from '../../assets/Gallery.png';
import camera from '../../assets/camera.png';
import bioImg from '../../assets/signin-bg-img.png';

import { useAuthStore } from '~/store/auth-store';

import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';


const Photo = () => {
  const platform = Platform.OS === 'android';
  // this is for selecting an image
  const { photo, setPhoto, setUserData } = useAuthStore();
  // this is for selecting an image

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true, // enable cropping
    //   aspect: [4, 3],
    //   quality: 1,
    // }); 

    // console.log(photo);

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    setUserData({ photo });
    router.push({
      pathname: '/(user)/photo-preview',
      params: { photo },
    });
  };

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
          onPress={pickImage}
          className={`my-6 flex h-[129px] w-full items-center justify-center rounded-2xl bg-white shadow-2xl shadow-blue-200 ${platform ? ' shadow-blue-600' : ''}`}
          activeOpacity={0.7}>
          <Image source={gallery} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(user)/camera')}
          className={`my-6 flex h-[129px] w-full items-center justify-center rounded-2xl bg-white shadow-2xl shadow-blue-200 ${platform ? ' shadow-blue-600' : ''}`}
          activeOpacity={0.7}>
          <Image source={camera} />
        </TouchableOpacity>
      </View>

      {/* Button Positioned at the Bottom */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity
          disabled={!photo}
          onPress={handleNext}
          className=" mx-auto mt-10 h-16 w-40  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
          <Text className="text-lg font-bold text-white">{photo ? 'View Photo' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Photo;
