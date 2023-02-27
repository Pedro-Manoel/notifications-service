import { EnumValueObject } from '@shared/models/enum-value-object';

export class Category extends EnumValueObject<string> {
  static readonly ALERT = new Category('ALERT');
  static readonly NEWS = new Category('NEWS');
  static readonly UPDATE = new Category('UPDATE');
  static readonly REMINDER = new Category('REMINDER');
  static readonly CONFIRMATION = new Category('CONFIRMATION');

  static of(value: string): Category {
    return super.of(value, 'Invalid category');
  }
}
