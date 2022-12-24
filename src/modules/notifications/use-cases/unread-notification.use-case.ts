import { IUseCase } from '@core/domain/interfaces/use-case';
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../domain/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface IUnreadNotificationRequest {
  id: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotificationUseCase
  implements IUseCase<IUnreadNotificationRequest, UnreadNotificationResponse>
{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: IUnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
