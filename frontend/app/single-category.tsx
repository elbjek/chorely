import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GET_CHORES_BY_CATEGORY, REMOVE_CHORE } from '@/queries/chore-query';
import { client } from '@/ApolloClient';
import { useSearchParams } from 'expo-router/build/hooks';
import { useUser } from '@/lib/utils/useUser';
import Chore from '@/lib/utils/types/Chore';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';

export async function getChores(
  client: ApolloClient<NormalizedCacheObject>,
  categoryId: number,
  userId: number,
) {
  const { data } = await client.mutate({
    mutation: GET_CHORES_BY_CATEGORY,
    variables: { categoryId, userId },
  });

  return data;
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
const singleCategory: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const [{ chores, title }, setState] = useState<{
    chores: Chore[];
    title: string;
  }>({ chores: [], title: '' });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choreToDelete, setChoreToDelete] = useState<number | null>(null);
  const { currentUser } = useUser();
  useEffect(() => {
    const fetchChores = async () => {
      try {
        const data = await getChores(
          client,
          Number(categoryId),
          currentUser.id,
        );
        console.log(data.choresByCategory);
        if (data.choresByCategory) {
          const firstChore = data.choresByCategory[0];
          const categoryName = firstChore;
          console.log(data.choresByCategory);
          // ? firstChore.category.name
          // : 'Unknown Category';
          setState((s) => ({
            ...s,
            chores: data.choresByCategory,
            title: 'Unknown Category',
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChores();
  }, []);

  const handleDeleteChore = async (id: number) => {
    setChoreToDelete(id);
    setIsModalVisible(true);
  };

  const confirmDeleteChore = async () => {
    if (choreToDelete !== null) {
      try {
        await removeSelectedChore(client, choreToDelete);
        setState((prevState) => ({
          ...prevState,
          chores: prevState.chores.filter(
            (chore) => chore.id !== choreToDelete,
          ),
        }));
      } catch (error) {
        console.error('Error deleting chore:', error);
      } finally {
        setIsModalVisible(false);
        setChoreToDelete(null);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <Header />
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <ThemedView style={styles.modalContainer}>
              <ThemedView style={styles.modalContent}>
                <ThemedText
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Are you sure you want to delete {choreToDelete}?
                </ThemedText>
                <ThemedView style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={confirmDeleteChore}
                  >
                    <ThemedText style={styles.buttonText}>Delete</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Modal>
          <ThemedView style={styles.container}>
            <ThemedText type="title">{title ?? 'N/a'}</ThemedText>
            {chores.map((chore: any, index: number) => (
              <ThemedView
                style={styles.choreItem}
                key={`${chore.name}_${index}`}
              >
                <ThemedView
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <ThemedText
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                  >
                    {chore.name}
                  </ThemedText>

                  <ThemedText onPress={() => handleDeleteChore(chore.id)}>
                    Delete
                  </ThemedText>
                </ThemedView>
                <ThemedText
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Id: {chore.id}
                </ThemedText>

                <ThemedText
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Frequency: {chore.frequency}
                </ThemedText>
                <ThemedText
                  lightColor={Colors.light.text}
                  darkColor={Colors.dark.text}
                >
                  Points: {chore.point}
                </ThemedText>
              </ThemedView>
            ))}
            <ThemedButton title="Back" onPress={() => router.back()} />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default singleCategory;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: Dimensions.get('window').height,
  },

  choreItem: {
    padding: 10,
    marginBottom: 10,
    // backgroundColor: '#f0f0f0',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
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
    // backgroundColor: 'white',
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
});
