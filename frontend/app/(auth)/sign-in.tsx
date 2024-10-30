import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export class SignIn extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.title}>Sign In</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </View>
              <Button
                title="Sign In"
                // onPress={() => this.signIn()}
                // style={styles.button}
              />
              {/* <Text style={styles.error}>{this.state.error}</Text> */}
              <Text
                style={styles.link}
                // onPress={() => this.props.navigation.navigate("SignUp")}
              >
                Don't have an account? Sign Up
              </Text>
              <View />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default SignIn;

export const styles = {
  link: {},
  error: {},
  input: {},
  inputContainer: {},
  title: {},
  container: {},
  button: {},
  label: {},
};
