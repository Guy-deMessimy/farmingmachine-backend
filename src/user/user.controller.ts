import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
// import { UserService } from './user.service';
// import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post('user')
  create(@Body() body) {
    return body;
  }

  @Patch('user/:id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
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
