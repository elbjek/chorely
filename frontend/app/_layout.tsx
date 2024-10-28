import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/ApolloClient";
import { SafeAreaView, StatusBar, View } from "react-native";
import "@/global.css";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const MyStatusBar = ({ backgroundColor, ...props }: any) => (
    <View
      style={[
        {
          backgroundColor: colorScheme === "dark" ? "#463F3A" : "#f4f4f4",
        },
      ]}
    >
      <SafeAreaView>
        <StatusBar
          barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
          translucent
          backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        {/* <StatusBar
          // barStyle={colorScheme === "dark" ? "dark-content" : "light-content"}
          backgroundColor={colorScheme === "dark" ? "red" : "#463F3A"}
          hidden={true}
        /> */}
        <MyStatusBar />
        <Stack initialRouteName="(auth)/sign-in">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}
