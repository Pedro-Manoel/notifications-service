import { IController } from '@core/domain/interfaces/controller';
import { GetRecipientNotificationsUseCase } from '@modules/notifications/use-cases/get-recipient-notifications.use-case';
import { Controller, Get, Param } from '@nestjs/common';

import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications/from/:recipientId')
export class GetRecipientNotificationsController implements IController {
  constructor(
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Get()
  async handle(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }
}
