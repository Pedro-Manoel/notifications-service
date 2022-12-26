import { randomUUID } from 'node:crypto';

import { ValueObject } from '@shared/models/value-object';

export class Id extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value?: string): Id {
    const id = value ? new Id(value) : new Id(randomUUID());

    return id;
  }

  private validateUUIDFormat(id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    const isValid = uuidRegex.test(id);

    if (!isValid) {
      throw new Error('UUID format error');
    }
  }

  validate() {
    this.validateUUIDFormat(this.value);
  }
}
