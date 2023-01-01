import { IController } from '@core/domain/interfaces/controller';
import { NotificationViewModel } from '@modules/notifications/infra/http/view-models/notification.view-model';
import { GetRecipientNotificationsUseCase } from '@modules/notifications/use-cases/get-recipient-notifications.use-case';
import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ToType } from '@shared/types/to-type';

import { NotificationDTO } from '../dtos/notification.dto';

@Controller('/from/:recipientId')
export class GetRecipientNotificationsController implements IController {
  constructor(
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get notifications from a recipient' })
  @ApiOkResponse({ type: NotificationDTO, isArray: true })
  async handle(
    @Param('recipientId') recipientId: string,
  ): Promise<ToType<NotificationDTO>[]> {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return notifications.map(NotificationViewModel.toHTTP);
  }
}
