import { IsEnum, IsNotEmpty, IsUUID, Length } from 'class-validator';

import { Category } from '@modules/notifications/domain/entities/category';
import { Content } from '@modules/notifications/domain/entities/content';

export class CreateNotificationDTO {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(Content.MIN_LENGTH, Content.MAX_LENGTH)
  content: string;

  @IsNotEmpty()
  @IsEnum(Category.enum)
  category: string;
}
