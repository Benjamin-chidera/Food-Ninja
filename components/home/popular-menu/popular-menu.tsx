import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Platform, FlatList, Image } from 'react-native';

type FoodType = {
  _id: string;
  image: string;
  name: string;
  restaurantName?: string;
  price: string;
};

type PopularMenuProps = {
  foods: FoodType[];
};

const PopularMenu = ({ foods }: PopularMenuProps) => {
  const platform = Platform.OS === 'android';
  return (
    <View className="mt-7">
      <View className={` flex-row items-center justify-between ${platform && 'pr-3'}`}>
        <Text className=" text-xl font-semibold">Popular Menu</Text>

        <Link href="/(popular-menu)" className=" text-sm text-green-600">
          View More
        </Link>
      </View>

      {/* to display the Popular Menu */}

      <FlatList
        data={foods}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className=" flex-row items-center gap-4 rounded-xl bg-white p-3">
            <Image source={{ uri: item.image }} className=" h-20 w-20 rounded-md" />

            <View>
              <Text className=" text-lg font-semibold">{item.name}</Text>
              <Text className=" text-sm text-gray-500">{item.restaurantName || 'KFC'}</Text>
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
