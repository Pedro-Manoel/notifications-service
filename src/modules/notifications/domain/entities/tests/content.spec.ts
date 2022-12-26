import { Content } from '../content';

describe('Content', () => {
  it('should be able to create a content', () => {
    const content = Content.create('test_123');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a content with less than 5 characters', () => {
    expect(() => Content.create('aaa')).toThrow();
  });

  it('should not be able to create a content with more than 240 characters', () => {
    expect(() => Content.create('a'.repeat(241))).toThrow();
  });
});
