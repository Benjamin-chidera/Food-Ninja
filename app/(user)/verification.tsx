/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { OtpInput } from 'react-native-otp-entry';
import gallery from '../../assets/Gallery.png';
import bioImg from '../../assets/signin-bg-img.png';

import OnBoardingBtn from '~/components/onBoarding-btn';
import AuthButton from '~/components/buttons/auth-button';

const verification = () => {
  const text = 'Your Profile Is Ready To Use';
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-white">
        {/* Header Image */}
        <Image source={bioImg} className="h-[100px] w-full" />

        <View className="mx-6">
          <Text className="text-3xl font-bold">Enter 4-digit Verification code</Text>

          <Text className="my-6">
            Code sent to benjaminchidera72@gmail.com. This code will expire in 5 minutes.
          </Text>

          <View className="mx-auto w-[270px] shadow shadow-blue-300 ">
            <OtpInput
              numberOfDigits={4}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log('otp', text)}
              onFilled={(text) => console.log(`OTP is ${text}`)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
            />
          </View>
        </View>

        {/* Button Positioned at the Bottom */}
        <View className="absolute bottom-10 left-6 right-6">
          <AuthButton screen={'/(user)/success-msg'} title="Verify Now" data={text} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default verification;
