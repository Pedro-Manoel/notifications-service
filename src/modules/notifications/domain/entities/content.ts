import { ValueObject } from '@shared/models/value-object';

export class Content extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    const content = new Content(value);

    return content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  validate() {
    const isContentLenghValid = this.validateContentLenght(this.value);

    if (!isContentLenghValid) {
      throw new Error('Content lenght error.');
    }
  }
}
