import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useFoodStore } from '~/store/food';
import { Heart } from 'lucide-react-native';
import { Button } from '~/components/ui/button';

const PopularMenuId = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { id } = useLocalSearchParams();
  const { foodDetails, setFoodDetails } = useFoodStore();
  console.log(id);

  const getFoodById = async () => {
    try {
      const { data } = await axios(`${apiUrl}/food/food/${id}`);

      console.log(data);
      setFoodDetails(data.food);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoodById();
  }, [id]);

  return (
    <View className=" relative flex-1">
      <View className=" relative">
        <Image source={{ uri: foodDetails?.image }} className="h-72 w-full" />
        <TouchableOpacity className=" absolute bottom-2 right-2 rounded-full bg-white p-2">
          <Heart color="green" />
        </TouchableOpacity>
      </View>

      <ScrollView className=" p-3">
        <Text className=" mb-2 text-2xl font-bold">{foodDetails?.name}</Text>
        <View className=" mb-2 flex-row items-center justify-between gap-5">
          <Text className=" mb-2 text-2xl font-bold">${foodDetails?.price}</Text>

          {/* this is for controlling the quantity of the food item */}
          <View className=" flex-row items-center gap-5">
            <Button className=" bg-green-500">
              <Text className=" text-2xl text-white">+</Text>
            </Button>
            <Text>0</Text>
            <Button className=" bg-green-500">
              <Text className=" text-2xl text-white">-</Text>
            </Button>
          </View>
          {/* this is for controlling the quantity of the food item */}
        </View>

        <Text className=" mt-3 text-xl font-bold">Description</Text>

        <Text className=" mt-1 text-lg">{foodDetails?.description}</Text>

        <View>{/* this is for related food */}</View>

        <View>{/* this is for rating and reviews */}</View>
      </ScrollView>

      {/* this is the button for adding the food item to the cart */}
      <View className="  absolute bottom-0 w-full">
        <TouchableOpacity className="h-20  items-center justify-center bg-green-500 p-2">
          <Text className=" text-center">Add to cart</Text>
        </TouchableOpacity>
      </View>

      {/* this is the button for adding the food item to the cart */}
    </View>
  );
};

export default PopularMenuId;
