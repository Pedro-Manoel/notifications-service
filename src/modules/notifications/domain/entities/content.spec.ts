import { Content } from './content';

describe('Content', () => {
  it('should be able to create a content', () => {
    const content = Content.create('test_123');

    expect(content).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it(`should not be able to create a content with less than ${Content.MIN_LENGTH} characters`, () => {
    expect(() => Content.create('a'.repeat(Content.MIN_LENGTH - 1))).toThrow();
  });

  it(`should not be able to create a content with more than ${Content.MAX_LENGTH} characters`, () => {
    expect(() => Content.create('a'.repeat(Content.MAX_LENGTH + 1))).toThrow();
  });
});
