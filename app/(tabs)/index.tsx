/* eslint-disable prettier/prettier */
import { Bell, FilterIcon, Search } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import heroFish from '~/assets/hero-fish.png';
import heroImg from '~/assets/hero-img.png';
import NearestRestaurant from '~/components/home/near-restaurant/nearest-restaurant';
import PopularMenu from '~/components/home/popular-menu/popular-menu';

const Home = () => {
  const platform = Platform.OS === 'android';
  const getCurrentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <SafeAreaView className={`p-5 ${platform && 'pr-5'}`}>
      <View className="mb-5 flex-row items-center justify-between">
        <Text className=" max-w-[200px] text-4xl font-bold">Find Your Favorite Food</Text>

        <View className=" rounded-full bg-white p-3">
          <Bell size={25} color="green" />
        </View>
      </View>
      {/* Search Bar */}
      <View className=" flex-row items-center  justify-between gap-5">
        <View className=" relative flex-1">
          <TextInput
            className=" h-[50px] w-full rounded-lg bg-green-200 p-3 pl-16"
            placeholder="What do you want to order"
          />

          <View className=" absolute bottom-4 ml-5">
            <Search color="green" />
          </View>
        </View>

        <View className="bg-green-200 p-3">
          <FilterIcon color="green" />
        </View>
      </View>
      {/* Search Bar */}
      {/* Hero section */}

      <ScrollView
        className={` mb-28 ${platform && 'mb-[130px]'} mt-2`}
        showsVerticalScrollIndicator={false}>
        <View className="my-7 w-full rounded-3xl bg-green-500 opacity-80">
          <ImageBackground
            source={heroFish}
            className="relative h-[180px] flex-row items-center justify-between rounded-3xl px-5">
            <Image source={heroImg} className="h-[180px] w-[280px]" />

            <View className="  absolute right-2 justify-center">
              <Text className="max-w-[200px] text-2xl font-bold text-white">
                Special Deal for {getCurrentMonth}
              </Text>

              <Pressable className="mt-3 w-[100px] rounded-lg bg-white p-3">
                <Text className="text-center font-bold text-green-500">Buy Now</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        {/* Hero section */}

        {/* Nearest restaurant */}
        <NearestRestaurant />
        {/* Nearest restaurant */}

        {/* Popular menu */}
        <PopularMenu />
        {/* Popular menu */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
