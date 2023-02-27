import { NotificationFactory } from '@modules/notifications/domain/entities/factories/notification.factory';
import { Notification } from '@modules/notifications/domain/entities/notification';
import {
  CategoryType,
  Notification as PrismaNotification,
} from '@prisma/client';

export class PrismaNotificationMapper {
  static toDomain(prismaNotification: PrismaNotification): Notification {
    const {
      id,
      content,
      category,
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    } = prismaNotification;

    return NotificationFactory.makeNotification({
      id,
      category,
      content,
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    });
  }

  static toPersistence(notification: Notification): PrismaNotification {
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
      category: category.value as CategoryType,
      content: content.value,
      recipientId: recipientId.value,
      readAt: readAt ? readAt : null,
      canceledAt: canceledAt ? canceledAt : null,
      createdAt,
    };
  }
}
