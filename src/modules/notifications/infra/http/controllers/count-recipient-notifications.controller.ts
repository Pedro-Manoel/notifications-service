import { IController } from '@core/domain/interfaces/controller';
import { CountRecipientNotificationsUseCase } from '@modules/notifications/use-cases/count-recipient-notifications.use-case';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('notifications/count/from/:recipientId')
export class CountRecipientNotificationsController implements IController {
  constructor(
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
  ) {}

  @Get()
  async handle(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }
}
