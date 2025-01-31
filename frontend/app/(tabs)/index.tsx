import { Image, StyleSheet, Platform, FlatList, View } from 'react-native';
import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { gql, useApolloClient, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import withAuth from '../utils/withAuth';
import useLogout from '../utils/logout';
import { GET_CURRENT_USER } from '@/app/queries/user-query';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const logout = useLogout();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <ThemedText>Loading...</ThemedText>;

  if (error) {
    // console.error("Error fetching data:", error);
    // return <ThemedText>Error loading data</ThemedText>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome {data?.currentUser?.name ?? 'No name'}!
        </ThemedText>
        <ThemedText
          onPress={() => {
            logout();
          }}
        >
          Logout
        </ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
