import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
  useQuery,
} from '@apollo/client';
// import { login } from "./authService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { GET_CURRENT_USER, LOGIN_MUTATION } from '@/app/queries/user-query';
import { ThemedView } from '@/components/ThemedView';

export async function login(
  client: ApolloClient<NormalizedCacheObject>,
  email: string,
  password: string,
) {
  const { data } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email, password },
  });

  return data.login.token;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const router = useRouter();
  const { data } = useQuery(GET_CURRENT_USER);
  const handleLogin = async () => {
    try {
      const token = await login(client, email, password);
      await AsyncStorage.setItem('authToken', token);
      // Navigate to the next screen or update the UI

      router.push('/(tabs)/');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };
  console.log(data?.currentUser, 'curr usr from login');
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text>{error}</Text> : null}
        <Text style={[styles.signIn, styles.button]} onPress={handleLogin}>
          Login
        </Text>
        <Link href="/">Go to index</Link>
        <Link href="/explore">Go to explore</Link>
      </ThemedView>
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: '100%',
    paddingRight: 20,
    paddingLeft: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
    color: '#463F3A',
    fontWeight: 'bold',
    width: 200,
    textAlign: 'center',
  },
  signIn: {
    backgroundColor: '#E0AFA0',
    marginBottom: 20,
  },
  signUp: {
    backgroundColor: '#BCB8B1',
  },
});

export default SignIn;
