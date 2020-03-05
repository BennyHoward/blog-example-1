import { validate, ValidatorOptions, ValidationError, IsEmail, IsNotEmpty } from 'class-validator';
import { Document, Schema, Model, model } from 'mongoose';

import { DtoType } from '../types';

/**
 * Name of the model representing the `User`.
 *
 * @export
 */
export const MODEL_NAME = 'User';

/**
 * Name of the corresponding collection in MongoDB in which the actual `User` data is stored.
 *
 * @export
 */
export const COLLECTION_NAME = 'users';

/**
 * Interface that defines the structure as to what a `User` is.
 *
 * @export
 * @interface User
 */
export interface User {
  username: string;
  password: string;
  email: string;
}

/**
 * Defines the Document structure when querying the collection.
 *
 * @export
 * @interface UserDocument
 * @extends {User}
 * @extends {Document}
 */
export interface UserDocument extends User, Document {}

/**
 * Mongoose schema definition for `User`.
 */
export const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

/**
 * Data transfer object definition for `User`.
 * Used for validations and instantiating new User DTOs for creating new documents to store in the `users` collection.
 *
 * @export
 * @class UserDto
 * @implements {DtoType}
 * @implements {User}
 */
export class UserDto implements DtoType, User {
  @IsNotEmpty({message: 'Please a username.'})
  public readonly username: string

  @IsNotEmpty({message: 'Please provide a password.'})
  public readonly password: string;

  /**
   * Field that represents the user's email.
   *
   * @type {string}
   * @memberof UserDto
   */
  @IsNotEmpty({ message: 'Please provide an email.' })
  @IsEmail({}, { message: 'Please provide a valid email.' })
  public readonly email: string;

  /**
   * Creates an instance of UserDto.
   *
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @memberof UserDto
   */
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  /**
   * Validates the User object and returns a list of errors in the event that fields aren't set correctly.
   *
   * @param {ValidatorOptions} [validatorOptions]
   * @returns {Promise<ValidationError[]>}
   * @memberof UserDto
   */
  public validate(validatorOptions?: ValidatorOptions): Promise<ValidationError[]> {
    return validate(this, validatorOptions);
  }
}

/**
 * The Model definition for `User`.
 * This will be used to interact with the actual MongoDB `users` collection
 */
export const UserModel: Model<UserDocument> = model(MODEL_NAME, UserSchema, COLLECTION_NAME);

/**
 * Exporting the `UserModel` as the default for this file's namesake.
 */
export default UserModel;
