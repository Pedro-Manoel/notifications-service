export abstract class ValueObject<T> {
  protected constructor(readonly value: T) {
    this.validate();
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
