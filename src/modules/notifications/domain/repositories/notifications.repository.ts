import { Notification } from '../entities/notification';

export interface IFindAllFilters {
  recipientId?: string;
}

export interface ICountFilters {
  recipientId?: string;
}

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract save(notification: Notification): Promise<void>;
  abstract findAll(filters: IFindAllFilters): Promise<Notification[]>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract count(filters: ICountFilters): Promise<number>;
}
