import { PickType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostPublishedDto extends PickType(CreatePostDto, [
  'published',
] as const) {}
