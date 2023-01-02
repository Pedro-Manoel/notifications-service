import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

import { KafkaConfig } from '../config/kafka.config';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor(kafkaConfig: KafkaConfig) {
    super({
      client: {
        clientId: kafkaConfig.consumerClientId,
        brokers: kafkaConfig.brokers,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
