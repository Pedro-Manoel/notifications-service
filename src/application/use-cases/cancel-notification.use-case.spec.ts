import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { makeNotification } from '@test/factories/notification-factory';

describe('Calcel notification use case', () => {
  it('should be able to calcel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not ble able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return cancelNotification.execute({ id: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
