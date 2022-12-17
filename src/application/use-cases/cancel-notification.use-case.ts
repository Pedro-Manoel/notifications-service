import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CancelNotificationRequest {
  id: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
