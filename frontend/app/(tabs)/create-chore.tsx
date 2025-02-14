import React, { useEffect, useRef, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import withAuth from '@/lib/utils/withAuth';
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';
import ThemedInput from '@/components/ThemedInput';
import {
  CREATE_CHORE_MUTATION,
  GET_CHORES_FOR_USER,
} from '@/queries/chore-query';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getGreeting } from '.';
import { client } from '@/ApolloClient';
import { useUser } from '@/lib/utils/useUser';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { GET_CATEGORIES } from '@/queries/category-query';
import Category from '@/lib/utils/types/Category';

export async function createChoreMutation(
  client: ApolloClient<NormalizedCacheObject>,
  name: string,
  points: number,
  householdId: number,
  categoryId: number,
  description?: string,
) {
  const { data } = await client.mutate({
    mutation: CREATE_CHORE_MUTATION,
    variables: { name, householdId, points, description, categoryId },
  });

  return data;
}

export async function getCategories(
  client: ApolloClient<NormalizedCacheObject>,
  userId: number,
) {
  const { data } = await client.mutate({
    mutation: GET_CATEGORIES,
    variables: { userId },
  });

  return data;
}

interface ICreateChoreState {
  name: string;
  points: number;
  categories: Category[];
  description?: string;
  selectedCategory: number;
}

const createChore: React.FC = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const [
    { name, points, description, categories, selectedCategory },
    setState,
  ] = useState<ICreateChoreState>({
    name: '',
    points: 0,
    description: '',
    categories: [],
    selectedCategory: -1,
  });

  const { currentUser, loading } = useUser();

  useEffect(() => {
    const getCats = async () => {
      try {
        const cat = await getCategories(client, currentUser.id);

        setState((s) => ({ ...s, categories: cat.categories }));
      } catch (err) {
        console.error(err);
      }
    };

    getCats();
  }, []);

  const greeting = getGreeting();
  const createChoreMethod = async () => {
    const householdId = currentUser.households.find(
      (x: any) => x.isDefaultHousehold,
    ).id;
    const selectedCat = categories.find(
      (cat: any) => cat.name === selectedCategory,
    );

    if (!selectedCat) {
      throw new Error('Must select a category.');
    }

    try {
      const chore = await createChoreMutation(
        client,
        name,
        points,
        householdId,
        selectedCat.id,
        description,
      );
      if (chore.createChore) {
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pickerRef = useRef<any>(null);

  const togglePickerVisibility = () => {
    setIsPickerVisible((prevState) => !prevState);
  };

  const handleSelectCategory = (catId: any) => {
    setState((s) => ({ ...s, selectedCategory: catId }));
    setIsPickerVisible(false); // Close the modal after selection
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <ThemedView style={styles.container}>
            <ThemedText type="default">
              {greeting}{' '}
              <ThemedText style={{ textTransform: 'capitalize' }}>
                {currentUser && currentUser.name ? currentUser.name : 'Unknown'}
              </ThemedText>
            </ThemedText>
            <ThemedText type="title" style={{ marginTop: 20 }}>
              Create chore
            </ThemedText>
            <ThemedInput
              placeholder="Title"
              autoCapitalize="none"
              onChangeText={(val) => {
                setState((s) => ({ ...s, name: val }));
              }}
            />

            <TouchableOpacity onPress={togglePickerVisibility}>
              <ThemedText>
                {selectedCategory !== -1
                  ? selectedCategory
                  : 'Select a category'}
              </ThemedText>
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={isPickerVisible}
              animationType="slide"
              onRequestClose={() => setIsPickerVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <ThemedText>Select a category</ThemedText>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={handleSelectCategory}
                  >
                    {categories &&
                      categories.map((cat: any, index: number) => (
                        <Picker.Item
                          key={`${cat.name}_${index}`}
                          label={`${cat.name}_ ${cat.id}`}
                          value={cat.name}
                        />
                      ))}
                  </Picker>

                  <Button
                    title="Close"
                    onPress={() => setIsPickerVisible(false)}
                  />
                </View>
              </View>
            </Modal>

            <ThemedInput
              placeholder="Description"
              autoCapitalize="none"
              multiline={true}
              numberOfLines={2}
              onChangeText={(val) => {
                setState((s) => ({ ...s, description: val }));
              }}
            />
            <ThemedView style={styles.points}>
              {[...Array(10)].map((_, index) => (
                <ThemedText
                  key={index}
                  style={styles.point}
                  onPress={() => {
                    setState((s) => ({ ...s, points: index + 1 }));
                  }}
                >
                  {index + 1}
                </ThemedText>
              ))}
            </ThemedView>

            <ThemedButton
              onPress={() => {
                createChoreMethod();
              }}
              title="Create"
            />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default createChore;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: Dimensions.get('window').height,
    paddingHorizontal: 10,
  },
  points: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  point: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
