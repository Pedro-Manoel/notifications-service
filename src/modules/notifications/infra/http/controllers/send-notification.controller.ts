import { IController } from '@core/domain/interfaces/controller';
import { SendNotificationUseCase } from '@modules/notifications/use-cases/send-notification.use-case';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications')
export class SendNotificationController implements IController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async handle(@Body() body: CreateNotificationDTO) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
