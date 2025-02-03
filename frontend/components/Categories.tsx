import Chore from '@/lib/utils/types/Chore';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { StyleSheet } from 'react-native';
interface ICategoriesProps {
  sections: {
    title: string;
    data: Chore[];
  }[];
}
const Categories: React.FC<ICategoriesProps> = ({ sections }) => {
  return (
    <ThemedView>
      <ThemedText type="subtitle">All Categories</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        {sections.map((section: any) => {
          return (
            <ThemedView key={section.title} style={styles.sectionTitle}>
              <ThemedText>{section.title}</ThemedText>
            </ThemedView>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'pink',
    marginVertical: 10,
    borderRadius: 5,
  },
});
