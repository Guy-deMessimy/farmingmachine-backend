import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
    private readonly configService: ConfigService,
  ) {}

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    const email = data.author.connect.email;
    const userid = await this.user.user({ email: String(email) });
    if (userid) {
      return this.prisma.post.create({
        data,
      });
    }
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
    const { id } = postWhereUniqueInput;
    const userParams = `${
      id ? `User with id:${id} not found` : `User with email:${id} not found`
    }`;
    if (!post) {
      throw new NotFoundException(userParams);
    }
    return post;
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
