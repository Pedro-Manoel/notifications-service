import { NotFoundException } from '@nestjs/common';

export class NotificationNotFoundError extends NotFoundException {
  constructor() {
    super('Notification not found');
  }
}
