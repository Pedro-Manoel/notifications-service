import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications.repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification =
      this.notifications.find((item) => item.id === id) || null;

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (index >= 0) {
      this.notifications[index] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    ).length;

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );

    return notifications;
  }
}
