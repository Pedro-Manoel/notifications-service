import { ValueObject } from '@shared/models/value-object';

export class Content extends ValueObject<string> {
  static readonly MIN_LENGTH = 5;
  static readonly MAX_LENGTH = 240;

  static create(value: string) {
    const content = new Content(value);

    return content;
  }

  private validateContentLenght(content: string) {
    const isValid =
      content.length >= Content.MIN_LENGTH &&
      content.length <= Content.MAX_LENGTH;

    if (!isValid) {
      throw new Error('Content lenght error');
    }
  }

  validate() {
    this.validateContentLenght(this.value);
  }
}
