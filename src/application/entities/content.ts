export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Invalid content length.');
    }

    this.content = content;
  }
}
