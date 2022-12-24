import { MessagingModule } from '@infra/messaging/messaging.module';
import { DomainModule } from '@modules/domain.module';
import { Module } from '@nestjs/common';

import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, MessagingModule, DomainModule],
})
export class AppModule {}
