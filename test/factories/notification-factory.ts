import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';

type Override = Partial<Notification>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Welcome to the system!'),
    category: 'social',
    recipientId: '123',
    ...override,
  });
}
