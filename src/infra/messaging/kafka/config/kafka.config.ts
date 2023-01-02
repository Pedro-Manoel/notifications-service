import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

interface IKafkaConfig {
  brokers: string[];
  consumerClientId: string;
}

@Injectable()
export class KafkaConfig implements IKafkaConfig {
  private readonly names = Object.freeze({
    brokers: 'KAFKA_BROKERS',
    consumerClientId: 'KAFKA_CONSUMER_CLIENT_ID',
  });

  private readonly _brokers?: string;
  private readonly _consumerClientId?: string;

  constructor(configService: ConfigService) {
    this._brokers = configService.get<string>(this.names.brokers);
    this._consumerClientId = configService.get<string>(
      this.names.consumerClientId,
    );
  }

  get brokers(): string[] {
    if (!this._brokers) {
      throw new Error(`${this.names.brokers} not found`);
    }

    return JSON.parse(this._brokers);
  }

  get consumerClientId(): string {
    if (!this._consumerClientId) {
      throw new Error(`${this.names.consumerClientId} not found`);
    }

    return this._consumerClientId;
  }
}
