import { AuthProvider } from '~/store/auth-context';
import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
 

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(onboarding)/onBoarding1"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(onboarding)/onBoarding2"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/forgotPassword"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/bio"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/photo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/camera"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="(user)/photo-preview"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/user-location"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/verification"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(user)/success-msg"
          options={{
            headerShown: false,
          }}
        />

        {/* this is for the restaurant screens  */}

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* <statusbar /> */}
      </Stack>
    </AuthProvider>
  );
}
