import { Entity, PropsConstructor } from '@core/domain/entities/entity';
import { Id } from '@core/domain/entities/id';

import { Content } from './content';

interface INotificationProps {
  recipientId: Id;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
}

export class Notification extends Entity<INotificationProps> {
  private constructor(props: PropsConstructor<INotificationProps>) {
    super(props);
  }

  public static create(
    props: PropsConstructor<INotificationProps>,
  ): Notification {
    const notification = new Notification(props);

    return notification;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get content() {
    return this.props.content;
  }

  get category() {
    return this.props.category;
  }

  get readAt() {
    return this.props.readAt;
  }

  get canceledAt() {
    return this.props.canceledAt;
  }

  cancel() {
    this.props.canceledAt = new Date();
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }
}
