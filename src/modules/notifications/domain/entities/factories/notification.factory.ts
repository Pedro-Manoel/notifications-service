import { Id } from '@core/domain/entities/id';
import { Override } from '@shared/types/override';

import { Content } from '../content';
import { Notification } from '../notification';

interface INotificationFactory {
  id?: string;
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export function makeNotification({
  id,
  recipientId,
  content,
  ...props
}: INotificationFactory): Notification {
  return Notification.create({
    id: Id.create(id),
    recipientId: Id.create(recipientId),
    content: Content.create(content),
    ...props,
  });
}

export function makeTestNotification({
  id,
  recipientId,
  content,
  category,
  ...props
}: Override<INotificationFactory> = {}) {
  return makeNotification({
    id,
    recipientId: recipientId || 'bc776b77-6526-4031-b86a-34e26ee57d26',
    content: content || 'test_123',
    category: category || 'social',
    ...props,
  });
}
