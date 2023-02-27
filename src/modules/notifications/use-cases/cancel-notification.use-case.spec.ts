import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

describe('Calcel notification use case (Unit)', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let cancelNotificationUseCase: CancelNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to calcel a notification', async () => {
    const notification = TestNotificationFactory.makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({ id: notification.id.value });

    expect(notificationsRepository.entities[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be able to cancel a notification that has already been calcel', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const id = notification.id.value;

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({ id });

    await cancelNotificationUseCase.execute({ id });

    expect(notificationsRepository.entities[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const id = randomUUID();

    expect(() => {
      return cancelNotificationUseCase.execute({ id });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
