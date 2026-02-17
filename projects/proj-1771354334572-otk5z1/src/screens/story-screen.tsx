import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimationViewer from '../components/3d-animation-viewer';

const StoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AnimationViewer modelPath="assets/animations/character_animations.glb" />
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