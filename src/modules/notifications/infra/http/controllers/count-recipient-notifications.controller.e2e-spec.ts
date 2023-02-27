/**
 * @jest-environment ./test/e2e/environments/jest-e2e-environment.ts
 */

import { randomUUID } from 'crypto';
import request from 'supertest';

import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces';
import { makeAppE2e } from '@test/e2e/factories/app-e2e.factory';
import { TestNotificationFactory } from '@test/modules/notifications/factories/test-notification.factory';

describe('Count recicipient notification controller (E2E)', () => {
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

  it('should be able to count recipient notifications', async () => {
    const notification = TestNotificationFactory.makeNotification();

    const recipientId = notification.recipientId.value;

    await server.post(URL).send({
      recipientId,
      content: notification.content.value,
      category: notification.category.value,
    });

    const response = await server.get(`${URL}/count/from/${recipientId}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.count).toBe(1);
  });

  it('should be able to return 0 when counting recipient notifications without notifications', async () => {
    const recipientId = randomUUID();

    const response = await server.get(`${URL}/count/from/${recipientId}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.count).toBe(0);
  });

  it('should be able to count the notifications according to the recipient', async () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();

    const notification1 = TestNotificationFactory.makeNotification({
      recipientId: uuid1,
    });
    const notification2 = TestNotificationFactory.makeNotification({
      recipientId: uuid2,
    });

    await server.post(URL).send({
      recipientId: uuid1,
      content: notification1.content.value,
      category: notification1.category.value,
    });

    await server.post(URL).send({
      recipientId: uuid2,
      content: notification2.content.value,
      category: notification2.category.value,
    });

    await server.post(URL).send({
      recipientId: uuid2,
      content: notification2.content.value,
      category: notification2.category.value,
    });

    const response1 = await server.get(`${URL}/count/from/${uuid1}`);

    const response2 = await server.get(`${URL}/count/from/${uuid2}`);

    const response3 = await server.get(`${URL}/count/from/${uuid3}`);

    expect(response1.statusCode).toBe(HttpStatus.OK);
    expect(response1.body.count).toBe(1);
    expect(response2.statusCode).toBe(HttpStatus.OK);
    expect(response2.body.count).toBe(2);
    expect(response3.statusCode).toBe(HttpStatus.OK);
    expect(response3.body.count).toBe(0);
  });
});
