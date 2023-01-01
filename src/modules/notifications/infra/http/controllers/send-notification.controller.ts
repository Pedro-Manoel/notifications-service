import { IController } from '@core/domain/interfaces/controller';
import { SendNotificationUseCase } from '@modules/notifications/use-cases/send-notification.use-case';
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { ToType } from '@shared/types/to-type';

import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { NotificationDTO } from '../dtos/notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller()
export class SendNotificationController implements IController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a notification' })
  @ApiCreatedResponse({ type: NotificationDTO })
  async handle(
    @Body() body: CreateNotificationDTO,
  ): Promise<ToType<NotificationDTO>> {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return NotificationViewModel.toHTTP(notification);
  }
}
