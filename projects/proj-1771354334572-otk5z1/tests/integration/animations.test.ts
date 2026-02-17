import { render } from '@testing-library/react-native';
import StoryAnimation from '../../src/components/StoryAnimation';

describe('Animations Integration Test', () => {
  it('should render stylized 3D animations for characters and environments', () => {
    const { getByTestId } = render(<StoryAnimation />);

    const characterAnimation = getByTestId('character-animation');
    const environmentAnimation = getByTestId('environment-animation');

    expect(characterAnimation).toBeTruthy();
    expect(environmentAnimation).toBeTruthy();
  });
});