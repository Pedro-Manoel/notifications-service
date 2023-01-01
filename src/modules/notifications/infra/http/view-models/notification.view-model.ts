import { Notification } from '@modules/notifications/domain/entities/notification';

import { NotificationDTO } from '../dtos/notification.dto';

export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationDTO {
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
