import { Entity } from '../entity';

class CustomEntity extends Entity<any> {}

describe('Entity', () => {
  it('should be able to create entity', () => {
    const entity = new CustomEntity({});

    expect(entity).toBeTruthy();
  });

  it('should be able to create entity with createdAt if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.createdAt).toEqual(expect.any(Date));
  });

  it('should be able to create entity with createdAt if provided', () => {
    const date = new Date();
    const entity = new CustomEntity({ createdAt: date });

    expect(entity.createdAt).toEqual(expect.any(Date));
    expect(entity.createdAt).toEqual(date);
  });

  it('should be able to create entity with updatedAt if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.updatedAt).toEqual(expect.any(Date));
  });

  it('should be able to create entity with updatedAt if provided', () => {
    const date = new Date();
    const entity = new CustomEntity({ updatedAt: date });

    expect(entity.updatedAt).toEqual(expect.any(Date));
    expect(entity.updatedAt).toEqual(date);
  });
});
