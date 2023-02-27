import { Entity } from './entity';
import { Id } from './id';

class TestEntity extends Entity<any> {}

describe('Entity', () => {
  it('should be able to create entity', () => {
    const entity = new TestEntity({});

    expect(entity).toBeTruthy();
  });

  it('should be able to create entity with id if not provided', () => {
    const entity = new TestEntity({});

    expect(entity.id).toEqual(expect.any(Id));
  });

  it('should be able to create entity with id if provided', () => {
    const id = Id.create();

    const entity = new TestEntity({ id });

    expect(entity.id).toEqual(expect.any(Id));
    expect(entity.id).toEqual(id);
  });

  it('should be able to create entity with createdAt if not provided', () => {
    const entity = new TestEntity({});

    expect(entity.createdAt).toEqual(expect.any(Date));
  });

  it('should be able to create entity with createdAt if provided', () => {
    const date = new Date();
    const entity = new TestEntity({ createdAt: date });

    expect(entity.createdAt).toEqual(expect.any(Date));
    expect(entity.createdAt).toEqual(date);
  });

  it('should be able to create entity with updatedAt if not provided', () => {
    const entity = new TestEntity({});

    expect(entity.updatedAt).toEqual(expect.any(Date));
  });

  it('should be able to create entity with updatedAt if provided', () => {
    const date = new Date();
    const entity = new TestEntity({ updatedAt: date });

    expect(entity.updatedAt).toEqual(expect.any(Date));
    expect(entity.updatedAt).toEqual(date);
  });
});
