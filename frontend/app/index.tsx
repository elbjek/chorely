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
import React, { useState, useEffect } from 'react';
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
import { GET_CURRENT_USER, LOGIN_MUTATION } from '../queries/user-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemedButton from '@/components/ThemedButton';
import { Colors } from '@/constants/Colors';
import ThemedInput from '@/components/ThemedInput';
import { useUser } from '@/lib/utils/useUser';

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

interface IIndexPageState {
  email: string;
  password: string;
  error: string;
}

const IndexPage: React.FC = () => {
  const colorScheme = useColorScheme();

  const [{ email, password, error }, setState] = useState<IIndexPageState>({
    email: '',
    password: '',
    error: '',
  });

  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const router = useRouter();
  // const { data } = useQuery(GET_CURRENT_USER);
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser && currentUser.households[0].isSetup) {
      router.push('/(tabs)'); // Use replace() instead of push() to prevent going back
    }
  }, [currentUser]);

  const handleLogin = async () => {
    try {
      const token = await login(client, email, password);
      await AsyncStorage.setItem('authToken', token);
      router.replace('/(tabs)');
    } catch (err) {
      console.error(err);
      setState((s) => ({
        ...s,
        error: 'Login failed. Please check your credentials.',
      }));
    }
  };

  return (
    <SafeAreaProvider style={styles.bg}>
      <SafeAreaView>
        <ScrollView>
          <ThemedView style={styles.container}>
            {/* HEADING */}
            <ThemedView style={styles.heading}>
              <ThemedText type="title" className="text-center">
                Chorely
              </ThemedText>
              <ThemedText className="text-center font-semibold pb-3">
                See who really gets down and dirty.
              </ThemedText>
            </ThemedView>

            {/* INPUT CONTAINERS */}
            <ThemedView style={styles.inputContainer}>
              <ThemedInput
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(val) => {
                  setState((s) => ({ ...s, email: val }));
                }}
              />
              <ThemedInput
                placeholder="Password"
                onChangeText={(val) => {
                  setState((s) => ({ ...s, password: val }));
                }}
                secureTextEntry
              />

              {/* ERRORS */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              {/* BUTTONS */}
              <ThemedView style={styles.infoLinks}>
                <ThemedText style={{ fontSize: 13, fontWeight: 700 }}>
                  Forgot password?
                </ThemedText>
                <ThemedText
                  onPress={() => {
                    router.push('/(auth)/sign-up');
                  }}
                  style={{ fontSize: 13, fontWeight: 700 }}
                >
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

  bg: {
    backgroundColor: '#F4F3EE',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
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
