import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationRequest {
  id: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
