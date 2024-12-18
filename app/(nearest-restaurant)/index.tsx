import { View, Text, ScrollView, TextInput, Image, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

const MoreRestaurants = () => {
  const platform = Platform;

  const restaurant = [
    {
      id: '1',
      name: 'Chicken Republic',
      image:
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '2',
      name: 'The Place',
      image:
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '3',
      name: 'KFC',
      image:
        'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '4',
      name: 'Tastee',
      image:
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '5',
      name: 'Sweet Sensation',
      image:
        'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '6',
      name: 'Chicken Republic',
      image:
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '7',
      name: 'The Place',
      image:
        'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '8',
      name: 'KFC',
      image:
        'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '9',
      name: 'Tastee',
      image:
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
    {
      id: '10',
      name: 'Sweet Sensation',
      image:
        'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600',
      location: 'Lagos',
    },
  ];

  return (
    <SafeAreaView className=" mt-10 p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className={`${platform.OS === 'ios' ? 'mt-14' : 'mt-5'}`}>
          <View className=" relative">
            <TextInput
              className=" h-[50px] w-full rounded-lg bg-green-200 p-3 pl-16"
              placeholder="What do you want to order"
            />

            <View className=" absolute bottom-4 ml-5">
              <Search color="green" />
            </View>
          </View>
        </View>
        {/* Search Bar */}

        <View className=" flex-row flex-wrap justify-center gap-4 ">
          {restaurant.map((r) => (
            <View className="mt-7 gap-2  rounded-xl bg-white p-3" key={r?.id}>
              <Image source={{ uri: r?.image }} className="h-36 w-40" />
              <Text className=" text-center text-lg font-semibold">{r?.name}</Text>
              <Text className=" text-center text-sm text-gray-500">{r?.location}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreRestaurants;
