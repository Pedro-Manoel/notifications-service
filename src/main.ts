import { setSwagger } from '@infra/docs/swagger/setup/set-swagger';
import { setPipes } from '@infra/http/setup/set-pipes';
import { setKafka } from '@infra/messaging/kafka/setup/set-kafka';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalConfig } from './config/global/global.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalConfig = app.get(GlobalConfig);

  setSwagger(app);
  setKafka(app);
  setPipes(app);

  await app.startAllMicroservices();
  await app.listen(globalConfig.port);
}

bootstrap();
