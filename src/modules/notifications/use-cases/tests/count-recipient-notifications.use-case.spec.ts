import { makeTestNotification } from '@modules/notifications/domain/entities/tests/factories/test-notification-factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { CountRecipientNotificationsUseCase } from '../count-recipient-notifications.use-case';

describe('Count recipient notifications use case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '321' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: '123',
    });

    expect(count).toEqual(2);
  });
});
