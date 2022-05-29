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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() params): Promise<UserModel[]> {
    return this.userService.users(params);
  }

  // Need to find some examples with OR/ AND
  @Get('filtered-user')
  async getFilterUsers(@Query() params): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userService.users({
      //   skip: Number(skip),
      //   take: Number(take),
      //   cursor: { id: Number(cursor) },
      //   where: { id: Number(where) },
      orderBy: {
        id: orderBy,
      },
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

  // Need to fix security path

  @Get('user-id/:id')
  async getUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('user-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
    return this.userService.user({ email: String(email) });
  }

  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  async currentUser(
    @Param('id') id: string,
    @Body() userData: { name?: string; email?: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete('user-id/:id')
  async deleteUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
