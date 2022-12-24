import { NotificationsModule } from '@modules/notifications/notifications.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [NotificationsModule],
})
export class DomainModule {}
