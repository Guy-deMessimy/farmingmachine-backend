import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UpdatePostPublishedDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get('all')
  async getPosts(@Query() params): Promise<PostModel[]> {
    return this.postService.posts(params);
  }

  @Public()
  @Get('filtered-post')
  async getFilterPosts(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PostModel[]> {
    const { limit, offset, orderBy } = paginationQuery;
    return this.postService.posts({
      limit,
      offset,
      orderBy: {
        id: orderBy,
      },
    });
  }

  @Public()
  @Get('published')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Public()
  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Public()
  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Public()
  @Post('post')
  async createDraft(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    console.log(createPostDto instanceof CreatePostDto);
    const { title, content, authorEmail } = createPostDto;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Public()
  @Put('publish/:id')
  async publishPost(
    @Param('id') id: string,
    @Body() userData: UpdatePostPublishedDto,
  ): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Public()
  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
