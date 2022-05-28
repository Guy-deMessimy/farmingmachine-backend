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
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() params): Promise<UserModel[]> {
    return this.userService.users(params);
  }

  // need to find some examples
  @Get('filter')
  async getFilterUsers(@Query() params): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userService.users({
      skip: Number(skip),
      take: Number(take),
      cursor: { id: Number(cursor) },
      where: { id: Number(where) },
      orderBy: orderBy,
    });
  }

  @Get('filtered-user/:searchString')
  async getFilteredUsers(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
    return this.userService.users({
      where: {
        email: { contains: searchString },
      },
    });
  }

  @Get('user/id/:id')
  async getUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('user/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
    return this.userService.user({ email: String(email) });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  //   @Patch('user/:id')
  //   update(@Param('id') id: string, @Body() body) {
  //     return `This action updates #${id} coffee`;
  //   }

  //   @Patch('user/:id')
  //   update(@Param('id') id: string, @Body() body) {
  //     return this.coffeesService.update(id, body);
  //   }

  //   @Delete('user/:id')
  //   remove(@Param('id') id: string) {
  //     return `This action removes #${id} coffee`;
  //   }

  //   @Delete('user:id')
  //   remove(@Param('id') id: string) {
  //     return this.coffeesService.remove(id);
  //   }
}
