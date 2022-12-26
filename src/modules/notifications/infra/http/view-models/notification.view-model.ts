import { Notification } from '@modules/notifications/domain/entities/notification';

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    const { id, content, category, recipientId, createdAt } = notification;

    return {
      id: id.value,
      content: content.value,
      category,
      recipientId: recipientId.value,
      createdAt,
    };
  }
}
