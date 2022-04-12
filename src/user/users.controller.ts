import { Body, Controller, HttpStatus, Get, Post, Res } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser() {
    return 'get user';
  }

  @Post()
  async createUser(@Res() response, @Body() body: User) {
    const newUser = await this.userService.createUser(body);
    console.log(newUser);
    return response.status(HttpStatus.OK).json(newUser);
  }
}
