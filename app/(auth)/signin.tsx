/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { Eye, EyeOff } from 'lucide-react-native';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import logo from '../../assets/Logo-img.png';
import fb from '../../assets/fb.png';
import gg from '../../assets/gg.png';
import signinBgImg from '../../assets/signin-bg-img.png';
import { Link, router } from 'expo-router';
import { useAuthStore } from '~/store/auth-store';
import axios, { AxiosError } from 'axios';

import * as SecureStore from 'expo-secure-store';

const SignIn = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL_PRODUCTION;

  const { showPassword, setShowPassword, password, setPassword, email, setEmail, setUserData } =
    useAuthStore();

  const handleSignIn = async () => {
    setUserData({ email, password });

    try {
      const { data } = await axios.post(`${apiUrl}/auth/signin`, {
        email,
        password,
      });

      // console.log(data);
      router.replace('/(tabs)');

      setUserData({
        email: '',
        password: '',
      });

      await SecureStore.setItemAsync('token', data.user);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error?.response?.data.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full bg-white">
        {/* ImageBackground and Logo Section */}
        <ImageBackground source={signinBgImg} className="h-[280px] w-full">
          <View className="h-full flex-col items-center justify-center">
            <Image source={logo} />
          </View>
        </ImageBackground>

        {/* Title */}
        <Text className="mt-6 text-center text-3xl font-bold">Login To Your Account</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //   style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View className="mx-7 mt-14 flex-col gap-4">
              {/* Email Input */}
              <TextInput
                className="h-[57px] rounded-2xl border px-5 placeholder:text-blue-400"
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password Input */}
              <View className=" relative">
                <TextInput
                  className="h-[57px] rounded-2xl border px-5 pr-10 placeholder:text-blue-400"
                  placeholder="Password"
                  secureTextEntry={showPassword ? false : true}
                  value={password}
                  onChangeText={setPassword}
                />

                <Pressable
                  className=" absolute bottom-5 right-3"
                  onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? <Eye /> : <EyeOff />}
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View className=" mx-7 flex-row items-center justify-between">
          <Text className=" mt-8 text-center font-bold">Or Continue With</Text>

          <Link
            href="/(auth)/forgotPassword"
            className=" mt-7 text-center font-semibold text-green-600">
            Forgot Your Password?
          </Link>
        </View>

        <View className=" mx-7 mt-6 flex-row items-center gap-6">
          <TouchableOpacity className=" h-[57px] flex-1 flex-row items-center justify-center gap-3 rounded-2xl border border-blue-400 p-3">
            <Image source={fb} />
            <Text className=" text-lg font-bold">Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity className=" h-[57px] flex-1 flex-row items-center justify-center gap-3 rounded-2xl border border-blue-400 p-3">
            <Image source={gg} />
            <Text className=" text-lg font-bold">Google</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-10 left-6 right-6">
          {/* <AuthButton title="Login" screen={''} /> */}

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={!email || !password}
            className=" mx-auto mt-10 h-16 w-44  items-center justify-center rounded-xl bg-green-500 px-4 py-2">
            <Text className="text-lg font-bold text-white">Login</Text>
          </TouchableOpacity>

          <Link href="/(auth)/signup" className=" mt-7 text-center font-semibold text-green-600">
            Don't have an account? Sign Up
          </Link>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
