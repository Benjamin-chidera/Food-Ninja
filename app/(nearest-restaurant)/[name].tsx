import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { useFoodStore } from '~/store/food';
import { Search, ShoppingCart } from 'lucide-react-native';

const EachRestaurant = () => {
  const { name } = useLocalSearchParams();
  const { foods, setNearestRestaurant, nearestRestaurant } = useFoodStore();
  const platform = Platform;

  useEffect(() => {
    const getFoods = foods.filter((food) => food.restaurant === name);

    setNearestRestaurant(getFoods);
  }, [name]);

  return (
    <View>
      <SafeAreaView className="">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View className={`${platform.OS === 'ios' ? 'mt-5' : 'mt-5'}`}>
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

          <View className=" mx-5 mt-3 flex-row flex-wrap gap-4">
            {nearestRestaurant.map((r) => (
              <Link href={`/(popular-menu)/${r?._id}`} key={r?._id}>
                <View className="relative mt-7  w-48 gap-2 rounded-xl bg-white p-3">
                  <Image source={{ uri: r?.image }} className="h-36 w-40" />
                  <Text className=" text-center text-lg font-semibold">{r?.name}</Text>
                  <Text className=" text-center text-sm capitalize text-gray-500">
                    {r?.restaurant.replace('-', ' ')}
                  </Text>
                  <Text className=" text-center text-sm text-gray-500">{r?.price}</Text>

                  <TouchableOpacity
                    className=" absolute right-1 top-1 rounded-full bg-green-500 p-3"
                    activeOpacity={0.7}>
                    <Text>
                      <ShoppingCart color="white" size={24} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </Link>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EachRestaurant;
