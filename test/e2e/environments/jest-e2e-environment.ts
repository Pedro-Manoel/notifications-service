import { execSync } from 'child_process';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { Event } from 'jest-circus';
import NodeEnvironment from 'jest-environment-node';
import path from 'path';

import type {
  JestEnvironmentConfig,
  EnvironmentContext,
} from '@jest/environment';
import { ConfigService } from '@nestjs/config/dist';

import { PROJECT_ROOT_DIRECTORY } from '../../../src/config/global/constants';
import { DatabaseConfig } from '../../../src/infra/database/config/database.config';
import { PrismaService } from '../../../src/infra/database/prisma/services/prisma.service';

export let prismaE2eService: PrismaService;

class JestE2eEnvironment extends NodeEnvironment {
  private schemaName: string;
  private databaseURL: string;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.loadEnvironmentVariables();

    this.schemaName = this.generateSchemaName(context);
    this.databaseURL = `${process.env.DATABASE_URL}?schema=${this.schemaName}`;
  }

  private loadEnvironmentVariables() {
    const environmentFilePath = path.join(PROJECT_ROOT_DIRECTORY, '.env.test');
    dotenv.config({ path: environmentFilePath });
  }

  private generateSchemaName(context: EnvironmentContext): string {
    return crypto
      .createHash('shake256', { outputLength: 30 })
      .update(context.testPath)
      .digest('hex');
  }

  async setup() {
    process.env.DATABASE_URL = this.databaseURL;
    this.global.process.env.DATABASE_URL = this.databaseURL;

    prismaE2eService = new PrismaService(
      new DatabaseConfig(new ConfigService()),
    );

    await this.applySchemaToDatabase();
    await super.setup();
  }

  private async applySchemaToDatabase() {
    execSync(`npx prisma db push --skip-generate`);
  }

  async teardown() {
    await prismaE2eService.$queryRawUnsafe(
      `drop schema if exists "${this.schemaName}" cascade`,
    );
    await prismaE2eService.$disconnect();
    await super.teardown();
  }

  async handleTestEvent(event: Event) {
    if (event.name === 'test_done') {
      await this.afterEach();
    }
  }

  private async afterEach(): Promise<void> {
    await prismaE2eService.cleanDatabase();
  }
}

export default JestE2eEnvironment;
