import { PrismaService } from '@infra/database/prisma/services/prisma.service';
import { setPipes } from '@infra/http/setup/set-pipes';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import { prismaE2eService } from '../environments/jest-e2e-environment';

export async function makeAppE2e(): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prismaE2eService)
    .compile();

  const app = module.createNestApplication();

  setPipes(app);

  await app.init();

  return app;
}
