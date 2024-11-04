import { IRepository } from '../../../shared/domain/repository/repository.interface';
import { Category } from '../category.entity';
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo';

export interface ICategoryRepositoryInterface
  extends IRepository<Category, Uuid> {}
