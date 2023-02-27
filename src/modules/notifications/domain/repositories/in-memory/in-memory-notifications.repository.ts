import { InMemoryRepository } from '@core/domain/repositories/in-memory.repository';

import { Notification } from '../../entities/notification';
import {
  IFindAllFilters,
  NotificationsRepository,
} from '../notifications.repository';
import { ICountFilters } from './../notifications.repository';

export class InMemoryNotificationsRepository
  extends InMemoryRepository<Notification>
  implements NotificationsRepository
{
  async count({ recipientId }: ICountFilters): Promise<number> {
    const count = this.entities.filter((item) =>
      recipientId ? item.recipientId.equals(recipientId) : true,
    ).length;

    return count;
  }

  async findAll({ recipientId }: IFindAllFilters): Promise<Notification[]> {
    const notifications = this.entities.filter((item) =>
      recipientId ? item.recipientId.equals(recipientId) : true,
    );

    return notifications;
  }
}
