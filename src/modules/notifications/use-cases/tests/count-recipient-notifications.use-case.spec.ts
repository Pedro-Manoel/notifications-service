import { randomUUID } from 'crypto';

import { makeTestNotification } from '@modules/notifications/domain/entities/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { CountRecipientNotificationsUseCase } from '../count-recipient-notifications.use-case';

describe('Count recipient notifications use case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    const uuid1 = randomUUID();
    const uuid2 = randomUUID();

    await notificationsRepository.create(
      makeTestNotification({ recipientId: uuid1 }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: uuid1 }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: uuid2 }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: uuid1,
    });

    expect(count).toEqual(2);
  });
});
