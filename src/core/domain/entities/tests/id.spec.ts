import { randomUUID } from 'crypto';

import { Id } from '../id';

describe('Id', () => {
  it('should be able to create id', () => {
    const id = Id.create();

    expect(id).toBeTruthy();
  });

  it('should be able to create id if value provided', () => {
    const id = Id.create(randomUUID());

    expect(id).toBeTruthy();
  });

  it('should not be able to create id if value is not of uuid format', () => {
    expect(() => {
      Id.create('test');
    }).toThrow();
  });
});
