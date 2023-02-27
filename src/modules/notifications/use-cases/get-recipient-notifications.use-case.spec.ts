import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.use-case';

describe('Get recipient notifications use case (Unit)', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to get recipient notifications', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const recipientId = notification.recipientId.value;

    await notificationsRepository.create(notification);

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(1);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: { value: recipientId } }),
      ]),
    );
  });

  it('should be able to return empty array if there is no notification from recipient', async () => {
    const recipientId = randomUUID();

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(0);
    expect(notifications).toEqual([]);
  });

  it('should be able to get all notifications from the respective recipient', async () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();

    await notificationsRepository.create(
      TestNotificationFactory.makeNotification({ recipientId: uuid1 }),
    );

    await notificationsRepository.create(
      TestNotificationFactory.makeNotification({ recipientId: uuid2 }),
    );

    await notificationsRepository.create(
      TestNotificationFactory.makeNotification({ recipientId: uuid2 }),
    );

    const { notifications: notifications1 } =
      await getRecipientNotificationsUseCase.execute({
        recipientId: uuid1,
      });

    const { notifications: notifications2 } =
      await getRecipientNotificationsUseCase.execute({
        recipientId: uuid2,
      });

    const { notifications: notifications3 } =
      await getRecipientNotificationsUseCase.execute({
        recipientId: uuid3,
      });

    expect(notifications1).toHaveLength(1);
    expect(notifications1).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: { value: uuid1 } }),
      ]),
    );
    expect(notifications2).toHaveLength(2);
    expect(notifications2).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: { value: uuid2 } }),
        expect.objectContaining({ recipientId: { value: uuid2 } }),
      ]),
    );
    expect(notifications3).toHaveLength(0);
    expect(notifications3).toEqual([]);
  });
});
