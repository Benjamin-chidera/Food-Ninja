/* eslint-disable import/order */
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useFoodStore } from '~/store/food';
import { Button } from '~/components/ui/button';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import * as SecureStore from 'expo-secure-store';
import { useAuth } from '~/store/auth-context';
import AddToFav from '~/components/buttons/add-to-fav';
import { useGlobalCart } from '~/store/cart-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PopularMenuId = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const { id } = useLocalSearchParams();;
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

  const { quantity, setQuantity, addToCart, increaseQuantity } = useGlobalCart();

  // this is for the bottom sheet

  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // console.log(apiUrl);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

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

  const handleDecrease = () => {
    if (quantity < 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View className=" relative">
        <Image source={{ uri: foodDetails?.image }} className="h-full w-full" />
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}>
        <BottomSheetView style={styles.contentContainer}>
          {/* <Text>Awesome 🔥</Text> */}

          <View className=" p-3  ">
            <View className=" mb-5">
              <Text className=" mb-2 text-2xl font-bold">{foodDetails?.name}</Text>
              <View>
                <AddToFav
                  isFavorite={isFavorite}
                  handleAddToFav={handleAddToFav}
                  loading={loading}
                />
              </View>
            </View>
            <View className=" mb-2 flex-row items-center justify-between gap-5">
              <Text className=" mb-2 text-2xl font-bold">${foodDetails?.price}</Text>

              <View className=" flex-row items-center gap-5">
                {/* this is for controlling the quantity of the food item */}
                <Button className=" bg-green-500" onPress={handleDecrease}>
                  <Text className=" text-2xl text-white">-</Text>
                </Button>
                <Text>{quantity}</Text>
                <Button className=" bg-green-500" onPress={() => setQuantity(quantity + 1)}>
                  <Text className=" text-2xl text-white">+</Text>
                </Button>

                {/* this is for controlling the quantity of the food item */}
              </View>
            </View>

            <Text className=" mt-3 text-xl font-bold">Description</Text>

            <Text className=" mt-1 text-lg">{foodDetails?.description}</Text>

            <View>{/* this is for related food */}</View>

            <View>{/* this is for rating and reviews */}</View>
          </View>

          {/* this is the button for adding the food item to the cart */}
        </BottomSheetView>
      </BottomSheet>
      <View className="  absolute bottom-10 left-0 right-0">
        <TouchableOpacity
          className="mx-auto  h-20 w-[326px] items-center justify-center rounded-2xl bg-green-500 p-2"
          onPress={() => addToCart(foodDetails?._id)}>
          <Text className=" text-center font-bold text-white">Add to cart</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default PopularMenuId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: '10%',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CD964',
    padding: 10,
    borderRadius: '50%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
