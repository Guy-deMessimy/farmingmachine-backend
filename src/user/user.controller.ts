import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // feed swagger
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @SetMetadata('isPublic', true)
  // prefer use custom decorator cf public.decorator.ts
  @Public()
  @Get('all')
  async getUsers(
    // to illustrate custom param decorator
    @Protocol('https') protocol: string,
    @Query() params,
  ): Promise<UserModel[]> {
    console.log('protocol', protocol);
    // to illustrate timeout interceptors
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.userService.users(params);
  }

  @Public()
  @Get('filtered-user')
  async getFilterUsers(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<UserModel[]> {
    const { limit, offset, orderBy } = paginationQuery;
    return this.userService.users({
      limit,
      offset,
      orderBy: {
        id: orderBy,
      },
    });
  }

  @Public()
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

  @Public()
  @Get('user-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UserModel> {
    return this.userService.user({ email: String(email) });
  }

  @Public()
  @Get('user-id/:id')
  // ParseIntPipe illustrate custom param Pipes
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    // async getUserById(@Param('id') id: number):
    // to illustrate parse-int pipes interceptor
    // console.log('Pipes : id', id);
    return this.userService.user({ id: Number(id) });
  }

  @Public()
  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    // to illustrate useGlobalPipes transform option
    if (userData instanceof CreateUserDto) {
      return this.userService.createUser(userData);
    }
  }

  @Public()
  @Patch('user/:id')
  async currentUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Public()
  @Delete('user-id/:id')
  async deleteUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
