import axios from 'axios';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import RemoveFav from '~/components/buttons/remove-fav';
import { useAuth } from '~/store/auth-context';
import { useFoodStore } from '~/store/food';

const Favorite = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;
  const isFav = useAuth();

  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});
  const { loading, setLoading, setIsFavorite } = useFoodStore();

  if (!isFav) {
    return null;
  }

  const { favorites, getFavorite } = isFav;

  // Local state to track loading of each favorite item

  const handleRemoveFavorite = async (id: string) => {
    // Set loading state for the specific item to true
    setLoadingState((prevState) => ({ ...prevState, [id]: true }));

    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        console.log('User not found');
        return;
      }

      const { data } = await axios.delete(`${apiUrl}/food/remove-favorites`, {
        data: {
          foodId: id,
          userId: token,
        },
      });

      if (data.success) {
        console.log(data);
        getFavorite(); // Refresh favorites list
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
      setIsFavorite(true);
    } finally {
      // Set loading state to false for the specific item
      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  if (!isFav) {
    return null;
  }

  return (
    <ScrollView className=" bg-white">
      <View className=" mx-5 mt-3 flex-row flex-wrap gap-4">
        {favorites.map((r) => (
          <View key={r?._id}>
            <Link href={`/(popular-menu)/${r?._id}`} className="mt-3">
              <View className=" relative w-full flex-row items-center gap-4 rounded-xl bg-white p-3 shadow-md shadow-[#0002]">
                <Image source={{ uri: r?.image }} className=" h-20 w-20 rounded-md " />

                <View>
                  <Text className=" text-lg font-semibold">{r?.name}</Text>
                  <Text className=" text-sm text-gray-500" numberOfLines={1}>
                    {r?.restaurant}
                  </Text>
                  <Text className=" text-xl font-bold text-green-600">{r?.price}</Text>
                </View>
              </View>
            </Link>
            <View className="absolute bottom-5 right-3 rounded-full bg-green-500 p-2">
              <RemoveFav
                loading={loadingState[r._id] || false} // Check loading for the specific item
                handleRemoveFavorite={handleRemoveFavorite}
                id={r._id}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Favorite;
