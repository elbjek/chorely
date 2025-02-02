import { client } from '@/ApolloClient';
import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UPDATE_HOUSEHOLD } from '@/queries/household-query';
import { GET_CURRENT_USER } from '@/queries/user-query';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import { router } from 'expo-router';
import React, { act, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export async function update(
  client: ApolloClient<NormalizedCacheObject>,
  name: string,
  id: number,
) {
  const { data } = await client.mutate({
    mutation: UPDATE_HOUSEHOLD,
    variables: { id, name },
  });

  return data.updateHousehold;
}

const SetupHousehold: React.FC = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const isHouseholdSetup =
      data &&
      data.currentUser &&
      data.currentUser.households &&
      data?.currentUser.households.find((x: any) => x.isSetup);
    if (isHouseholdSetup) {
      router.replace('/(tabs)'); // Use replace() instead of push() to prevent going back
    }
  }, [data?.currentUser]);

  const [{ name, error }, setState] = useState({
    name: '',
    error: '',
  });
  const updateHousehold = async () => {
    const currentUser = data.currentUser;
    const activeHousehold = currentUser.households.find(
      (x: any) => x.isDefaultHousehold,
    );

    try {
      if (name.length === 0) {
        setState((s) => ({ ...s, error: 'Must provide household name' }));
        return;
      }
      const household = await update(client, name, activeHousehold.id);
      if (household) {
        router.push('/(tabs)');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Finish setting up your household</ThemedText>
      <ThemedText
        onPress={() => {
          router.back();
        }}
      >
        back
      </ThemedText>
      <ThemedView>
        <ThemedInput
          placeholder="Set up household name"
          autoCapitalize="none"
          onChangeText={(val) => {
            setState((s) => ({
              ...s,
              name: val,
              error: val.length === 0 ? 'Must provide household name' : '',
            }));
          }}
        />
        {error && <ThemedText>{error}</ThemedText>}
      </ThemedView>
      <ThemedButton title="Continue" onPress={updateHousehold}></ThemedButton>
    </ThemedView>
  );
};

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
});
export default SetupHousehold;
