import Chore from '@/lib/utils/types/Chore';
import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { StyleSheet, TouchableOpacity } from 'react-native';
interface ICategoriesProps {
  sections: {
    title: string;
    data: Chore[];
  }[];
  onCategoryPress: (categoryId: number) => void;
}
const Categories: React.FC<ICategoriesProps> = ({
  sections,
  onCategoryPress,
}) => {
  return (
    <ThemedView>
      <ThemedText type="subtitle">All Categories</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        {sections.map((section: any) => {
          return (
            section.title && (
              <TouchableOpacity
                key={section.title}
                style={styles.sectionTitle}
                onPress={() => {
                  onCategoryPress(section.data[0].category.id);
                }}
              >
                <ThemedText>{section.title}</ThemedText>
              </TouchableOpacity>
            )
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
