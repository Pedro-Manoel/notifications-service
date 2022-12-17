import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationRequest {
  id: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
