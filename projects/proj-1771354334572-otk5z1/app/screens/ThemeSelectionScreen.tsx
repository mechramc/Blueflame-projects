import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VoiceInput from '../components/VoiceInput';

const ThemeSelectionScreen: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeSelected = (theme: string) => {
    setSelectedTheme(theme);
    console.log('Selected theme:', theme);
    // Navigate to the next screen or perform other actions with the selected theme
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Theme</Text>
      <VoiceInput onThemeSelected={handleThemeSelected} />
      {selectedTheme && <Text style={styles.selectedTheme}>Selected Theme: {selectedTheme}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedTheme: {
    marginTop: 16,
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default ThemeSelectionScreen;