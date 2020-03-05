import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { UserSchema } from './user.model';

@Module({
  imports: [/*
    MongooseModule.forRoot('mongodb://localhost:27017/blogexample1DB', {
      connectionName: 'users',
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
   */],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
