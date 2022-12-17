import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@application/use-cases/send-notification.use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification.use-case';
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notifications.use-case';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
