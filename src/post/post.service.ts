import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PostInput } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private readonly configService: ConfigService,
  ) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(paginationQuery: PostInput): Promise<Post[]> {
    const { limit, offset, cursor, where, orderBy } = paginationQuery;
    return this.prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy,
      cursor,
      where,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
