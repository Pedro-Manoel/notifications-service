import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotificationUseCase } from './unread-notification.use-case';

describe('Unread notification use case', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not ble able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return unreadNotification.execute({ id: 'fake-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
