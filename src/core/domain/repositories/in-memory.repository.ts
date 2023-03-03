/* eslint-disable @typescript-eslint/no-unused-vars */

import { Entity } from '../entities/entity';

export abstract class InMemoryRepository<T extends Entity<any>> {
  public readonly entities: T[] = [];

  async create(entity: T): Promise<T> {
    this.entities.push(entity);

    return entity;
  }

  async save(entity: T): Promise<void> {
    const index = this.entities.findIndex((item) => item.id.equals(entity.id));

    if (index === -1) {
      this.entities.push(entity);
    } else {
      this.entities[index] = entity;
    }
  }

  async findAll(...args: any[]): Promise<T[]> {
    return this.entities;
  }

  async findById(id: string): Promise<T | null> {
    const entity = this.entities.find((item) => item.id.equals(id)) || null;

    return entity;
  }

  async count(...args: any[]): Promise<number> {
    return this.entities.length;
  }

  async existsById(id: string): Promise<boolean> {
    const entityExists = this.entities.some((item) => item.id.equals(id));

    return entityExists;
  }

  async update(entity: T): Promise<void> {
    const index = this.entities.findIndex((item) => item.id.equals(entity.id));

    if (index >= 0) {
      this.entities[index] = entity;
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.entities.findIndex((item) => item.id.equals(id));

    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
}
