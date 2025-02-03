import React from 'react';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemedText } from './ThemedText';
import { Dimensions, useColorScheme, StyleSheet } from 'react-native';
import { useUser } from '@/lib/utils/useUser';
export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Hello';
  } else {
    return 'Good evening';
  }
};

const Header = () => {
  const theme = useColorScheme() ?? 'light';
  // alert(theme);
  const greeting = getGreeting();
  const { currentUser, loading, error } = useUser();

  return (
    <ThemedView
      style={[
        styles.headingContainer,
        {
          backgroundColor:
            theme === 'light'
              ? Colors.light.background
              : Colors.dark.background,
        },
        {
          borderBottomColor:
            theme === 'light' ? Colors.light.colorNavy : Colors.dark.borderDark,
        },
      ]}
    >
      <ThemedText type="default">
        {greeting}{' '}
        <ThemedText style={{ textTransform: 'capitalize' }}>
          {currentUser.name ?? 'Unknown'}
        </ThemedText>
      </ThemedText>

      <ThemedText
        style={[
          styles.icon,
          {
            borderColor:
              theme === 'light'
                ? Colors.light.colorNavy
                : Colors.dark.borderDark,
          },
        ]}
      >
        <Ionicons
          name={'notifications-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
      </ThemedText>
    </ThemedView>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: Dimensions.get('window').height,
  },
  headingContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
  },
});
