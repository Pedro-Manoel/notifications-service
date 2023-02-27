import { Id } from '@core/domain/entities/id';

import { Category } from '../category';
import { Content } from '../content';
import { Notification } from '../notification';

export interface INotificationFactory {
  id?: string;
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class NotificationFactory {
  static makeNotification({
    id,
    recipientId,
    content,
    category,
    ...props
  }: INotificationFactory): Notification {
    return Notification.create({
      id: Id.create(id),
      recipientId: Id.create(recipientId),
      content: Content.create(content),
      category: Category.of(category),
      ...props,
    });
  }
}
