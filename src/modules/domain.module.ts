import { NotificationsModule } from '@modules/notifications/notifications.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'notifications',
        module: NotificationsModule,
      },
    ]),
  ],
})
export class DomainModule {}
