import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/send-notification.use-case';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification.use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications.use-case';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
