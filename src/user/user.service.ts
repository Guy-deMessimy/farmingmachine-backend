import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
  //       findAll() {
  //     return this.coffees;
  //   }

  //   create(createCoffeeDto: any) {
  //     this.coffees.push(createCoffeeDto);
  //   }

  //   update(id: string, updateCoffeeDto: any) {
  //     const existingCoffee = this.findOne(id);
  //     if (existingCoffee) {
  //       // update the existing entity
  //     }
  //   }

  //   remove(id: string) {
  //     const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
  //     if (coffeeIndex >= 0) {
  //       this.coffees.splice(coffeeIndex, 1);
  //     }
  //   }
}
