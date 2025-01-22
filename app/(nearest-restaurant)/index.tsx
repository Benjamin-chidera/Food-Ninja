/* eslint-disable import/order */
import { View, Text, ScrollView, TextInput, Image, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingCart } from 'lucide-react-native';
import { Link } from 'expo-router';

const MoreRestaurants = () => {
  const platform = Platform;

  const restaurant = [
    {
      id: '1',
      name: 'chicken-republic',
      image:
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '2',
      name: 'the-place',
      image:
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '3',
      name: 'kfc',
      image:
        'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '4',
      name: 'tastee',
      image:
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '5',
      name: 'sweet-sensation',
      image:
        'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '6',
      name: 'dominons',
      image:
        'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
  ];

  return (
    <SafeAreaView className=" mt-10 flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className={`${platform.OS === 'ios' ? 'mt-16' : 'mt-5'} items-center justify-center`}>
          <View
            className=" relative mx-5 
          ">
            <TextInput
              className=" h-[50px] w-[360px] rounded-lg bg-green-200 p-3 pl-16"
              placeholder="What do you want to order"
            />

            <View className=" absolute bottom-4 ml-5">
              <Search color="green" />
            </View>
          </View>
        </View>
        {/* Search Bar */}

        <View className=" mx-5 mt-3 flex-row flex-wrap items-center justify-center gap-4">
          {restaurant.map((item) => (
            <Link key={item?.id} href={`/(nearest-restaurant)/${item.name}`}>
              <View className=" relative w-full flex-row items-center gap-4 rounded-xl bg-white p-3">
                <Image source={{ uri: item?.image }} className=" h-20 w-20 rounded-md " />

                <View>
                  <Text className=" text-lg font-semibold">{item?.name}</Text>
                  <Text className=" text-sm text-gray-500" numberOfLines={1}>
                    {item?.name.replace('-', ' ').toUpperCase()}
                  </Text>
                  {/* <Text className=" text-xl font-bold text-green-600">{item?.price}</Text> */}
                </View>

                <Text className=" absolute right-3 rounded-full bg-green-500 p-2 text-gray-500">
                  {/* <ChevronRight color={'green'} /> */}
                  <ShoppingCart color={'white'} />
                </Text>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreRestaurants;
