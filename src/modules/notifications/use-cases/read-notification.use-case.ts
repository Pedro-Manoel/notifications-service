import { IUseCase } from '@core/domain/interfaces/use-case';
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../domain/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface IReadNotificationRequest {
  id: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase
  implements IUseCase<IReadNotificationRequest, ReadNotificationResponse>
{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: IReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
