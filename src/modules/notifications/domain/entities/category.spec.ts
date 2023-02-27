import { Category } from './category';

describe('Category', () => {
  it('should be able to create a category', () => {
    const category = Category.ALERT;

    expect(category).toBeTruthy();
    expect(category.value).toBe('ALERT');
  });

  it('should be able to create a category when passing its value', () => {
    const category = Category.of('ALERT');

    expect(category).toBeTruthy();
    expect(category.value).toBe('ALERT');
  });

  it('should not be able to create a category when passing an invalid value', () => {
    expect(() => Category.of('aaa')).toThrowError('Invalid category');
  });
});
