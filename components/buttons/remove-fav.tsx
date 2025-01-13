import { LoaderCircle, Trash } from 'lucide-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  loading: boolean;
  id: string;
  handleRemoveFavorite: (id: string) => void;
}

const RemoveFav = ({ loading, handleRemoveFavorite, id }: Props) => {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleRemoveFavorite(id)}>
        {loading ? (
          <Text>
            <LoaderCircle color="white" size={20} />
          </Text>
        ) : (
          <Text>
            <Trash color="white" size={20} />
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RemoveFav;
