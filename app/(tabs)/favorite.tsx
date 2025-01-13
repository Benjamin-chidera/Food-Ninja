import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';

import axios from 'axios';
import { useFoodStore } from '~/store/food';

import { useAuth } from '~/store/auth-context';
import RemoveFav from '~/components/buttons/remove-fav';

import * as SecureStore from 'expo-secure-store';
import { Link } from 'expo-router';

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
    <View>
      <View className="mt-5 flex-row flex-wrap justify-center gap-4">
        {favorites.map((r) => (
          <View className="relative mt-7 w-48 gap-2 rounded-xl bg-white p-3" key={r._id}>
            <Link href={`/(popular-menu)/${r?._id}`}>
              <Image source={{ uri: r?.image }} className="h-36 w-40" />
            </Link>
            <Text className="text-center text-lg font-semibold">{r?.name}</Text>
            <Text className="text-center text-sm text-gray-500">{r?.restaurant}</Text>
            <Text className="text-center text-sm text-gray-500">{r?.price}</Text>

            <View className="absolute right-1 top-1 rounded-full bg-green-500 p-2">
              <RemoveFav
                loading={loadingState[r._id] || false} // Check loading for the specific item
                handleRemoveFavorite={handleRemoveFavorite}
                id={r._id}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Favorite;
