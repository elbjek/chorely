import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

interface ThemedCheckboxProps {
  label: string;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const ThemedCheckbox: React.FC<ThemedCheckboxProps> = ({
  label,
  checked,
  onCheckChange,
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.dark : styles.light,
      ]}
      onPress={() => onCheckChange(!checked)}
    >
      <View style={[styles.checkbox, checked ? styles.checked : undefined]}>
        {checked && (
          <MaterialIcons
            name="check"
            size={24}
            color={colorScheme === 'dark' ? '#000' : '#fff'}
          />
        )}
      </View>
      <ThemedText style={{ fontSize: 14 }}>{label}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007bff',
  },
  light: {
    // backgroundColor: '#ffffff',
  },
  dark: {
    // backgroundColor: '#333333',
  },
  label: {
    fontSize: 16,
  },
  labelLight: {
    color: '#000000',
  },
  labelDark: {
    color: '#ffffff',
  },
});

export default ThemedCheckbox;
