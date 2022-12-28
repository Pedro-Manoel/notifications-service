import { IController } from '@core/domain/interfaces/controller';
import { UnreadNotificationUseCase } from '@modules/notifications/use-cases/unread-notification.use-case';
import { Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('notifications/:id/unread')
export class UnreadNotificationController implements IController {
  constructor(private unreadNotificationUseCase: UnreadNotificationUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Unread a notification' })
  async handle(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ id });
  }
}
