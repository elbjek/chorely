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
import React, { useCallback, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useApolloClient,
  useQuery,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import withAuth from '@/lib/utils/withAuth';
import useLogout from '@/lib/utils/logout';
import { GET_CURRENT_USER } from '@/queries/user-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import ThemedButton from '@/components/ThemedButton';
import Chore from '@/lib/utils/types/Chore';
import Household from '@/lib/utils/types/Household';
import { useUser } from '@/lib/utils/useUser';
import { GET_CHORES_FOR_USER, REMOVE_CHORE } from '@/queries/chore-query';
import { client } from '@/ApolloClient';

interface IHomeScreenProps {
  chores: Chore[];
}

export async function removeSelectedChore(
  client: ApolloClient<NormalizedCacheObject>,
  id: number,
) {
  const { data } = await client.mutate({
    mutation: REMOVE_CHORE,
    variables: { id },
  });

  return data;
}

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Hello';
  } else {
    return 'Good evening';
  }
};

const HomeScreen: React.FC = () => {
  const { data, refetch } = useQuery(GET_CHORES_FOR_USER, {
    fetchPolicy: 'network-only',
  });
  const { currentUser, loading, error } = useUser();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  const router = useRouter();
  const [{ chores }, setState] = useState<IHomeScreenProps>({
    chores: [],
  });

  useEffect(() => {
    if (data && data.chores) {
      setState((s) => ({ ...s, chores: data.chores }));
      console.log(chores);
    }
  }, [data]);

  const theme = useColorScheme() ?? 'light';

  const logout = useLogout();

  const handleDeleteChore = async (id: number) => {
    try {
      await removeSelectedChore(client, id);
      setState((prevState) => ({
        ...prevState,
        chores: prevState.chores.filter((chore) => chore.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting chore:', error);
    }
  };

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) {
    return <ThemedText>Error loading data</ThemedText>;
  }
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
                  {currentUser.name ?? 'Unknown'}
                </ThemedText>
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

            <ThemedText type="title" style={{ textTransform: 'capitalize' }}>
              {
                currentUser.households.find(
                  (household: Household) => household.isDefaultHousehold,
                ).name
              }{' '}
              Household
            </ThemedText>

            <ThemedText
              onPress={() => {
                logout();
              }}
            >
              Logout
            </ThemedText>

            {chores &&
              chores.map((chore: Chore) => (
                <ThemedText
                  key={chore.id}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <ThemedText>Name: {chore.name}</ThemedText>
                  <ThemedText
                    onPress={() => {
                      handleDeleteChore(chore.id);
                    }}
                  >
                    {' '}
                    Delete{' '}
                  </ThemedText>
                  <ThemedText>Difficulty{chore.point}</ThemedText>
                </ThemedText>
              ))}
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
    minHeight: Dimensions.get('window').height,
  },
  headingContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default withAuth(HomeScreen);
