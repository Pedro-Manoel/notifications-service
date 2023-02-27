import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

import { DatabaseConfig } from '../../config/database.config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(databaseConfig: DatabaseConfig) {
    super({
      datasources: {
        db: {
          url: databaseConfig.url,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async cleanDatabase() {
    const models = Prisma.dmmf.datamodel.models.map((model) => model.name);

    return Promise.all(
      models.map((model) => this[model.toLowerCase()].deleteMany({})),
    );
  }
}
