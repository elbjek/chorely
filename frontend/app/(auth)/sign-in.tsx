import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useApolloClient,
  useQuery,
} from "@apollo/client";
// import { login } from "./authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { GET_CURRENT_USER, LOGIN_MUTATION } from "@/app/queries/user-query";

export async function login(
  client: ApolloClient<NormalizedCacheObject>,
  email: string,
  password: string
) {
  const { data } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email, password },
  });

  return data.login.token;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const router = useRouter();
  const { data } = useQuery(GET_CURRENT_USER);
  const handleLogin = async () => {
    try {
      const token = await login(client, email, password);
      await AsyncStorage.setItem("authToken", token);
      // Navigate to the next screen or update the UI

      router.push("/(tabs)/");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };
  console.log(data?.currentUser, "curr usr from login");
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default SignIn;
