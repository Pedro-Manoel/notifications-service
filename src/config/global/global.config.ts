import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

interface IGlobalConfig {
  port: number;
  mode: string;
}

@Injectable()
export class GlobalConfig implements IGlobalConfig {
  private readonly names = Object.freeze({
    port: 'PORT',
    mode: 'NODE_ENV',
  });

  private readonly _port?: number;
  private readonly _mode?: string;

  constructor(configService: ConfigService) {
    this._port = configService.get<number>(this.names.port);
    this._mode = configService.get<string>(this.names.mode);
  }

  get port(): number {
    if (!this._port) {
      throw new Error(`${this.names.port} not found`);
    }

    return this._port;
  }

  get mode(): string {
    if (!this._mode) {
      throw new Error(`${this.names.mode} not found`);
    }

    return this._mode;
  }

  isDevMode(): boolean {
    return this.mode === 'development';
  }

  isProdMode(): boolean {
    return this.mode === 'production';
  }
}
