export abstract class ValueObject<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.validate();
  }

  get value(): T {
    return this._value;
  }

  equals(obj: ValueObject<T> | T): boolean {
    if (obj === null || obj === undefined) {
      return false;
    } else if (obj instanceof ValueObject) {
      return obj.value === this.value;
    }

    return obj === this.value;
  }

  abstract validate(): void;
}
