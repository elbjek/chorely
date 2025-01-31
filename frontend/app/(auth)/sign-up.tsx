import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { Component, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import ThemedInput from '@/components/ThemedInput';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import ThemedButton from '@/components/ThemedButton';
import ThemedCheckbox from '@/components/ThemedCheckbox';

const SignUp: React.FC = () => {
  const [{ checked }, setState] = useState({ checked: false });
  return (
    <ThemedView style={styles.container}>
      <ThemedText
        type="title"
        className="text-center"
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}
      >
        Chorely
      </ThemedText>
      <ThemedInput placeholder="Email address" />
      <ThemedInput placeholder="Password" />
      <ThemedInput placeholder="Confirm password" />
      <ThemedView style={[styles.flexRow]}>
        <ThemedInput placeholder="Code" style={{ width: '65%' }} />
        <ThemedButton title="Send code" />
      </ThemedView>
      <ThemedCheckbox
        label="Agree to terms"
        checked={checked}
        onCheckChange={() => {
          // alert('checked');
          setState((s) => ({ checked: !s.checked }));
        }}
      />
      <ThemedButton title="Sign up" style={{ marginVertical: 10 }} />
      <ThemedView style={[styles.flexRow, styles.justifyEnd]}>
        <ThemedText
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}
          style={[{ fontWeight: '700', fontSize: 14, marginTop: 10 }]}
          onPress={() => router.back()}
        >
          Login
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default SignUp;

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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});
