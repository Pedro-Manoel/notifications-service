import { IController } from '@core/domain/interfaces/controller';
import { CountRecipientNotificationsUseCase } from '@modules/notifications/use-cases/count-recipient-notifications.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CountNotificationsDTO } from '../dtos/count-notifications.dto';

@Controller('notifications/count/from/:recipientId')
export class CountRecipientNotificationsController implements IController {
  constructor(
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Count notifications from a recipient' })
  @ApiResponse({ type: CountNotificationsDTO })
  async handle(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }
}
