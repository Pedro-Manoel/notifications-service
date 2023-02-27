import { randomUUID } from 'crypto';

import { Entity } from '@core/domain/entities/entity';

import { InMemoryRepository } from './in-memory.repository';

interface ITestEntityProps {
  name: string;
}

class TestEntity extends Entity<ITestEntityProps> {}

class TestInMemoryRepository extends InMemoryRepository<TestEntity> {}

describe('In memory repository', () => {
  let entity: TestEntity;
  let repository: TestInMemoryRepository;

  beforeEach(() => {
    entity = new TestEntity({ name: 'test' });
    repository = new TestInMemoryRepository();
  });

  it('should be able to create entity in repository', () => {
    repository.create(entity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(entity);
  });

  it('should be able to save entity to repository if it does not exist', () => {
    repository.save(entity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(entity);
  });

  it('should be able to save entity to repository if it exists', () => {
    repository.create(entity);

    const updatedEntity = new TestEntity({ id: entity.id, name: 'updated' });

    repository.save(updatedEntity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(updatedEntity);
  });

  it('should be able to find all entities in repository', async () => {
    const testEntity1 = new TestEntity({ name: 'test1' });
    const testEntity2 = new TestEntity({ name: 'test2' });

    repository.create(testEntity1);
    repository.create(testEntity2);

    const entities = await repository.findAll();

    expect(entities).toHaveLength(2);
    expect(entities).toEqual(
      expect.arrayContaining([testEntity1, testEntity2]),
    );
  });

  it('should be able to find entity by id in repository', async () => {
    repository.create(entity);

    const foundEntity = await repository.findById(entity.id.value);

    expect(foundEntity).toEqual(entity);
  });

  it('should return null if entity is not found by id in repository', async () => {
    const foundEntity = await repository.findById(randomUUID());

    expect(foundEntity).toBeNull();
  });

  it('should be able to count entities in repository', async () => {
    const testEntity1 = new TestEntity({ name: 'test1' });
    const testEntity2 = new TestEntity({ name: 'test2' });

    const count1 = await repository.count();

    repository.create(testEntity1);
    repository.create(testEntity2);

    const count2 = await repository.count();

    repository.create(entity);

    const count3 = await repository.count();

    expect(count1).toBe(0);
    expect(count2).toBe(2);
    expect(count3).toBe(3);
  });

  it('should be able to check if entity exists by id in repository', async () => {
    repository.create(entity);

    const exists = await repository.existsById(entity.id.value);

    expect(exists).toBe(true);
  });

  it('should be able to check if entity does not exist by id in repository', async () => {
    const exists = await repository.existsById(randomUUID());

    expect(exists).toBe(false);
  });

  it('should be able to update entity in repository', async () => {
    repository.create(entity);

    const updatedEntity = new TestEntity({ id: entity.id, name: 'updated' });

    await repository.update(updatedEntity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(updatedEntity);
  });

  it('should not be able to update entity in repository if it does not exist', async () => {
    repository.create(entity);

    const updatedEntity = new TestEntity({ name: 'updated' });

    await repository.update(updatedEntity);

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(entity);
  });

  it('should be able to delete entity from repository', async () => {
    repository.create(entity);

    await repository.delete(entity.id.value);

    expect(repository.entities).toHaveLength(0);
  });

  it('should not be able to delete entity from repository if it does not exist', async () => {
    repository.create(entity);

    await repository.delete(randomUUID());

    expect(repository.entities).toHaveLength(1);
    expect(repository.entities[0]).toEqual(entity);
  });
});
