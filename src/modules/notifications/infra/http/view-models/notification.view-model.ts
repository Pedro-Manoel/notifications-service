import { Notification } from '@modules/notifications/domain/entities/notification';

import { NotificationDTO } from '../dtos/notification.dto';

export class NotificationViewModel {
  static toHTTP(notification: Notification): NotificationDTO {
    const {
      id,
      content,
      category,
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    } = notification;

    return {
      id: id.value,
      content: content.value,
      category: category.value,
      recipientId: recipientId.value,
      readAt,
      canceledAt,
      createdAt,
    };
  }
}
