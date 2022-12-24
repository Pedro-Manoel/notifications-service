import { SendNotificationUseCase } from '@modules/notifications/use-cases/send-notification.use-case';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface ISendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class KafkaSendNotificationController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @EventPattern('notifications.send-notification')
  async handle(
    @Payload() { content, category, recipientId }: ISendNotificationPayload,
  ) {
    await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });
  }
}
