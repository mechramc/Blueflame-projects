import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavigationButtonProps {
  title: string;
  onPress: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50', // Green
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NavigationButton;
