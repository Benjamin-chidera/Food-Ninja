import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Platform, FlatList, Image } from 'react-native';

const PopularMenu = () => {
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
  ];

  const platform = Platform.OS === 'android';
  return (
    <View className="mt-7">
      <View className={` flex-row items-center justify-between ${platform && 'pr-3'}`}>
        <Text className=" text-xl font-semibold">Popular Menu</Text>

        <Link href="/" className=" text-sm text-green-600">
          View More
        </Link>
      </View>

      {/* to display the Popular Menu */}

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className=" flex-row items-center gap-4 rounded-xl bg-white p-3">
            <Image source={{ uri: item.image }} className=" h-20 w-20 rounded-md" />

            <View>
              <Text className=" text-lg font-semibold">{item.food}</Text>
              <Text className=" text-sm text-gray-500">{item.restaurantName}</Text>
              <Text className=" text-xl font-bold text-green-600">{item.price}</Text>
            </View>
          </View>
        )}
        contentContainerClassName="gap-5 mt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PopularMenu;
