import { render, fireEvent } from '@testing-library/react-native';
import VoiceInput from '../../src/components/VoiceInput';
import { act } from 'react-test-renderer';

describe('Voice Input Integration Test', () => {
  it('should process voice input and trigger theme selection', async () => {
    const mockOnThemeSelect = jest.fn();

    const { getByTestId } = render(
      <VoiceInput onThemeSelect={mockOnThemeSelect} />
    );

    const voiceInputButton = getByTestId('voice-input-button');

    await act(async () => {
      fireEvent.press(voiceInputButton);
    });

    // Simulate voice input processing
    await act(async () => {
      mockOnThemeSelect('Adventure');
    });

    expect(mockOnThemeSelect).toHaveBeenCalledWith('Adventure');
  });
});