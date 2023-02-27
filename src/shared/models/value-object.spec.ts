import { ValueObject } from './value-object';

class TestValueObject extends ValueObject<any> {
  static create(value: any): TestValueObject {
    return new TestValueObject(value);
  }

  validate(): void {
    if (!this.value) {
      throw new Error('Value cannot be null');
    }
  }
}

describe('Value object', () => {
  it('should be able to create a value object', () => {
    expect(TestValueObject.create({})).toBeTruthy();
  });

  it('should not be able to create a value object if validation fails', () => {
    expect(() => TestValueObject.create(null)).toThrowError();
  });

  it('should return true if the object value equals the value of another object', () => {
    const value = 'test';

    const valueObject = TestValueObject.create(value);

    expect(valueObject.equals(value)).toBe(true);
  });

  it('should return true if the object equals the another object', () => {
    const value = 'test';

    const valueObject = TestValueObject.create(value);
    const valueObject2 = TestValueObject.create(value);

    expect(valueObject.equals(valueObject2)).toBe(true);
  });

  it('should return false if the object value not equals the value of another object', () => {
    const valueObject = TestValueObject.create('test');

    expect(valueObject.equals('aaaa')).toBe(false);
  });

  it('should return false if the object not equals the another object', () => {
    const valueObject = TestValueObject.create('test');
    const valueObject2 = TestValueObject.create('aaaa');

    expect(valueObject.equals(valueObject2)).toBe(false);
  });

  it('should return false if compared object is null or undefined', () => {
    const valueObject = TestValueObject.create('test');

    expect(valueObject.equals(null)).toBe(false);
    expect(valueObject.equals(undefined)).toBe(false);
  });
});
