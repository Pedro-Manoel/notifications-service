import { randomUUID } from 'crypto';

import { makeTestNotification } from '@modules/notifications/domain/entities/factories/notification.factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { GetRecipientNotificationsUseCase } from '../get-recipient-notifications.use-case';

describe('Get recipient notifications use case', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

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

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: uuid1,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: { _value: uuid1 } }),
        expect.objectContaining({ recipientId: { _value: uuid1 } }),
      ]),
    );
  });
});
