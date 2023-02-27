/**
 * @jest-environment ./test/e2e/environments/jest-e2e-environment.ts
 */

import { randomUUID } from 'crypto';
import request from 'supertest';

import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';
import { makeAppE2e } from '@test/e2e/factories/app-e2e.factory';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

describe('Unread notification controller (E2E)', () => {
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

  it('should be able to unread a notification', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const responseSendNotification = await server.post(URL).send({
      recipientId: notification.recipientId.value,
      content: notification.content.value,
      category: notification.category.value,
    });

    await server.patch(`${URL}/${responseSendNotification.body.id}/read`);

    const response = await server.patch(
      `${URL}/${responseSendNotification.body.id}/unread`,
    );

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('should be able to unread a notification that has already been unread', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const responseSendNotification = await server.post(URL).send({
      recipientId: notification.recipientId.value,
      content: notification.content.value,
      category: notification.category.value,
    });

    const id = responseSendNotification.body.id;

    await server.patch(`${URL}/${id}/read`);

    await server.patch(`${URL}/${id}/unread`);

    const response = await server.patch(`${URL}/${id}/unread`);

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('should should be able to unread a notification that has not been read', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const responseSendNotification = await server.post(URL).send({
      recipientId: notification.recipientId.value,
      content: notification.content.value,
      category: notification.category.value,
    });

    const response = await server.patch(
      `${URL}/${responseSendNotification.body.id}/unread`,
    );

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not ble able to unread a non existing notification', async () => {
    const uuid = randomUUID();

    const response = await server.patch(`${URL}/${uuid}/unread`);

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
