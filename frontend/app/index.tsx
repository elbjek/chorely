import {
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MainIllustration from '@/assets/images/couple-love.svg';

import {
  useApolloClient,
  ApolloClient,
  NormalizedCacheObject,
  useQuery,
} from '@apollo/client';
import { login } from './(auth)/sign-in';
import { GET_CURRENT_USER } from './queries/user-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemedButton from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
const IndexPage: React.FC = () => {
  const colorScheme = useColorScheme();

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

      router.push('/(tabs)');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };
  console.log(data?.currentUser, 'curr usr from login');
  return (
    <SafeAreaProvider style={styles.bg}>
      <SafeAreaView>
        <ScrollView>
          <ThemedView style={styles.container}>
            {/* HEADING */}
            <ThemedView style={styles.heading}>
              <ThemedText
                type="title"
                style={styles.headingText}
                className="text-center"
              >
                Chorely
              </ThemedText>
              <ThemedText className="text-center font-semibold pb-3">
                See who really gets down and dirty.
              </ThemedText>
            </ThemedView>

            {/* INPUT CONTAINERS */}
            <ThemedView style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.inputField,
                  colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
                ]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput
                style={[
                  styles.inputField,
                  colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {/* ERRORS */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              {/* BUTTONS */}
              <ThemedView style={styles.infoLinks}>
                <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
                  Forgot password?
                </ThemedText>
                <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
                  Sign Up
                </ThemedText>
              </ThemedView>

              <ThemedView
                style={{ marginVertical: 20, marginHorizontal: 'auto' }}
              >
                <ThemedButton
                  onPress={handleLogin}
                  title="Login"
                  type="primary"
                ></ThemedButton>
              </ThemedView>
            </ThemedView>
            <ThemedView style={[styles.breakpoint]}>
              <View style={styles.break}></View>
              <ThemedText style={styles.breakText}>or</ThemedText>
              <View style={styles.break}></View>
            </ThemedView>
            <ThemedView style={{ marginTop: 20 }}>
              <ThemedButton
                title="Sign in with Google"
                type="outline"
              ></ThemedButton>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height,
  },
  heading: {
    textAlign: 'center',
    paddingTop: 20,
    width: '100%',
  },
  headingText: {
    // textAlign: "center",
  },
  bg: {
    backgroundColor: '#F4F3EE',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    // backgroundColor: "#BCB8B1",
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: "space-around",
    overflow: 'hidden',
    // flexDirection: "row",
  },
  inputContainer: {
    width: '100%',
  },
  inputField: {
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputDark: {
    borderColor: Colors.dark.borderDark,
  },
  inputLight: {
    borderColor: Colors.light.borderLight,
  },
  infoLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    overflow: 'hidden',
    color: '#463F3A',
    fontWeight: 'bold',
    width: 300,
    textAlign: 'center',
  },
  buttonLight: {
    backgroundColor: '#F4F3EE',
  },
  buttonOutline: {
    borderColor: '#E0AFA0',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  signIn: {
    backgroundColor: '#E0AFA0',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signUp: {
    backgroundColor: '#BCB8B1',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  breakpoint: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  breakText: {
    marginLeft: 10,
    marginRight: 10,
  },
  break: {
    borderColor: '#BCB8B1',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    width: '40%',
  },
  errorText: {
    color: '#CD4631',
    textAlign: 'center',
    fontSize: 13,
  },
});
