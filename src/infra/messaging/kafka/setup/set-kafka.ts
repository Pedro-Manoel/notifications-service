import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

import { KafkaConsumerService } from '../services/kafka-consumer.service';

export function setKafka(app: INestApplication): void {
  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });
}
