import { Entity } from '../entities/entity';

export abstract class InMemoryRepository<T extends Entity<any>> {
  public readonly entities: T[] = [];

  async findAll(): Promise<T[]> {
    return this.entities;
  }

  async findById(id: string): Promise<T | null> {
    const entity = this.entities.find((item) => item.id === id) || null;

    return entity;
  }

  async existsById(id: string): Promise<boolean> {
    const entityExists = this.entities.some((item) => item.id === id);

    return entityExists;
  }

  async create(entity: T): Promise<void> {
    this.entities.push(entity);
  }

  async update(entity: T): Promise<void> {
    const index = this.entities.findIndex((item) => item.id === entity.id);

    if (index >= 0) {
      this.entities[index] = entity;
    }
  }

  async save(entity: T): Promise<void> {
    const index = this.entities.findIndex((item) => item.id === entity.id);

    if (index === -1) {
      this.entities.push(entity);
    } else {
      this.entities[index] = entity;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
}
