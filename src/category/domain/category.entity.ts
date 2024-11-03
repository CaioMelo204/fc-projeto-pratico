import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { CategoryValidatorFactory } from './category.validator';
import { EntityValidationError } from '../../shared/domain/validators/validation.error';
import { Entity } from '../../shared/domain/entity';
import { validator } from 'sequelize/types/utils/validator-extras';
import { ValueObject } from '../../shared/domain/value-object';

export type CategoryConstructorProps = {
  categoryId?: Uuid;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export class Category extends Entity {
  categoryId: Uuid;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.categoryId = props.categoryId || new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt || new Date();
  }

  static create(props: CategoryCreateCommand) {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  changeName(name: string) {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string) {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.isActive = true;
    Category.validate(this);
  }

  deactivate() {
    this.isActive = false;
    Category.validate(this);
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }

  get entityId(): ValueObject {
    return this.categoryId;
  }
}
