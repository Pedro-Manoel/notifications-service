import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationUseCase } from 'src/application/use-cases/send-notification.use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}
