import { render, fireEvent } from '@testing-library/react-native';
import StoryNavigation from '../../src/components/StoryNavigation';

describe('Navigation Integration Test', () => {
  it('should navigate between story pages using buttons', () => {
    const mockOnNavigate = jest.fn();

    const { getByTestId } = render(
      <StoryNavigation onNavigate={mockOnNavigate} />
    );

    const nextButton = getByTestId('next-button');
    const prevButton = getByTestId('prev-button');

    fireEvent.press(nextButton);
    expect(mockOnNavigate).toHaveBeenCalledWith('next');

    fireEvent.press(prevButton);
    expect(mockOnNavigate).toHaveBeenCalledWith('prev');
  });
});