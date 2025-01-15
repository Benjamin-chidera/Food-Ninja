import '../global.css';
import { AuthProvider } from '~/store/auth-context';

import { PortalHost } from '@rn-primitives/portal';

import { Stack } from 'expo-router';
import { StatusBar, Text, View } from 'react-native';
import { CartProvider } from '~/store/cart-context';

export default function Layout() {
  return (
    <AuthProvider>
      <CartProvider>
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
            name="(auth)/resetPassword"
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

          {/* this is for the more nearest restaurant screens  */}

          <Stack.Screen
            name="(nearest-restaurant)"
            options={{
              headerShown: false,
            }}
          />

          {/* this is for the popular menu */}

          <Stack.Screen
            name="(popular-menu)"
            options={{
              headerShown: false,
            }}
          />

          {/* this is for the popular menu */}

          {/* <statusbar /> */}
        </Stack>
        <PortalHost />
      </CartProvider>
    </AuthProvider>
  );
}
