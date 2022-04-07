import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Res() response, @Body() body: User) {
    const newUser = await this.userService.create(body);
    return response.status(HttpStatus.OK).json({
      newUser,
    });
  }
}
