import {
  INotificationFactory,
  NotificationFactory,
} from '@modules/notifications/domain/entities/factories/notification.factory';
import { Override } from '@shared/types/override';

export class TestNotificationFactory {
  static readonly RECIPIENT_ID = 'bc776b77-6526-4031-b86a-34e26ee57d26';
  static readonly CONTENT = 'test_123';
  static readonly CATEGORY = 'ALERT';

  static makeNotification({
    id,
    recipientId,
    content,
    category,
    ...props
  }: Override<INotificationFactory> = {}) {
    return NotificationFactory.makeNotification({
      id,
      recipientId: recipientId || this.RECIPIENT_ID,
      content: content || this.CONTENT,
      category: category || this.CATEGORY,
      ...props,
    });
  }
}
