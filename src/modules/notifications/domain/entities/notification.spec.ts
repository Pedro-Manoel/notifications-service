import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = TestNotificationFactory.makeNotification();
    expect(notification).toBeTruthy();
  });

  it('should be able to read a notification', () => {
    const notification = TestNotificationFactory.makeNotification();

    notification.read();

    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to unread a notification', () => {
    const notification = TestNotificationFactory.makeNotification();

    notification.read();
    notification.unread();

    expect(notification.readAt).toBeNull();
  });

  it('should be able to cancel a notification', () => {
    const notification = TestNotificationFactory.makeNotification();

    notification.cancel();

    expect(notification.canceledAt).toEqual(expect.any(Date));
  });
});
