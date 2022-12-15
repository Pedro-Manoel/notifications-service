export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLenghValid = this.validateContentLenght(content);

    if (!isContentLenghValid) {
      throw new Error('Content lenght error.');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
