/* eslint-disable prettier/prettier */

import { RelativePathString, router, UnknownInputParams } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

const AuthButton = ({
  title,
  screen,
  data,
}: {
  title: string;
  data: UnknownInputParams | any;
  screen: RelativePathString | any;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.replace({
          pathname: screen,
          params: data,
        })
      }
      className=" mx-auto mt-10 h-16 w-44  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
      <Text className="text-lg font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
