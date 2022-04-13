import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Model } from 'mongoose';

const mockUser = {
  name: 'Justin',
  email: 'jingyu120@gmail.com',
  password: '123123',
};

describe('UserService', () => {
  let service: UsersService;
  let model: Partial<Model<User>>;

  beforeEach(async () => {
    model = {
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should create a new user', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser));
    const newUser = await service.createUser(mockUser);
    expect(newUser).toEqual(mockUser);
  });
});
