import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from './read-notification.use-case';

describe('Read notification use case', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not ble able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotification.execute({ id: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
