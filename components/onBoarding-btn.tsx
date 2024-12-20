/* eslint-disable prettier/prettier */
import { RelativePathString, router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

const OnBoardingBtn = ({ screen, title }: { screen: RelativePathString | any; title: string }) => {
  return (
    <TouchableOpacity
      onPress={() => router.replace(screen)}
      className=" mx-auto mt-10 h-16 w-40  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
      <Text className="text-lg font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export default OnBoardingBtn;
