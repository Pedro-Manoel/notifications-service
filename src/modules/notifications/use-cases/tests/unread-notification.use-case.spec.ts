import { randomUUID } from 'crypto';

import { makeTestNotification } from '@modules/notifications/domain/entities/tests/factories/test-notification-factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { NotificationNotFoundError } from '../errors/notification-not-found.error';
import { UnreadNotificationUseCase } from '../unread-notification.use-case';

describe('Unread notification use case', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeTestNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].readAt).toBeNull();
  });

  it('should not ble able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );
    const uuid = randomUUID();

    expect(() => {
      return unreadNotificationUseCase.execute({ id: uuid });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
