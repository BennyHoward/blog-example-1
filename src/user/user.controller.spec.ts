import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      // providers: [UserService], // commented out for now because mongoose ODM needs to be mocked in order to be used in unit tests
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return "This action returns all users" from findAll()', () => {
      expect(userController.findAll()).toBe('This action returns all users');
    });
  });
});
