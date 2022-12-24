import { makeTestNotification } from './factories/test-notification-factory';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = makeTestNotification();

    expect(notification).toBeTruthy();
  });
});
