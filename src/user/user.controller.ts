import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
// import { UserService } from './user.service';
// import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post('user')
  create(@Body() body) {
    return body;
  }
}

// @Controller()
// export class AppController {
//   constructor(private readonly userService: UserService) {}

//   @Post('user')
//   async signupUser(
//     @Body() userData: { name?: string; email: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }
// }
