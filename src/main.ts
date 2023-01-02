import { setSwagger } from '@infra/docs/swagger/setup/set-swagger';
import { setKafka } from '@infra/messaging/kafka/setup/set-kafka';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalConfig } from './config/global/global.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalConfig = app.get(GlobalConfig);

  setSwagger(app);
  setKafka(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(globalConfig.port);
}

bootstrap();
