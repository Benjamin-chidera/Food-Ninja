/* eslint-disable import/order */
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useFoodStore } from '~/store/food';
import { Button } from '~/components/ui/button';

import * as SecureStore from 'expo-secure-store';
import { useAuth } from '~/store/auth-context';
import AddToFav from '~/components/buttons/add-to-fav';

const PopularMenuId = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { id } = useLocalSearchParams();
  const {
    foodDetails,
    setFoodDetails,
    loading,
    setLoading,
    isFavorite,
    setIsFavorite,
    toggleFavorite,
  } = useFoodStore();

  const { getFavorite } = useAuth();

  const getFoodById = async () => {
    try {
      const { data } = await axios(`${apiUrl}/food/food/${id}`);

      setFoodDetails(data.food);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoodById();
  }, [id]);

  // this is for add to fav
  const handleAddToFav = async () => {
    if (loading || foodDetails?.isFavorite) return;
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        return console.log('User not found');
      }
      const { data } = await axios.post(`${apiUrl}/food/add-to-favorite`, {
        foodId: foodDetails?._id,
        userId: token,
      });

      if (data) {
        console.log(data);
        setLoading(false);
        toggleFavorite(foodDetails?._id);
        getFavorite();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsFavorite(false);
    }
  };

  return (
    <View className=" relative flex-1">
      <View className=" relative">
        <Image source={{ uri: foodDetails?.image }} className="h-72 w-full" />

        <View>
          <AddToFav isFavorite={isFavorite} handleAddToFav={handleAddToFav} loading={loading} />
        </View>
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
