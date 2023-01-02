import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('Notifications microservice API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
}
