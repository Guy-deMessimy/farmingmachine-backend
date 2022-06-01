import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserInput } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    // illustrate configService
    private readonly configService: ConfigService,
  ) {
    const databaseHost = this.configService.get<string>(
      'DATABASE_HOST',
      // use a default
      'localhost',
    );
    console.log(databaseHost);
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    // prefer use Exceptions Filters
    const { id, email } = userWhereUniqueInput;
    const userParams = `${
      id ? `User with id:${id} not found` : `User with email:${email} not found`
    }`;
    if (!user) {
      throw new NotFoundException(userParams);
    }
    return user;
  }

  async users(paginationQuery: UserInput): Promise<User[]> {
    const { limit, offset, cursor, where, orderBy } = paginationQuery;
    return this.prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy,
      cursor,
      where,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
