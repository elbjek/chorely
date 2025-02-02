import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  useColorScheme,
} from 'react-native';
import React, { useCallback } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import withAuth from '@/lib/utils/withAuth';
import useLogout from '@/lib/utils/logout';
import { GET_CURRENT_USER } from '@/queries/user-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import ThemedButton from '@/components/ThemedButton';
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Hello';
    } else {
      return 'Good evening';
    }
  };

  // const logout = useLogout();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <ThemedText>Loading...</ThemedText>;

  // if (error) {
  //   // console.error("Error fetching data:", error);
  //   return <ThemedText>Error loading data</ThemedText>;
  // }
  const greeting = getGreeting();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <ThemedView style={styles.container}>
            <ThemedView
              style={[
                styles.headingContainer,
                {
                  backgroundColor:
                    theme === 'light'
                      ? Colors.light.background
                      : Colors.dark.background,
                },
                {
                  borderBottomColor:
                    theme === 'light'
                      ? Colors.light.colorNavy
                      : Colors.dark.borderDark,
                },
              ]}
            >
              <ThemedText type="default">
                {greeting}{' '}
                <ThemedText style={{ textTransform: 'capitalize' }}>
                  {data?.currentUser.name ?? 'Unknown'}
                </ThemedText>
                {/* Welcome {data?.currentUser?.name ?? 'No name'}! */}
              </ThemedText>
              <ThemedText
                style={[
                  styles.icon,
                  {
                    borderColor:
                      theme === 'light'
                        ? Colors.light.colorNavy
                        : Colors.dark.borderDark,
                  },
                ]}
              >
                <Ionicons
                  name={'notifications-outline'}
                  size={18}
                  color={
                    theme === 'light' ? Colors.light.icon : Colors.dark.icon
                  }
                />
              </ThemedText>
            </ThemedView>

            <ThemedButton
              title="Add new Chore"
              style={{ marginVertical: 10, marginHorizontal: 10 }}
            />
            {/* <ThemedText>
              This is the {data.currentUser.households[0].name}
            </ThemedText>
            <ThemedText
              onPress={() => {
                logout();
              }}
            >
              Logout
            </ThemedText>
            <ThemedText
              onPress={() => {
                router.push('/setup-household');
              }}
            >
              Household
            </ThemedText> */}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    minHeight: Dimensions.get('window').height,
  },
  headingContainer: {
    // paddingVertical: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
  },

  text: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 4,
  },
  // titleContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 8,
  // },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default withAuth(HomeScreen);
