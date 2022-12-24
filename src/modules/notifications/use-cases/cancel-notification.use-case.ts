import { IUseCase } from '@core/domain/interfaces/use-case';
import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../domain/repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface ICancelNotificationRequest {
  id: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase
  implements IUseCase<ICancelNotificationRequest, CancelNotificationResponse>
{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ICancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
