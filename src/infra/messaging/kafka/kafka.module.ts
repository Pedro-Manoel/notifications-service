import { NotificationsModule } from '@modules/notifications/notifications.module';
import { Module } from '@nestjs/common';

import { KafkaSendNotificationController } from './controllers/kafka-send-notification.controller';
import { KafkaConsumerService } from './services/kafka-consumer.service';

@Module({
  imports: [NotificationsModule],
  controllers: [KafkaSendNotificationController],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
