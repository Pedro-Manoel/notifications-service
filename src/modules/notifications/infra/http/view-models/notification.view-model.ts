import { Notification } from '@modules/notifications/domain/entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    const { id, content, category, recipientId } = notification;

    return {
      id,
      content: content.value,
      category,
      recipientId,
    };
  }
}
