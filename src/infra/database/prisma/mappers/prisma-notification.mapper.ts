import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
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

  static toDomain(raw: RawNotification): Notification {
    const {
      id,
      content,
      category,
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    } = raw;

    return new Notification(
      {
        category,
        content: new Content(content),
        recipientId,
        readAt,
        canceledAt,
        createdAt,
      },
      id,
    );
  }
}
