import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { UnreadNotificationUseCase } from './unread-notification.use-case';

describe('Unread notification use case (Unit)', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let unreadNotificationUseCase: UnreadNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to unread a notification', async () => {
    const notification = TestNotificationFactory.makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].readAt).toBeNull();
  });

  it('should be able to unread a notification that has already been unread', async () => {
    const notification = TestNotificationFactory.makeNotification({
      readAt: new Date(),
    });

    const id = notification.id.value;

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({ id });

    await unreadNotificationUseCase.execute({ id });

    expect(notificationsRepository.entities[0].readAt).toBeNull();
  });

  it('should should be able to unread a notification that has not been read', async () => {
    const notification = TestNotificationFactory.makeNotification();

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].readAt).toBeNull();
  });

  it('should not ble able to unread a non existing notification', async () => {
    const uuid = randomUUID();

    expect(() => {
      return unreadNotificationUseCase.execute({ id: uuid });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
