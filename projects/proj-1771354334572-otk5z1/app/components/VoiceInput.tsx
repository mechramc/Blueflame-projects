import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SpeechRecognition from 'expo-speech-recognition';

interface VoiceInputProps {
  onThemeSelected: (theme: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onThemeSelected }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { granted } = await SpeechRecognition.requestPermissionsAsync();
      if (!granted) {
        console.warn('Microphone permissions are required for voice input.');
      }
    };
    checkPermissions();
  }, []);

  const startListening = async () => {
    setIsListening(true);
    try {
      const result = await SpeechRecognition.startAsync();
      if (result && result.transcripts && result.transcripts.length > 0) {
        const theme = result.transcripts[0];
        setTranscription(theme);
        onThemeSelected(theme);
      }
    } catch (error) {
      console.error('Error during voice recognition:', error);
    } finally {
      setIsListening(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Press the button and say a theme for your story!</Text>
      <Button title={isListening ? 'Listening...' : 'Start Voice Input'} onPress={startListening} disabled={isListening} />
      {transcription && <Text style={styles.transcription}>You said: {transcription}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 8,
  },
  transcription: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VoiceInput;