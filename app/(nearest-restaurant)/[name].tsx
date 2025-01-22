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
        <ScrollView showsVerticalScrollIndicator={false} className=" mx-5 pb-[500px]">
          {/* Search Bar */}
          <View className={`${platform.OS === 'ios' ? 'mt-5' : 'mt-14'}`}>
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

          <View className=" mt-3 flex-row flex-wrap gap-4">
            {nearestRestaurant.map((r) => (
              <Link href={`/(popular-menu)/${r?._id}`} key={r?._id}>
                <View className=" relative w-full flex-row items-center gap-4 rounded-xl bg-white p-3">
                  <Image source={{ uri: r?.image }} className=" h-20 w-20 rounded-md " />

                  <View>
                    <Text className=" text-lg font-semibold">{r?.name}</Text>
                    <Text className=" text-sm text-gray-500" numberOfLines={1}>
                      {r?.restaurant.replace('-', ' ').toUpperCase()}
                    </Text>
                    <Text className=" text-xl font-bold text-green-600">{r?.price}</Text>
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
    </View>
  );
};

export default EachRestaurant;
