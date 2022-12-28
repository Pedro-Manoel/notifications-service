import { IController } from '@core/domain/interfaces/controller';
import { GetRecipientNotificationsUseCase } from '@modules/notifications/use-cases/get-recipient-notifications.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { NotificationDTO } from '../dtos/notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications/from/:recipientId')
export class GetRecipientNotificationsController implements IController {
  constructor(
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get notifications from a recipient' })
  @ApiResponse({ type: NotificationDTO, isArray: true })
  async handle(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return notifications.map(NotificationViewModel.toHTTP);
  }
}
