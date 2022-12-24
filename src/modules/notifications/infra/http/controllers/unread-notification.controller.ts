import { IController } from '@core/domain/interfaces/controller';
import { UnreadNotificationUseCase } from '@modules/notifications/use-cases/unread-notification.use-case';
import { Controller, Param, Patch } from '@nestjs/common';

@Controller('notifications/:id/unread')
export class UnreadNotificationController implements IController {
  constructor(private unreadNotificationUseCase: UnreadNotificationUseCase) {}

  @Patch()
  async handle(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ id });
  }
}
