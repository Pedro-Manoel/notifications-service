import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;
  private _id: string;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(value: string) {
    this.props.recipientId = value;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(value: Content) {
    this.props.content = value;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(value: string) {
    this.props.category = value;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
