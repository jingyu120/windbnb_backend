import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UserController', () => {
  let controller: UsersController;
  let mockService: Partial<UsersService>;

  beforeEach(async () => {
    mockService = {
      createUser: () =>
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
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockService).toBeDefined();
  });

  test('test createUser', async () => {
    // const newUser = await controller.createUser()
  })
});
