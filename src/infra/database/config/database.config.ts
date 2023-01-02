import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

interface IDatabaseConfig {
  url: string;
}

@Injectable()
export class DatabaseConfig implements IDatabaseConfig {
  private readonly names = Object.freeze({
    url: 'DATABASE_URL',
  });

  private readonly _url?: string;

  constructor(configService: ConfigService) {
    this._url = configService.get<string>(this.names.url);
  }

  get url(): string {
    if (!this._url) {
      throw new Error(`${this.names.url} not found`);
    }

    return this._url;
  }
}
