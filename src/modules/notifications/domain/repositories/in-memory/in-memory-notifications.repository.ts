import { InMemoryRepository } from '@core/domain/repositories/in-memory.repository';

import { Notification } from '../../entities/notification';
import { NotificationsRepository } from '../notifications.repository';

export class InMemoryNotificationsRepository
  extends InMemoryRepository<Notification>
  implements NotificationsRepository
{
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.entities.filter(
      (item) => item.recipientId === recipientId,
    ).length;

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.entities.filter(
      (item) => item.recipientId === recipientId,
    );

    return notifications;
  }
}
