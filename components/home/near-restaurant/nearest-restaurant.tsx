import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Platform, FlatList, Image, Pressable } from 'react-native';
import { useFoodStore } from '~/store/food';

const NearestRestaurant = () => {
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

  const platform = Platform.OS === 'android';
  return (
    <View>
      <View className={` flex-row items-center justify-between ${platform && 'pr-3'}`}>
        <Text className=" text-xl font-semibold">Nearest Restaurant</Text>

        <Link href="/(nearest-restaurant)" className=" text-sm text-green-600">
          View More
        </Link>
      </View>

      {/* to display the nearest restaurant */}

      <FlatList
        data={restaurant}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/(nearest-restaurant)/${item.name}`}>
            <View className=" rounded-xl bg-white p-3">
              <Image source={{ uri: item.image }} className=" h-32 w-40 rounded-md" />

              <Text className="mt-2 text-center text-lg font-semibold capitalize" numberOfLines={1}>
                {item.name.replace('-', ' ')}
              </Text>
              <Text className=" text-center text-sm text-gray-500">{item.location}</Text>
              {/* </Pressable> */}
            </View>
          </Link>
        )}
        contentContainerClassName="gap-5 mt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default NearestRestaurant;
