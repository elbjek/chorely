import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  View,
  Image,
  Dimensions,
  useColorScheme,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { Component } from "react";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MainIllustration from "@/assets/images/couple-love.svg";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export class IndexPage extends Component {
  render() {
    return (
      <SafeAreaProvider style={styles.bg}>
        <SafeAreaView>
          <ScrollView>
            <ThemedView style={styles.container}>
              <ThemedView style={styles.heading}>
                <ThemedText type="title" style={styles.headingText}>
                  Welcome to Chorely
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.header}>
                <MainIllustration width={200} height={100} />
              </ThemedView>
              {/* Use the SVG component */}
              <ThemedView style={[styles.flex]}>
                <Link
                  href="/(auth)/sign-in"
                  style={[styles.signIn, styles.button]}
                >
                  Sign In
                </Link>
                <Link
                  href="/(auth)/sign-up"
                  style={[styles.signUp, styles.button]}
                >
                  Sign Up
                </Link>
              </ThemedView>
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    minHeight: Dimensions.get("window").height,
  },
  heading: {
    textAlign: "center",
    paddingTop: 20,
    width: "100%",
  },
  headingText: {
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#F4F3EE",
  },
  header: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    // backgroundColor: "#BCB8B1",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-around",
    overflow: "hidden",
    // flexDirection: "row",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    overflow: "hidden",
    color: "#463F3A",
    fontWeight: "bold",
    width: 200,
    textAlign: "center",
  },
  signIn: {
    backgroundColor: "#E0AFA0",
    marginBottom: 20,
  },
  signUp: {
    backgroundColor: "#BCB8B1",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
