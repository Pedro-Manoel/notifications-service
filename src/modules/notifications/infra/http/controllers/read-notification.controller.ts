import { IController } from '@core/domain/interfaces/controller';
import { ReadNotificationUseCase } from '@modules/notifications/use-cases/read-notification.use-case';
import { Controller, Param, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/:id/read')
export class ReadNotificationController implements IController {
  constructor(private readNotificationUseCase: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Read a notification' })
  async handle(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ id });
  }
}
