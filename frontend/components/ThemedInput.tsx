import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

interface ThemedInputProps extends TextInputProps {
  type?: 'default' | 'primary' | 'secondary';
  placeholder?: string;
}

const ThemedInput: React.FC<ThemedInputProps> = ({
  type = 'default',
  style,
  placeholder,
  ...rest
}) => {
  const colorScheme = useColorScheme();

  return (
    <TextInput
      style={[
        styles.input,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        colorScheme === 'dark' ? styles.dark : styles.light,
        style,
      ]}
      placeholderTextColor={colorScheme === 'dark' ? '#ffffff' : '#000000'}
      placeholder={placeholder ?? ''}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  primary: {
    borderColor: '#007bff',
  },
  secondary: {
    borderColor: '#6c757d',
  },
  light: {
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    borderColor: Colors.light.borderLight,
  },
  dark: {
    backgroundColor: '#333333',
    color: '#ffffff',
    borderColor: Colors.dark.borderDark,
  },
});

export default ThemedInput;
