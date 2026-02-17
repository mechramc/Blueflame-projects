import React from 'react';
import { View, StyleSheet } from 'react-native';
import NarrationSyncText from '../components/NarrationSyncText';

const StoryScreen: React.FC = () => {
  const sampleText = 'Once upon a time in a faraway land, there was a brave little fox.';
  const sampleAudioUri = 'https://example.com/sample-narration.mp3';

  return (
    <View style={styles.container}>
      <NarrationSyncText text={sampleText} audioUri={sampleAudioUri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default StoryScreen;