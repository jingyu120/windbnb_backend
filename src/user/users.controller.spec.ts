import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { HttpStatus } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';

const mockUser = {
  name: 'Justin',
  email: 'jingyu120@gmail.com',
  password: '123123',
};

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
    const mockResponseJson = {
      json: jest.fn((x) => x),
    };
    const mockResponse = {
      status: jest.fn((x) => mockResponseJson),
    } as unknown as Response;
    const newUser = await controller.createUser(
      mockResponse as Response,
      mockUser as User,
    );
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(newUser).toEqual(mockUser);
  });
});
