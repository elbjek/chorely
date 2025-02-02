import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'default' | 'primary' | 'secondary' | 'outline';
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  type = 'default',
  style,
  ...rest
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'primary' ? styles.primary : undefined,
        type === 'secondary' ? styles.secondary : undefined,
        type === 'outline' ? styles.outline : undefined,
        type === 'outline' && colorScheme === 'light'
          ? styles.outlineLight
          : undefined,
        type === 'outline' && colorScheme === 'dark'
          ? styles.outlineDark
          : undefined,
        colorScheme === 'dark' && type !== 'outline' ? styles.dark : undefined,
        colorScheme === 'light' && type !== 'outline'
          ? styles.light
          : undefined,
        style,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          colorScheme === 'dark' && type !== 'outline'
            ? styles.textDark
            : undefined,
          colorScheme === 'light' && type !== 'outline'
            ? styles.textLight
            : undefined,
          type === 'outline' && colorScheme === 'light'
            ? styles.outlineTextLight
            : undefined,
          type === 'outline' && colorScheme === 'dark'
            ? styles.outlineTextDark
            : undefined,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    overflow: 'hidden',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primary: {
    // backgroundColor: Colors.light.colorNavy,
  },
  secondary: {
    // backgroundColor: Colors.dark,
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  outlineLight: {
    borderColor: Colors.light.buttonBackground,
  },
  outlineDark: {
    borderColor: Colors.dark.buttonBackground,
  },
  light: {
    backgroundColor: Colors.light.buttonBackground,
  },
  dark: {
    backgroundColor: Colors.dark.buttonBackground,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textLight: {
    color: Colors.light.buttonText,
  },
  textDark: {
    color: Colors.dark.buttonText,
  },
  outlineTextDark: {
    color: Colors.dark.outlineText,
  },
  outlineTextLight: {
    color: Colors.light.outlineText,
  },
});

export default ThemedButton;
