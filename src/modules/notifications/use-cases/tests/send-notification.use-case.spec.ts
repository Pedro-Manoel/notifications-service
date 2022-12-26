import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { SendNotificationUseCase } from '../send-notification.use-case';

describe('Send notification use case', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );
    const uuid = randomUUID();

    const { notification } = await sendNotificationUseCase.execute({
      content: 'Welcome to the system!',
      category: 'social',
      recipientId: uuid,
    });

    expect(notificationsRepository.entities).toHaveLength(1);
    expect(notificationsRepository.entities[0]).toEqual(notification);
  });
});
