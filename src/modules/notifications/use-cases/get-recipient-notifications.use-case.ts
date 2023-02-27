import { IUseCase } from '@core/domain/interfaces/use-case';
import { Injectable } from '@nestjs/common';

import { Notification } from '../domain/entities/notification';
import { NotificationsRepository } from '../domain/repositories/notifications.repository';

interface IGetRecipientNotificationsRequest {
  recipientId: string;
}

interface IGetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase
  implements
    IUseCase<
      IGetRecipientNotificationsRequest,
      IGetRecipientNotificationsResponse
    >
{
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: IGetRecipientNotificationsRequest,
  ): Promise<IGetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findAll({
      recipientId,
    });

    return { notifications };
  }
}
