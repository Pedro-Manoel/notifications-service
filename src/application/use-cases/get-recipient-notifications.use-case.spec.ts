import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.use-case';

describe('Get recipient notifications use case', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationsUseCase =
      new GetRecipientNotificationsUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '321' }),
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
