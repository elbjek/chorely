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
  Modal,
  Button,
  Text,
  TouchableOpacity,
  SectionList,
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
import Categories from '@/components/Categories';

interface IHomeScreenProps {
  chores: Chore[];
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choreToDelete, setChoreToDelete] = useState<number | null>(null);

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
    }
  }, [data]);

  const theme = useColorScheme() ?? 'light';

  const logout = useLogout();

  const groupedChores = chores.reduce(
    (acc, chore) => {
      const categoryName = chore.category ? chore.category.name : '';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(chore);
      return acc;
    },
    {} as Record<string, typeof chores>,
  );

  // Create the sections for SectionList
  const sections = Object.keys(groupedChores).map((categoryName) => ({
    title: categoryName,
    data: groupedChores[categoryName].sort((a, b) => a.frequency - b.frequency), // Sort by frequency
  }));

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
              }
            </ThemedText>

            <ThemedText
              onPress={() => {
                logout();
              }}
            >
              Logout
            </ThemedText>
            {sections && (
              <Categories
                sections={sections}
                onCategoryPress={(categoryId) => {
                  router.push(`/single-category?categoryId=${categoryId}`);
                }}
              />
            )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#f00',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choreItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'pink',
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default withAuth(HomeScreen);
