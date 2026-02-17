import { render, act } from '@testing-library/react-native';
import NarrationSync from '../../src/components/NarrationSync';

describe('Narration Synchronization Integration Test', () => {
  it('should sync narration with text highlighting', async () => {
    const { getByTestId } = render(<NarrationSync />);

    const narrationText = getByTestId('narration-text');

    await act(async () => {
      // Simulate narration progress
      narrationText.props.onNarrationProgress(0.5);
    });

    expect(narrationText.props.highlighted).toBe(true);
  });
});