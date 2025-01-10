import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingCart } from 'lucide-react-native';
import { useFoodStore } from '~/store/food';
import { Link } from 'expo-router';

const PopularMenu = () => {
  const platform = Platform;
  const { foods } = useFoodStore();

  return (
    <SafeAreaView className="mt-10 p-5 ">
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

        <View className=" mt-5 flex-row flex-wrap justify-center  gap-4">
          {foods.map((r) => (
            <Link href={`/(popular-menu)/${r?._id}`} key={r?._id}>
              <View className="relative mt-7  w-48 gap-2 rounded-xl bg-white p-3">
                <Image source={{ uri: r?.image }} className="h-36 w-40" />
                <Text className=" text-center text-lg font-semibold">{r?.name}</Text>
                <Text className=" text-center text-sm text-gray-500">{r?.restaurant}</Text>
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
  );
};

export default PopularMenu;
