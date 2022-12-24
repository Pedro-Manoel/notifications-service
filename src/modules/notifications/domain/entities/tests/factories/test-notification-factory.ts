import { Override } from '@shared/types/override';

import { Notification } from '../../notification';
import { makeTestContent } from './test-content.factory';

export function makeTestNotification(override: Override<Notification> = {}) {
  return Notification.create({
    content: makeTestContent(),
    category: 'social',
    recipientId: '123',
    ...override,
  });
}
