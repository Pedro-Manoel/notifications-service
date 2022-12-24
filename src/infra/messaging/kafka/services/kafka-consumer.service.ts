import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

import { kafkaConfig } from '../config/kafka.config';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: kafkaConfig.brokers,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
