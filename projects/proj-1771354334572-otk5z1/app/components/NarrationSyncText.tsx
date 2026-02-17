import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

interface NarrationSyncTextProps {
  text: string;
  audioUri: string;
}

const NarrationSyncText: React.FC<NarrationSyncTextProps> = ({ text, audioUri }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  useEffect(() => {
    if (!sound) return;

    const syncTextWithAudio = async () => {
      const status = await sound.getStatusAsync();
      if (!status.isLoaded) return;

      const words = text.split(' ');
      const wordDurations = status.durationMillis / words.length;

      sound.setOnPlaybackStatusUpdate((playbackStatus) => {
        if (!playbackStatus.isLoaded || !playbackStatus.isPlaying) return;

        const currentWordIndex = Math.floor(playbackStatus.positionMillis / wordDurations);
        setHighlightedIndex(currentWordIndex);
      });
    };

    syncTextWithAudio();
  }, [sound, text]);

  const renderText = () => {
    return text.split(' ').map((word, index) => (
      <Text
        key={index}
        style={index === highlightedIndex ? styles.highlightedWord : styles.word}
      >
        {word}{' '}
      </Text>
    ));
  };

  const playAudio = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  return (
    <View style={styles.container} onTouchStart={playAudio}>
      <Text style={styles.instruction}>Tap anywhere to play narration</Text>
      <View style={styles.textContainer}>{renderText()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  instruction: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    fontSize: 18,
    color: '#000',
  },
  highlightedWord: {
    fontSize: 18,
    color: '#ff6347',
    fontWeight: 'bold',
  },
});

export default NarrationSyncText;