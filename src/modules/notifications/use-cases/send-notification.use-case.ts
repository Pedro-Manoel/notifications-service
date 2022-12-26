import { IUseCase } from '@core/domain/interfaces/use-case';
import { Injectable } from '@nestjs/common';

import { makeNotification } from '../domain/entities/factories/notification.factory';
import { Notification } from '../domain/entities/notification';
import { NotificationsRepository } from '../domain/repositories/notifications.repository';

interface ISendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase
  implements IUseCase<ISendNotificationRequest, ISendNotificationResponse>
{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = makeNotification({
      recipientId,
      content,
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
