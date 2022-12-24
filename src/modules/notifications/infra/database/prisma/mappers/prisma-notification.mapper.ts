import { Content } from '@modules/notifications/domain/entities/content';
import { Notification } from '@modules/notifications/domain/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';

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

    return Notification.create({
      id,
      category,
      content: Content.create(content),
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    });
  }

  static toPersistence(notification: Notification) {
    const { id, content, category, recipientId, readAt, createdAt } =
      notification;

    return {
      id,
      category,
      content: content.value,
      recipientId,
      readAt,
      createdAt,
    };
  }
}
