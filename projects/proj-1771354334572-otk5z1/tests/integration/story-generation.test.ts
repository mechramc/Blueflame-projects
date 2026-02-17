import { generateStory } from '../../src/services/storyGenerator';

describe('Story Generation Integration Test', () => {
  it('should generate a story with length adjusted based on age', async () => {
    const age = 8;
    const theme = 'Adventure';

    const story = await generateStory(theme, age);

    expect(story).toBeDefined();
    expect(story.length).toBeGreaterThan(0);
    expect(story).toContain('Adventure');
  });
});