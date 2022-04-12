import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { userStub } from './stubs/user.stub';

describe('UserController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {
      create: () =>
        Promise.resolve({
          name: 'Justin',
          email: 'jingyu120@gmail.com',
          password: '123123',
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  test('testing', () => {
    expect(controller).toBeDefined();
  });
});
