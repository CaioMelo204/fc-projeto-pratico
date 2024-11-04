import { IRepository } from '../../../domain/repository/repository.interface';
import { Entity } from '../../../domain/entity';
import { ValueObject } from '../../../domain/value-object';
import { NotFoundError } from '../../../../category/domain/errors/not-found.error';

export abstract class InMemoryRepository<
  T extends Entity,
  Id extends ValueObject,
> implements IRepository<T, Id>
{
  items: T[] = [];

  async bulkInsert(entities: T[]): Promise<void> {
    this.items.push(...entities);
  }

  async delete(entityId: Id): Promise<void> {
    const indexFound = this.items.findIndex((e) => e.entityId.equals(entityId));
    if (indexFound === -1) {
      throw new NotFoundError(entityId, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async findOne(entityId: Id): Promise<T | null> {
    const item = this.items.find((item) => item?.entityId.equals(entityId));
    if (typeof item === undefined) {
      return null;
    }
    return item || null;
  }

  abstract getEntity(): { new (...args: any[]): any };

  async insert(entity: T): Promise<void> {
    this.items.push(entity);
  }

  async update(entity: T): Promise<void> {
    const indexFound = this.items.findIndex((e) =>
      e.entityId.equals(entity.entityId),
    );
    if (indexFound === -1) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }
    this.items[indexFound] = entity;
  }
}
