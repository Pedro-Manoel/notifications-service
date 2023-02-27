import { ValueObject } from './value-object';

export abstract class EnumValueObject<T> extends ValueObject<T> {
  protected static get ALL(): any[] {
    return Reflect.ownKeys(this)
      .map((key) => this[key])
      .filter((enumValue) => enumValue instanceof this);
  }

  static get enum(): any {
    return this.ALL.reduce((acc, enumValue) => {
      acc[enumValue.value] = enumValue.value;
      return acc;
    }, {});
  }

  static of(value: any, errorMsg?: string): any {
    const enumValue = this.ALL.find((item) => item.value === value);

    if (!enumValue) {
      throw new Error(errorMsg || 'Error enum value');
    }

    return enumValue;
  }

  validate(): void {
    return void 0;
  }
}
