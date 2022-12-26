import { ValueObject } from '@shared/models/value-object';

export class Content extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    const content = new Content(value);

    return content;
  }

  private validateContentLenght(content: string) {
    const isValid = content.length >= 5 && content.length <= 240;

    if (!isValid) {
      throw new Error('Content lenght error.');
    }
  }

  validate() {
    this.validateContentLenght(this.value);
  }
}
