/**
 * @jest-environment ./test/e2e/environments/jest-e2e-environment.ts
 */

import request from 'supertest';

import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';
import { makeAppE2e } from '@test/e2e/factories/app-e2e.factory';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

describe('Send notification controller (E2E)', () => {
  const URL = '/notifications';
  let app: INestApplication;
  let server: request.SuperTest<request.Test>;

  beforeAll(async () => {
    app = await makeAppE2e();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to send a notification', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const response = await server.post(URL).send({
      recipientId: notification.recipientId.value,
      content: notification.content.value,
      category: notification.category.value,
    });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body.recipientId).toBe(notification.recipientId.value);
    expect(response.body.content).toBe(notification.content.value);
    expect(response.body.category).toBe(notification.category.value);
  });
});
