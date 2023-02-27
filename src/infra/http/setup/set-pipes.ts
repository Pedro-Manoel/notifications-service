import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setPipes(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
}
