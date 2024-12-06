/* eslint-disable prettier/prettier */
import { View, Text, Image } from 'react-native';

import congratsImg from '../../assets/congrats-img.png';
import logo from '../../assets/onboarding-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';
import { useLocalSearchParams } from 'expo-router';

const SuccessMsg = () => {
  const { data } = useLocalSearchParams();

  console.log(data);

  return (
    <View className=" flex-1">
      <Image source={logo} className="h-[200px] w-full" />
      <View className=" -mt-20 flex-col items-center justify-center">
        <Image source={congratsImg} />
      </View>

      <Text className=" mt-10 text-center text-6xl font-bold text-green-500">Congrats!</Text>
      <Text className=" mt-5 text-center text-3xl font-bold">Your Profile Is Ready To Use</Text>

      <View className="absolute bottom-10 left-6 right-6">
        <OnBoardingBtn screen={'/(user)/photo-preview'} title="Try Order" />
      </View>
    </View>
  );
};

export default SuccessMsg;
