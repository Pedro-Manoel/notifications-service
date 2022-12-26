import { randomUUID } from 'crypto';

import { makeTestNotification } from '@modules/notifications/domain/entities/tests/factories/test-notification-factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { NotificationNotFoundError } from '../errors/notification-not-found.error';
import { ReadNotificationUseCase } from '../read-notification.use-case';

describe('Read notification use case', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeTestNotification();

    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not ble able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );
    const uuid = randomUUID();

    expect(() => {
      return readNotificationUseCase.execute({ id: uuid });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
