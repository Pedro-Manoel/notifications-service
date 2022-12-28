import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { ApiTagsModule } from '@shared/infra/docs/swagger/decorators/api-tags-module.decorator';

import { NotificationsRepository } from './domain/repositories/notifications.repository';
import { PrismaNotificationsRepository } from './infra/database/prisma/repositories/prisma-notifications.repository';
import { CancelNotificationController } from './infra/http/controllers/cancel-notification.controller';
import { CountRecipientNotificationsController } from './infra/http/controllers/count-recipient-notifications.controller';
import { GetRecipientNotificationsController } from './infra/http/controllers/get-recipient-notifications.controller';
import { ReadNotificationController } from './infra/http/controllers/read-notification.controller';
import { SendNotificationController } from './infra/http/controllers/send-notification.controller';
import { UnreadNotificationController } from './infra/http/controllers/unread-notification.controller';
import { CancelNotificationUseCase } from './use-cases/cancel-notification.use-case';
import { CountRecipientNotificationsUseCase } from './use-cases/count-recipient-notifications.use-case';
import { GetRecipientNotificationsUseCase } from './use-cases/get-recipient-notifications.use-case';
import { ReadNotificationUseCase } from './use-cases/read-notification.use-case';
import { SendNotificationUseCase } from './use-cases/send-notification.use-case';
import { UnreadNotificationUseCase } from './use-cases/unread-notification.use-case';

@ApiTagsModule('notifications')
@Module({
  imports: [DatabaseModule],
  controllers: [
    CancelNotificationController,
    CountRecipientNotificationsController,
    GetRecipientNotificationsController,
    ReadNotificationController,
    SendNotificationController,
    UnreadNotificationController,
  ],
  providers: [
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    SendNotificationUseCase,
    UnreadNotificationUseCase,
  ],
  exports: [NotificationsRepository, SendNotificationUseCase],
})
export class NotificationsModule {}
