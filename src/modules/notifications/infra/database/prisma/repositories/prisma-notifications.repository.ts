import { PrismaService } from '@infra/database/prisma/services/prisma.service';
import { Notification } from '@modules/notifications/domain/entities/notification';
import {
  ICountFilters,
  IFindAllFilters,
  NotificationsRepository,
} from '@modules/notifications/domain/repositories/notifications.repository';
import { Injectable } from '@nestjs/common/decorators';

import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<Notification> {
    const raw = PrismaNotificationMapper.toPersistence(notification);

    const notificationCreated = await this.prisma.notification.create({
      data: raw,
    });

    return PrismaNotificationMapper.toDomain(notificationCreated);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findAll({ recipientId }: IFindAllFilters): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async count({ recipientId }: ICountFilters): Promise<number> {
    const count = this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }
}
