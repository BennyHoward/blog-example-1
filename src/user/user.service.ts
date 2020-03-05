import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserDto, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {
    this.userModel = UserModel;
  }

  public async create(User: UserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(User);
    return createdUser.save();
  }

  public async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}
