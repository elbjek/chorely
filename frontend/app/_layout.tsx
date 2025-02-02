import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';
import { useNavigationState } from '@react-navigation/native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '@/ApolloClient';
import { SafeAreaView, StatusBar, View } from 'react-native';
import '@/global.css';
import { UserProvider } from '@/lib/utils/useUser';
// import { GET_CURRENT_USER } from "./(tabs)";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // function AuthenticationGuard() {
  //   const segments = useSegments();
  //   const router = useRouter();
  //   const { loading, error, data } = useQuery(GET_CURRENT_USER);
  //   console.log(data?.currentUser, "curr usr from auth guard");
  //   useEffect(() => {
  //     if (!loading) {
  //       if (data?.currentUser) {
  //         if (segments[0] === "(auth)") {
  //           router.replace("/(tabs)/");
  //         }
  //       } else {
  //         if (segments[0] !== "(auth)") {
  //           router.replace("/(auth)/sign-in");
  //         }
  //       }
  //     }
  //   }, [loading, data, segments]);

  //   return null;
  // }

  const MyStatusBar = ({ backgroundColor, ...props }: any) => (
    <View
      style={[
        {
          backgroundColor: colorScheme === 'dark' ? '#463F3A' : '#f4f4f4',
        },
      ]}
    >
      <SafeAreaView>
        <StatusBar
          barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
          translucent
          backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === 'light' ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right', // Set the animation type
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="setup-household"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
