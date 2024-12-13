import { View, Text, ScrollView, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

const MoreRestaurants = () => {
  return (
    <SafeAreaView className=" mt-10 p-5">
      {/* Search Bar */}
      <View className=" ">
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
      <Text>MoreRestaurants</Text>
    </SafeAreaView>
  );
};

export default MoreRestaurants;
