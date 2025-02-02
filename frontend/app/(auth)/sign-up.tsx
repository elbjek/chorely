import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Component, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import ThemedInput from '@/components/ThemedInput';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import ThemedButton from '@/components/ThemedButton';
import ThemedCheckbox from '@/components/ThemedCheckbox';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { CREATE_USER_MUTATION, LOGIN_MUTATION } from '@/queries/user-query';
import { client } from '@/ApolloClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ISignUpPageState {
  email: string;
  password: string;
  passwordConfirm: string;
  userName: string;
  error: string;
  checked: boolean;
}

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

export async function register(
  client: ApolloClient<NormalizedCacheObject>,
  credentials: { email: string; password: string; name?: string },
) {
  const { data } = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: {
      email: credentials.email.toLocaleLowerCase(),
      password: credentials.password,
      name: credentials.name ?? 'n/a',
    },
  });
  return data;
}

const SignUp: React.FC = () => {
  const [
    { email, password, passwordConfirm, error, checked, userName },
    setState,
  ] = useState<ISignUpPageState>({
    email: '',
    password: '',
    passwordConfirm: '',
    error: '',
    checked: false,
    userName: '',
  });

  const handleSignup = async () => {
    if (!checked) {
      setState((s) => ({
        ...s,
        error: 'Make sure you agree with our terms and service.',
      }));
      return;
    }
    if (password !== passwordConfirm) {
      setState((s) => ({ ...s, error: 'Passwords do not match.' }));
      return;
    }
    try {
      const tryRegister = await register(client, {
        email,
        password,
        name: userName,
      });
      if (tryRegister.createUser) {
        const token = await login(client, email, password);
        await AsyncStorage.setItem('authToken', token);
        router.push('/setup-household');
      }
      // const createUser =
      // const token = await login(client, email, password)
      // create an account (await register)
      // strt a session await login
      setState((s) => ({ ...s, error: '' }));
    } catch (err) {
      setState((s) => ({ ...s, error: (err as any).message }));
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="title"
        className="text-center"
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
      >
        Chorely
      </ThemedText>
      <ThemedInput
        placeholder="First and Last name"
        autoCapitalize="none"
        onChangeText={(val) => {
          setState((s) => ({ ...s, userName: val }));
        }}
      />
      <ThemedInput
        placeholder="Email address"
        autoCapitalize="none"
        onChangeText={(val) => {
          setState((s) => ({ ...s, email: val }));
        }}
      />
      <ThemedInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(val) => {
          setState((s) => ({ ...s, password: val }));
        }}
      />
      <ThemedInput
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={(val) => {
          setState((s) => ({
            ...s,
            passwordConfirm: val,
            error: s.password !== val ? 'Passwords are not identical' : '',
          }));
        }}
      />
      {/* <ThemedView style={[styles.flexRow]}>
        <ThemedInput placeholder="Code" style={{ width: '65%' }} />
        <ThemedButton title="Send code" />
      </ThemedView> */}
      <ThemedCheckbox
        label="Agree to terms"
        checked={checked}
        onCheckChange={() => {
          setState((s) => ({ ...s, checked: !checked }));
        }}
      />
      {error && (
        <ThemedText style={{ color: Colors.light.colorRed, fontSize: 13 }}>
          {error}
        </ThemedText>
      )}
      <ThemedButton
        title="Sign up"
        onPress={() => {
          handleSignup();
        }}
        style={{ marginVertical: 10 }}
      />
      <ThemedView style={[styles.flexRow, styles.justifyEnd]}>
        <ThemedText
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}
          style={[{ fontWeight: '700', fontSize: 14, marginTop: 10 }]}
          onPress={() => router.push('/')}
        >
          Login
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default SignUp;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    // gap: 8,
    height: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});
