import { useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export const useLogout = () => {
  const navigation = useRouter();
  const client = useApolloClient();
  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await client.clearStore(); // Clear the Apollo cache
    navigation.replace("/(auth)/sign-in");
  };

  return logout;
};
