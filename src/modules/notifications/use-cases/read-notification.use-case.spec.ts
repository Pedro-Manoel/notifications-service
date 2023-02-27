import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { NotificationNotFoundError } from './errors/notification-not-found.error';
import { ReadNotificationUseCase } from './read-notification.use-case';

describe('Read notification use case (Unit)', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let readNotificationUseCase: ReadNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to read a notification', async () => {
    const notification = TestNotificationFactory.makeNotification();

    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able to read a notification that has already been read', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const id = notification.id.value;

    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({ id });

    await readNotificationUseCase.execute({ id });

    expect(notificationsRepository.entities[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not ble able to read a non existing notification', async () => {
    const id = randomUUID();

    expect(() => {
      return readNotificationUseCase.execute({ id });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
