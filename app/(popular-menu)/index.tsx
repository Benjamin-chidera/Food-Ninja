import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Search, ShoppingCart } from 'lucide-react-native';
import { useFoodStore } from '~/store/food';
import { Link } from 'expo-router';
import { useGlobalCart } from '~/store/cart-context';
import { useCartStore } from '~/store/cart';

const PopularMenu = () => {
  const platform = Platform;
  const { foods } = useFoodStore();
  const { loading } = useCartStore();
  const cart = useGlobalCart();

  const [search, setSearch] = useState('');

  if (!cart) {
    return;
  }

  const { addToCart } = cart;

  const getSearch = foods.filter((food) => food.name.toLowerCase().includes(search.toLowerCase()));

  // console.log(getSearch.length);

  return (
    <SafeAreaView className="mt-10 ">
      <ScrollView showsVerticalScrollIndicator={false} className=" mx-4 ">
        {/* Search Bar */}
        <View className={`${platform.OS === 'ios' ? 'mt-14' : 'mt-5'}`}>
          <View className=" relative">
            <TextInput
              className=" h-[50px] w-full rounded-lg bg-green-200 p-3 pl-16"
              placeholder="What do you want to order"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />

            <View className=" absolute bottom-4 ml-5">
              <Search color="green" />
            </View>
          </View>
        </View>
        {/* Search Bar */}
        <View className=" mt-2">
          {getSearch.map((item) => (
            <Link href={`/(popular-menu)/${item?._id}`} className="mt-3" key={item?._id}>
              <View className=" relative w-full flex-row items-center gap-4 rounded-xl bg-white p-3">
                <Image source={{ uri: item?.image }} className=" h-20 w-20 rounded-md " />

                <View>
                  <Text className=" text-lg font-semibold">{item?.name}</Text>
                  <Text className=" text-sm text-gray-500" numberOfLines={1}>
                    {item?.restaurant}
                  </Text>
                  <Text className=" text-xl font-bold text-green-600">{item?.price}</Text>
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

export default PopularMenu;
