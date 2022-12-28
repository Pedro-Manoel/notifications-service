import { IController } from '@core/domain/interfaces/controller';
import { CancelNotificationUseCase } from '@modules/notifications/use-cases/cancel-notification.use-case';
import { Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('notifications/:id/cancel')
export class CancelNotificationController implements IController {
  constructor(private cancelNotificationUseCase: CancelNotificationUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Cancel a notification' })
  async handle(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ id });
  }
}
