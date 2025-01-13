/* eslint-disable import/order */
import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Heart, LoaderCircle } from 'lucide-react-native';

interface Props {
  isFavorite: boolean;
  handleAddToFav: () => void;
  loading: boolean;
}

const AddToFav = ({ isFavorite, handleAddToFav, loading }: Props) => {
  return (
    <View>
      <TouchableOpacity
        className=" absolute bottom-2 right-2 rounded-full bg-white p-2"
        onPress={handleAddToFav}
        disabled={isFavorite}>
        {loading ? (
          <LoaderCircle color="green" />
        ) : (
          <Heart color={`${isFavorite ? 'red' : 'green'}`} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddToFav;
