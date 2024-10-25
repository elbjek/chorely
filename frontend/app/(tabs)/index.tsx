import { initializeApollo } from "@/ApolloClient";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { FlatList, Platform, Text, View, StyleSheet } from "react-native";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
    }
  }
`;

// export async function getServerSideProps() {
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: GET_USERS,
//   });
//   console.log(data, "data");
//   return {
//     props: {
//       users: data.users,
//     },
//   };
// }

function HomeScreen() {
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "network-only", // Force a network request
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <Text>Error: {error.message}</Text>; // Display the error message
  }

  if (!data || !data.users) {
    return <Text>No users found.</Text>;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        // <Image
        //   source={require('@/assets/images/partial-react-logo.png')}
        //   style={styles.reactLogo}
        // />
        <>
          <ThemedText>Header</ThemedText>
        </>
      }
    >
      <FlatList
        data={data.users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.email}</Text>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
});

export default HomeScreen;
