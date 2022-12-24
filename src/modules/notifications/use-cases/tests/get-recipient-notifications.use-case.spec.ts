import { makeTestNotification } from '@modules/notifications/domain/entities/tests/factories/test-notification-factory';
import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';

import { GetRecipientNotificationsUseCase } from '../get-recipient-notifications.use-case';

describe('Get recipient notifications use case', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeTestNotification({ recipientId: '321' }),
    );

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId: '123',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '123' }),
        expect.objectContaining({ recipientId: '123' }),
      ]),
    );
  });
});
