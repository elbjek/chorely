import React, { useEffect, useState } from 'react';
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

export async function createChoreMutation(
  client: ApolloClient<NormalizedCacheObject>,
  name: string,
  points: number,
  householdId: number,
  description?: string,
) {
  const { data } = await client.mutate({
    mutation: CREATE_CHORE_MUTATION,
    variables: { name, householdId, points, description },
  });

  return data;
}

interface ICreateChoreState {
  name: string;
  points: number;
  description?: string;
}

const createChore: React.FC = () => {
  const [{ name, points, description }, setState] = useState<ICreateChoreState>(
    {
      name: '',
      points: 0,
      description: '',
    },
  );
  useEffect(() => {
    console.log(points);
  });
  const { currentUser, loading } = useUser();
  const navigation = useNavigation();

  const greeting = getGreeting();
  const createChoreMethod = async () => {
    const householdId = currentUser.households.find(
      (x: any) => x.isDefaultHousehold,
    ).id;
    try {
      const chore = await createChoreMutation(
        client,
        name,
        points,
        householdId,
        description,
      );
      if (chore.createChore) {
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <ThemedView style={styles.container}>
            <ThemedText type="default">
              {greeting}{' '}
              <ThemedText style={{ textTransform: 'capitalize' }}>
                {currentUser.name ?? 'Unknown'}
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
            <ThemedInput
              placeholder="Description"
              autoCapitalize="none"
              multiline={true}
              numberOfLines={2}
              onChangeText={(val) => {
                setState((s) => ({ ...s, description: val }));
              }}
            />
            <ThemedView style={styles.pointss}>
              {[...Array(10)].map((_, index) => (
                <ThemedText
                  key={index}
                  style={styles.points}
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
  pointss: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  points: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    borderRadius: 30,
  },
});
