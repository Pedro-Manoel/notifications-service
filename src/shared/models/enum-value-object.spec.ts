import { EnumValueObject } from './enum-value-object';

class TestEnumValueObject extends EnumValueObject<string> {
  static readonly TEST = new TestEnumValueObject('test');
  static readonly TEST2 = new TestEnumValueObject('test2');

  static of(value: string): TestEnumValueObject {
    return super.of(value, 'Invalid test value');
  }
}

describe('Enum value object', () => {
  it('should return the correct value', () => {
    const enumValueObject = TestEnumValueObject.TEST;

    expect(enumValueObject.value).toBe('test');
  });

  it('should return the correct value when using the of method passing a valid value', () => {
    const enumValueObject = TestEnumValueObject.of('test');

    expect(enumValueObject.value).toBe('test');
  });

  it('should throw an error when passing an incorrect value to the of method', () => {
    expect(() => TestEnumValueObject.of('test3')).toThrowError();
  });

  it('should return the correct enum', () => {
    expect(TestEnumValueObject.enum).toEqual({
      test: 'test',
      test2: 'test2',
    });
  });
});
