import { Module } from '@nestjs/common';

import { DatabaseConfig } from './config/database.config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
  providers: [DatabaseConfig],
})
export class DatabaseModule {}
