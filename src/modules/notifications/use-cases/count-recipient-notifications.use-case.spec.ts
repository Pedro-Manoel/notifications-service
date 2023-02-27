import { randomUUID } from 'crypto';

import { InMemoryNotificationsRepository } from '@modules/notifications/domain/repositories/in-memory/in-memory-notifications.repository';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

import { CountRecipientNotificationsUseCase } from './count-recipient-notifications.use-case';

describe('Count recipient notifications use case (Unit)', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    countRecipientNotificationsUseCase = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to count recipient notifications', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const recipientId = notification.recipientId.value;

    await notificationsRepository.create(notification);

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(count).toEqual(1);
  });

  it('should be able to return 0 when counting recipient notifications without notifications', async () => {
    const recipientId = randomUUID();

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(count).toEqual(0);
  });

  it('should be able to count the notifications according to the recipient', async () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();

    const notification1 = TestNotificationFactory.makeNotification({
      recipientId: uuid1,
    });
    const notification2 = TestNotificationFactory.makeNotification({
      recipientId: uuid2,
    });

    await notificationsRepository.create(notification1);

    await notificationsRepository.create(notification2);

    await notificationsRepository.create(notification2);

    const { count: count1 } = await countRecipientNotificationsUseCase.execute({
      recipientId: uuid1,
    });

    const { count: count2 } = await countRecipientNotificationsUseCase.execute({
      recipientId: uuid2,
    });

    const { count: count3 } = await countRecipientNotificationsUseCase.execute({
      recipientId: uuid3,
    });

    expect(count1).toEqual(1);
    expect(count2).toEqual(2);
    expect(count3).toEqual(0);
  });
});
