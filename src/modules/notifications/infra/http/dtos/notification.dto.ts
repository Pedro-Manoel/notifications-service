export class NotificationDTO {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}
