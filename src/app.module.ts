import { GlobalConfig } from '@config/global/global.config';
import { DatabaseModule } from '@infra/database/database.module';
import { MessagingModule } from '@infra/messaging/messaging.module';
import { DomainModule } from '@modules/domain.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    MessagingModule,
    DomainModule,
  ],
  providers: [GlobalConfig],
})
export class AppModule {}
