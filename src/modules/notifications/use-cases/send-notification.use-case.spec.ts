import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { SendNotificationUseCase } from './send-notification.use-case';

describe('Send notification use case (Unit)', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );

    const notification = TestNotificationFactory.makeNotification();

    const { notification: notificationCreated } =
      await sendNotificationUseCase.execute({
        recipientId: notification.recipientId.value,
        content: notification.content.value,
        category: notification.category.value,
      });

    expect(notificationsRepository.entities).toHaveLength(1);
    expect(notificationsRepository.entities[0]).toEqual(notificationCreated);
  });
});
