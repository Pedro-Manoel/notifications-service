import { makeTestNotification } from '@modules/notifications/domain/entities/tests/factories/test-notification-factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { CancelNotificationUseCase } from '../cancel-notification.use-case';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

describe('Calcel notification use case', () => {
  it('should be able to calcel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeTestNotification();

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not ble able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotificationUseCase.execute({ id: 'fake-id' });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
