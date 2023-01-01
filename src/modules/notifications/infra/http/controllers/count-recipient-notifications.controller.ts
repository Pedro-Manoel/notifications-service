import { IController } from '@core/domain/interfaces/controller';
import { CountRecipientNotificationsUseCase } from '@modules/notifications/use-cases/count-recipient-notifications.use-case';
import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ToType } from '@shared/types/to-type';

import { CountNotificationsDTO } from '../dtos/count-notifications.dto';

@Controller('/count/from/:recipientId')
export class CountRecipientNotificationsController implements IController {
  constructor(
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Count notifications from a recipient' })
  @ApiOkResponse({ type: CountNotificationsDTO })
  async handle(
    @Param('recipientId') recipientId: string,
  ): Promise<ToType<CountNotificationsDTO>> {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }
}
