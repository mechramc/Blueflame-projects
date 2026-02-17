import { Result, ok, err } from './result';

type StoryTheme = 'adventure' | 'fantasy' | 'mystery' | 'sci-fi';

type StoryRequest = {
  theme: StoryTheme;
  age: number;
};

type StoryResponse = {
  title: string;
  content: string;
};

/**
 * Generates an AI-powered story based on the provided theme and age.
 * Adjusts the story length based on the age of the child.
 */
export async function generateStory(request: StoryRequest): Promise<Result<StoryResponse, string>> {
  const { theme, age } = request;

  if (age < 3 || age > 12) {
    return err('Age must be between 3 and 12.');
  }

  try {
    // Simulate AI story generation logic
    const storyLength = calculateStoryLength(age);
    const storyContent = `This is a ${theme} story for a child aged ${age}. It is ${storyLength} words long.`;

    const response: StoryResponse = {
      title: `${capitalize(theme)} Adventure`,
      content: storyContent,
    };

    return ok(response);
  } catch (error) {
    return err('Failed to generate story.');
  }
}

/**
 * Calculates the story length based on the child's age.
 * Younger children get shorter stories, while older children get longer ones.
 */
function calculateStoryLength(age: number): number {
  if (age >= 3 && age <= 5) return 100; // Short story for younger children
  if (age >= 6 && age <= 8) return 200; // Medium-length story
  if (age >= 9 && age <= 12) return 300; // Longer story for older children

  return 150; // Default length
}

/**
 * Capitalizes the first letter of a string.
 */
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
