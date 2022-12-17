import { CountRecipientNotificationsUseCase } from './count-recipient-notifications.use-case';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notifications use case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationsUseCase =
      new CountRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '321' }),
    );

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId: '123',
    });

    expect(count).toEqual(2);
  });
});
