import { ValidatorOptions, ValidationError } from 'class-validator';

export interface DtoType {
  validate(this: DtoType, validatorOptions?: ValidatorOptions): Promise<ValidationError[]>;
}
