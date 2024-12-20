import { View, Text, ScrollView, TextInput, Image, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

const PopularMenu = () => {
  const platform = Platform;

  const menu = [
    {
      id: '1',
      food: 'Plantain',
      restaurantName: 'Chicken Republic',
      image:
        'https://images.pexels.com/photos/6210449/pexels-photo-6210449.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦2000',
    },
    {
      id: '2',
      food: 'Jollof Rice and Chicken',
      restaurantName: 'The Place',
      image:
        'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦3000',
    },
    {
      id: '3',
      food: 'Groundnut Soup',
      restaurantName: 'KFC',
      image:
        'https://images.pexels.com/photos/28930671/pexels-photo-28930671/free-photo-of-organic-peanut-trade-in-zaria-market.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦4000',
    },
    {
      id: '4',
      food: 'Egg Sauce',
      restaurantName: 'Tastee',
      image:
        'https://images.pexels.com/photos/6275160/pexels-photo-6275160.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦1000',
    },
    {
      id: '5',
      food: 'Rice and Stew',
      restaurantName: 'Sweet Sensation',
      image:
        'https://images.pexels.com/photos/9673721/pexels-photo-9673721.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦2000',
    },
    {
      id: '6',
      food: 'Plantain',
      restaurantName: 'Chicken Republic',
      image:
        'https://images.pexels.com/photos/6210449/pexels-photo-6210449.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦2000',
    },
    {
      id: '7',
      food: 'Jollof Rice and Chicken',
      restaurantName: 'The Place',
      image:
        'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦3000',
    },
    {
      id: '8',
      food: 'Groundnut Soup',
      restaurantName: 'KFC',
      image:
        'https://images.pexels.com/photos/28930671/pexels-photo-28930671/free-photo-of-organic-peanut-trade-in-zaria-market.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦4000',
    },
    {
      id: '9',
      food: 'Egg Sauce',
      restaurantName: 'Tastee',
      image:
        'https://images.pexels.com/photos/6275160/pexels-photo-6275160.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦1000',
    },
    {
      id: '10',
      food: 'Rice and Stew',
      restaurantName: 'Sweet Sensation',
      image:
        'https://images.pexels.com/photos/9673721/pexels-photo-9673721.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: '₦2000',
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
          {menu.map((r) => (
            <View className="mt-7 w-48  gap-2 rounded-xl bg-white p-3" key={r?.id}>
              <Image source={{ uri: r?.image }} className="h-36 w-40" />
              <Text className=" text-center text-lg font-semibold">{r?.food}</Text>
              <Text className=" text-center text-sm text-gray-500">{r?.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PopularMenu;
