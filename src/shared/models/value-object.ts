export abstract class ValueObject<T> {
  private readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.validate();
  }

  get value(): T {
    return this._value;
  }

  abstract validate(): void;
}
