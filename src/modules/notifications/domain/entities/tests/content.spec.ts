import { makeTestContent } from './factories/test-content.factory';

describe('Content', () => {
  it('should be able to create a content', () => {
    const content = makeTestContent;

    expect(content).toBeTruthy();
  });

  it('should not be able to create a content with less than 5 characters', () => {
    expect(() => makeTestContent('aaa')).toThrow();
  });

  it('should not be able to create a content with more than 240 characters', () => {
    expect(() => makeTestContent('a'.repeat(241))).toThrow();
  });
});
